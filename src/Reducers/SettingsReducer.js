import { 
    SKIP_WALKTHROUGH,
    CHANGE_CONNECTION_STATUS,
    LOGGED_IN,
    RESET_DATA
} from '../actions/types';

const initialState = {
    walkthrough: false,
    isConnected: false,
    userLoggedIn:false, 
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SKIP_WALKTHROUGH:
            return {
                ...state,
                walkthrough: action.skip
            };
            break;

        case CHANGE_CONNECTION_STATUS:
            return {
                ...state,
                isConnected: action.isConnected
            };
            break;

        case LOGGED_IN:
            return {
                ...state,
                userLoggedIn:true
            };
            break;

        case RESET_DATA:
        return {
            ...state,
            ...initialState
        }
            
        default:
            return state;
    }
} 