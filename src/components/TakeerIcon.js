import React, { Component } from 'react';

//importing icons
/*
import { Ionicons as I } from '@expo/vector-icons';
import { Entypo as En } from '@expo/vector-icons';
import { EvilIcons as Ev } from '@expo/vector-icons';
import { FontAwesome as F } from '@expo/vector-icons';
import { MaterialCommunityIcons as Mc } from '@expo/vector-icons';
import { MaterialIcons as M } from '@expo/vector-icons';
import { SimpleLineIcons as S } from '@expo/vector-icons';
import { Zocial as Z } from '@expo/vector-icons';
import { Octicons as O } from '@expo/vector-icons';
import { Feather as Fe } from '@expo/vector-icons';
import { Foundation as Fa } from '@expo/vector-icons';
*/
import I from 'react-native-vector-icons/Ionicons';
import En from 'react-native-vector-icons/Entypo';
import Ev from 'react-native-vector-icons/EvilIcons';
import F from 'react-native-vector-icons/FontAwesome';
import F5 from 'react-native-vector-icons/FontAwesome5';
import F5p from 'react-native-vector-icons/FontAwesome5Pro';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import M from 'react-native-vector-icons/MaterialIcons';
import S from 'react-native-vector-icons/SimpleLineIcons';
import Z from 'react-native-vector-icons/Zocial';
import O from 'react-native-vector-icons/Octicons';
import A from 'react-native-vector-icons/AntDesign';
import Fe from 'react-native-vector-icons/Feather';
import Fa from 'react-native-vector-icons/Foundation';



/*
    //USAGE
    <TakeerIcon
        iconType= "" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
        iconName="" // icon name according to iconType or pass null to hide
        iconSize=""
        iconColor=""
        iconPosition="" //left, right, null
    />
*/
class TakeerIcon extends Component {
    constructor(props){
        super(props)
    }

    iconName(){
        return this.props.iconName;
    }

    iconSize(){
        return this.props.iconSize;
    }

    iconColor(){
        return this.props.iconColor;
    }

    renderIcon(){
        if(this.props.iconType == "Ionicons"
        || this.props.iconType == "Entypo"
        || this.props.iconType == "AntDesign"
        || this.props.iconType == "FontAwesome5"
        || this.props.iconType == "FontAwesome5Pro"
        || this.props.iconType == "EvilIcons"
        || this.props.iconType == "FontAwesome"
        || this.props.iconType == "MaterialCommunityIcons"
        || this.props.iconType == "MaterialIcons"
        || this.props.iconType == "Octicons"
        || this.props.iconType == "SimpleLineIcons"
        || this.props.iconType == "Feather"
        || this.props.iconType == "Foundation"
        || this.props.iconType == "Zocial"){
            if(this.props.iconType == "Ionicons"){
                return (
                    <I name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )
            }
            if(this.props.iconType == "AntDesign"){
                return (
                    <A name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )
            }
            if(this.props.iconType == "FontAwesome5"){
                return (
                    <F5 name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )
            }
            if(this.props.iconType == "FontAwesome5Pro"){
                return (
                    <F5p name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )
            }
            if(this.props.iconType == "Octicons"){
                return (
                    <O name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )                
            }
            if(this.props.iconType == "EvilIcons"){
                return (
                    <Ev name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )                
            }
            if(this.props.iconType == "Entypo"){
                return (
                    <En name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )    
            }
            if(this.props.iconType == "FontAwesome"){
                return (
                    <F name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )    
            }
            if(this.props.iconType == "MaterialCommunityIcons"){
                return (
                    <Mc name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                ) 
            }
            if(this.props.iconType == "MaterialIcons"){
                return (
                    <M name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )  
            }
            if(this.props.iconType == "SimpleLineIcons"){
                return (
                    <S name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )   
            }

            if(this.props.iconType == "Feather"){
                return (
                    <Fe name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )   
            }
            if(this.props.iconType == "Foundation"){
                return (
                    <Fa name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                )   
            }

            if(this.props.iconType == "Zocial"){
                return (
                    <Z name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
                ) 
            }
        }else{
            //fall back to Ionicons
            return (
                <I name={this.iconName()} size={this.iconSize()} color={this.iconColor()}/>
            )
        }
    }

    render() {
        return (
            this.renderIcon()
        );
    }
}

export default TakeerIcon;