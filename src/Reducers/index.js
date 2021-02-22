import { combineReducers } from 'redux';

/////////// IMPORT REDUCERS ///////////////
import SettingsReducer from './SettingsReducer';
import RehydrateReducer from './RehydrateReducer';



export default combineReducers({
    settings: SettingsReducer,
    rehydrate: RehydrateReducer
});