import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import TakeerText from '../../components/TakeerText';
import { Styles, Images, Colors, Fonts } from '../../Common';

class Chat extends Component {

/*
    name:'Naomi Campbell',
    online:false,
    message:'Oooo.. i get you..',
    img:Images.users.user1
*/
    goDm=()=>{
        this.props.navigation.navigate('Chat');
    }

    render() {
        let { name, online, message, img } = this.props.data;
        return (
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginVertical:8}} onPress={this.goDm}>
                <View style={[Styles.i_c,{marginTop:6}]}>
                    <Image
                        source={img}
                        style={Styles.c_p}
                    />
                    {online && <View style={Styles.i_a_o_c}>
                        <View style={Styles.c_i_o}/>
                    </View>}
                    {!online && <View style={Styles.i_a_o_c}>
                        <View style={Styles.c_i_n}/>
                    </View>}
                </View>
                <View style={{flex:1, justifyContent:'center'}}>
                    <TakeerText style={{color: Colors.textPrimary, fontWeight:'bold', fontSize: Fonts.size.h6}}>
                        {name}
                    </TakeerText>
                    <TakeerText style={{color: Colors.textPrimary, paddingTop:4}}>
                        {message}
                    </TakeerText>
                </View>
            </TouchableOpacity>
        );
    }
}
export default Chat;