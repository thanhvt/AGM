import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
//redux offline
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
//reducers
import reducers from './Reducers';
//actions
import { REHYDRATE_STORE } from './actions/types';
import thunk from 'redux-thunk';
import  { YellowBox } from 'react-native';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}else{
    //disable all console errors..
}

const store = createStore(
    reducers, 
    compose(
        applyMiddleware(...middlewares),
        offline({
            ...offlineConfig,
            persistCallback: () => {
                store.dispatch({ type: REHYDRATE_STORE });
            },
            persistOptions: {
                blacklist: ['rehydrate']
            }
        })
    )
);

export default store;