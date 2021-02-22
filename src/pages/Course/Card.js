import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class Card extends Component {

    render() {
        return (
            <View style={{flex:1}}>
                <View style={[styles.card1,styles.card]}>
                    {this.props.children}
                </View>
                <View style={[styles.card2,styles.card]}/>
                <View style={[styles.card3, styles.scard]}/>
                <View style={[styles.card4, styles.lcard]}/>
            </View>
        );
    }
}

const styles =  StyleSheet.create({
    card1:{
        position:'absolute',
        left:4,
        top:'5%',
        right:'20%',
        bottom:'8%',
        //backgroundColor:'transparent',
        zIndex:10,
        backgroundColor:'rgb(46, 78, 124)'
    },
    card2:{
        position:'absolute',
        left:4,
        top:'8%',
        right:'15%',
        bottom:'12%',
        padding:8,
        //backgroundColor:'transparent',
        zIndex:9,
        backgroundColor:'rgb(42, 72, 114)'
    },
    card3:{
        position:'absolute',
        left:4,
        top:'12%',
        right:'10%',
        bottom:'17%',
        //backgroundColor:'transparent',
        zIndex:8,
        backgroundColor:'rgba(40, 67, 106,0.8)'
    }, 
    card4:{
        position:'absolute',
        left:4,
        top:'16%',
        right:'6%',
        bottom:'24%',
        //backgroundColor:'transparent',
        zIndex:7,
        backgroundColor:'rgba(37, 63, 99,0.6)'
    },
    card:{
        borderRadius:8,
        shadowOpacity:0.7,
        shadowRadius:5,
        shadowOffset:{
            width:2, height:4
        },
        shadowColor:'rgba(0,0,0,0.3)'
    },
    lcard:{
        borderRadius:8,
        shadowOpacity:0.3,
        shadowRadius:5,
        shadowOffset:{
            width:2, height:4
        },
        shadowColor:'rgba(0,0,0,0.3)'
    },  
    scard:{
        borderRadius:8,
        shadowOpacity:0.4,
        shadowRadius:5,
        shadowOffset:{
            width:2, height:4
        },
        shadowColor:'rgba(0,0,0,0.3)'
    },   
});
export default Card;