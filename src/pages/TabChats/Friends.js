import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Chat from './Chat';
import { Styles, Images } from '../../Common';
import TakeerText from '../../components/TakeerText';

const activechats=[
    {
        name:'Rick Ross',
        online:true,
        message:'Hi Hanna.. Good Morning..',
        img:Images.users.user1
    },
    {
        name:'James Royel',
        online:false,
        message:'I will send my coursework today evening',
        img:Images.users.user2
    },
    {
        name:'Fahadh Rahdhid',
        online:true,
        message:'I like your course alot, how can i tip extra..',
        img:Images.users.user3
    },
    {
        name:'Joan Lecrus',
        online:false,
        message:'Thanks',
        img:Images.users.user4
    },
    {
        name:'Jean Jackson',
        online:true,
        message:'I wish could have learned earlier..',
        img:Images.users.user5
    },
    {
        name:'James Jacob',
        online:true,
        message:'Don\'t be shy.. be yourself',
        img:Images.users.user6
    },
    {
        name:'Naomi Campbell',
        online:false,
        message:'Oooo.. i get you..',
        img:Images.users.user1
    }
];

class Friends extends Component {

    render() {
        return (
            <View style={{flex:1, paddingHorizontal:4, flexDirection:'column'}}>
                <ScrollView style={{flex:1}}>
                    {activechats.map((item,index)=>(
                        <View key={`${index}-chat`} style={Styles.chatOuter}>
                            <Chat data={item} navigation={this.props.nav}/>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }
}
export default Friends;