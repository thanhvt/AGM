import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import TakeerText from '../../components/TakeerText';
const data=[
    {
        id:1,
        user:{
            name:'Hanna Marin',
            title: 'Student',
            photo: require('./assets/37.jpg')
        },
        time:'1w ago',
        ratings:5,
        message:'Truly amazing course! I learned alot of things about Business Management in the shortest amount of time'
    },
    {
        id:2,
        user:{
            name:'James Jackson',
            title: 'Student',
            photo: require('./assets/33.jpg')
        },
        time:'1w ago',
        ratings:4,
        message:'Very nice and well explained!'
    },
    {
        id:3,
        user:{
            name:'Barry Marley',
            title: 'Student',
            photo: require('./assets/35.jpg')
        },
        time:'4d ago',
        ratings:5,
        message:'It is strange.. Now i know all those Business terms in shortest time, this may be the shortest time for me to understand something i have taught!'
    },
    {
        id:4,
        user:{
            name:'Barry Marley',
            title: 'Student',
            photo: require('./assets/32.jpg')
        },
        time:'2d ago',
        ratings:5,
        message:'Now i am ready to be a Businessman! Yeah...'
    },
    {
        id:7,
        user:{
            name:'Hanna Marin',
            title: 'Student',
            photo: require('./assets/37.jpg')
        },
        time:'1w ago',
        ratings:5,
        message:'Truly amazing course! I learned alot of things about Business Management in the shortest amount of time'
    },
    {
        id:8,
        user:{
            name:'James Jackson',
            title: 'Student',
            photo: require('./assets/33.jpg')
        },
        time:'1w ago',
        ratings:4,
        message:'Very nice and well explained!'
    },
    {
        id:9,
        user:{
            name:'Barry Marley',
            title: 'Student',
            photo: require('./assets/35.jpg')
        },
        time:'4d ago',
        ratings:5,
        message:'It is strange.. Now i know all those Business terms in shortest time, this may be the shortest time for me to understand something i have taught!'
    },
    {
        id:10,
        user:{
            name:'Barry Marley',
            title: 'Student',
            photo: require('./assets/32.jpg')
        },
        time:'2d ago',
        ratings:5,
        message:'Now i am ready to be a Businessman! Yeah...'
    },
    {
        id:16,
        user:{
            name:'Hanna Marin',
            title: 'Student',
            photo: require('./assets/37.jpg')
        },
        time:'1w ago',
        ratings:5,
        message:'Truly amazing course! I learned alot of things about Business Management in the shortest amount of time'
    }
];

import TakeerRatings from '../../components/TakeerRatings';

class Reviews extends Component {

    _keyExtractor = (item, index) => item.id.toString();

    _renderItem = ({item}) => (
        <View style={{marginVertical:6, backgroundColor:'rgba(255,255,255,0.1)', borderRadius:8, paddingHorizontal:8, paddingVertical:12}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                    <View>
                        <Image source={item.user.photo}
                        style={{width:40, height:40, borderRadius:20}}/>
                    </View>
                    <View style={{marginLeft:8}}>
                        <View>
                            <TakeerText style={{fontWeight:'bold', fontSize:18, color:'#FFF'}}>
                                {item.user.name}
                            </TakeerText>
                        </View>
                        <View>
                            <TakeerText style={{color:'#bbb'}}>
                                {item.user.title}
                            </TakeerText>
                        </View>
                    </View>
                </View>
                <View>
                    <TakeerText style={{color:'#bbb'}}>
                        {item.time}
                    </TakeerText>
                </View>
            </View>
            <View style={{height:1, marginVertical:8, backgroundColor:'rgba(255,255,255,0.2)'}}/>
            <View style={{marginBottom:8}}>
                <TakeerRatings
                    inactiveColor="rgb(80, 120, 118)"
                    activeColor="rgb(244, 166, 59)"
                    starSize={16}
                    starCount={item.ratings}
                />
            </View>
            <View>
                <TakeerText style={{color:'#FFF'}}>
                    {item.message}
                </TakeerText>
            </View>
        </View>
    );

    render() {
        return (
            <View style={{flex:1}}>
                <FlatList
                    style={{flex:1}}
                    horizontal={false}
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    initialNumToRender={10}
                />
            </View>
        );
    }
}
export default Reviews;