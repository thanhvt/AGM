import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../Common';

const styles = StyleSheet.create({
    main:{
        flex:1,backgroundColor:Colors.secondary
    },
    iLogo:{
        width:150,
        height:150,
        borderRadius:75,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        paddingTop:'10%'
    },
    iTxt:{
        flexDirection:'row',
        paddingVertical:6,
        paddingHorizontal:20,
        marginVertical:8
    },
    iIcon:{
        ...Platform.select({
            android: {
              marginTop:4
            }
        })
    },
    input:{
        color:'#aaa'
    },
    iInput:{
        paddingBottom:4,
        marginBottom:6,
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        flex:1,
        height:40,
        overflow:'hidden',
        marginTop:0,
        marginLeft:12
    },
    iB:{
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        width:'40%',
        marginBottom:7
    },
    iO:{
        paddingHorizontal:6
    },
    oW:{
        fontSize:12,
        color:'#999'
    },
    lText:{
        fontSize:25,
        color:'rgba(249, 81, 84, 1.000)',
        fontWeight:'bold'
    },
    iIconSocial:{
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
    },
    socialLogin:{
        padding:6
    },
    sI:{
        width:40,
        height:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    sIF:{
        backgroundColor:'rgba(43, 121, 192, 1.000)'
    },
    sIT:{
        backgroundColor:'rgba(0, 190, 245, 1.000)'
    }
});

export default styles;