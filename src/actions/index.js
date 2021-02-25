import { 
    SKIP_WALKTHROUGH,
    CHANGE_CONNECTION_STATUS,
    LOGGED_IN,
    RESET_DATA,

    USER_AGM
 } from './types';

/////////////////////////////////////
/////////  ACTION TRIGGERS  /////////
/////////////////////////////////////
export const skipWalkthrough = () => ({
    type: SKIP_WALKTHROUGH,
    skip: true
}); 

export const connectionState = (status) => {
    return { 
        type: CHANGE_CONNECTION_STATUS, 
        isConnected: status 
    };
};

export const isConnected = () =>{
    return {
        type: LOGGED_IN,
        payload: true
    }
}

export const resetData = () => {
    return {
        type: RESET_DATA
    }
}

export const userAGM = (item) => (
    {
        type: USER_AGM,
        payload: item
    }
)
