import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import TakeerIcon from '../TakeerIcon';

class TakeerRatings extends Component {

    renderStars(i){
        var inactiveColor= this.props.inactiveColor;
        var activeColor= this.props.activeColor;
        var iconSize= this.props.starSize;
        if(i === 0){
            return (
                <View style={{flexDirection:'row'}}>
                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>
                </View>
            )
        }
        if(i === 1){
            return (
                <View style={{flexDirection:'row'}}>
                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>
                </View>
            )
        }
        if(i === 2){
            return (
                <View style={{flexDirection:'row'}}>
                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>
                </View>
            )
        }
        if(i === 3){
            return (
                <View style={{flexDirection:'row'}}>
                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>
                </View>
            )
        }
        if(i === 4){
            return (
                <View style={{flexDirection:'row'}}>
                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={inactiveColor}
                    iconPosition=""/>
                </View>
            )
        }
        if(i === 5){
            return (
                <View style={{flexDirection:'row'}}>
                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>

                    <TakeerIcon
                    iconType="Entypo"
                    iconName="star"
                    iconSize={iconSize}
                    iconColor={activeColor}
                    iconPosition=""/>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
                {this.renderStars(this.props.starCount)}
            </View>
        );
    }
}
export default TakeerRatings;