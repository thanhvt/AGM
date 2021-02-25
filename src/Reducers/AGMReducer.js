import {
    USER_AGM
} from '../actions/types';

const initialState = {
    userAGM: '',
     
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case USER_AGM:
            return {
                ...state,
                userAGM: action.payload
            };
         

        default:
            return state;
    }
} 