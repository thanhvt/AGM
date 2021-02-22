import React, { Component } from 'react';
import {
	Image,
	Text,
    TouchableOpacity,
    StyleSheet,
	View,
    TouchableNativeFeedback
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import TakeerIcon from '../../components/TakeerIcon';


class header extends Component {
    constructor(props){
        super(props)
    }

    back(){
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction)       
    }

    render() {
        return (
            <View style={{
                backgroundColor:'rgba(255,255,255,0)',
                height:60,
                paddingTop:20,
                flexDirection:'row',
                alignItems:'center',
                //to make absolute
                position:'absolute',
                top:0,
                left:0,
                right:0,
                zIndex:1000
            }}>

            </View>
        );
    }
}

export default header;