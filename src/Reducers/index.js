import { combineReducers } from 'redux';

/////////// IMPORT REDUCERS ///////////////
import SettingsReducer from './SettingsReducer';
import RehydrateReducer from './RehydrateReducer';
import AGMReducer from './AGMReducer';


export default combineReducers({
    settings: SettingsReducer,
    rehydrate: RehydrateReducer,
    agm: AGMReducer
});