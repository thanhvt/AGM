import { RTLINK } from './actions/types';
if(RTLINK != ''){
    //Setting Realtime-Socket 
    import Store from './Store';
    var socketIOClient = require('socket.io-client');
    var sailsIOClient = require('sails.io.js');
    var io = sailsIOClient(socketIOClient);
    io.sails.useCORSRouteToGetCookie = false;
    io.sails.url = RTLINK;

    //On Connect to Realtime.
    io.socket.on('connect',function(tz){
        //call any actions that you want 
        //eg. setting user online and updating his/her socket_id
        //Store.dispatch(setmeonline());
    });

    io.socket.on('disconnect',function(tz){
        console.log('Socket Disconnected');
        io.socket._raw.io._reconnection = true;
        io.socket._raw.io._reconnectionAttempts = Infinity;
    });
}else{
    var io = null;
}
export default io;