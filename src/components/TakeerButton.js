import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
//import { colors, fonts, styles } from '../config';

//custom component
import TakeerIcon from './TakeerIcon';
import TakeerText from './TakeerText';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Styles, Images, Fonts } from '../Common';
/*
    //USAGE
      <TakeerButton
        onPress={this.reload}
        backgroundColor='#000'
        borderWidth={1}
        borderColor="#f5f5f5"
        borderRadius={10} // pass border radius
        textColor="#fff"
        textBold={false}
        textItalic={false}
        textSize={20}
        textFont=""
        text="Reload" //button texts
        showIcon={true}// if false, pass null to every icon attribute below
        iconType="Ionicons" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
        iconName="ios-people" //icon name according to iconType or pass null to hide
        iconSize={30}
        iconColor="#fff"
        iconPosition="left" //left, right, null
        loading={false} //true or false -- true to show spinner/loading
        loadingText="" // default is Loading.., you may pass any texts or null not to show
        paddingHorizontal={10}// 
      />
    />
*/

class TakeerButton extends Component {
    constructor(props){
        super(props)
    }

    paddingHorizontal(){
        if(this.props.paddingHorizontal != ""){
            return this.props.paddingHorizontal;
        }else{
            return 4;
        }
    }

    borderWidth(){
        return this.props.borderWidth;
    }

    borderRadius(){
        return this.props.borderRadius;
    }

    textBold(){
        if(this.props.textWeight){
            return this.props.textWeight;
        }else{
            return 'bold';
        }
    }

    renderIcon(){
        return (
            <TakeerIcon
                iconType={this.props.iconType}
                iconName={this.props.iconName}
                iconSize={this.props.iconSize}
                iconColor={this.props.iconColor}
                iconPosition={this.props.iconPosition}
            />
        )
    }

    renderView(){
        if(this.props.showIcon){
            //icon and text
            if(this.props.iconPosition == "right"){
                return (
                    <View style={{backgroundColor:'transparent',flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                        <View style={{backgroundColor:'transparent'}}>
                            <TakeerText
                            style={{
                                fontSize: this.props.textSize,
                                //fontFamily: this.font(),
                                color: this.props.textColor,
                                fontWeight: this.textBold(),
                                letterSpacing: 1,
                                paddingVertical:6,
                                backgroundColor:'transparent'
                            }}
                            >{this.props.text}</TakeerText>
                        </View>
                        <View style={{marginLeft:6, backgroundColor:'transparent'}}>
                            {this.renderIcon()}
                        </View>
                    </View>
                );
            }else{
                return (
                    <View style={{backgroundColor: 'transparent',flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                        <View style={{marginRight:6, backgroundColor:'transparent'}}>
                            {this.renderIcon()}
                        </View>
                        <View style={{backgroundColor:'transparent'}}>
                            <TakeerText
                            style={{
                                fontSize: this.props.textSize,
                                //fontFamily: this.font(),
                                color: this.props.textColor,
                                fontWeight: this.textBold(),
                                letterSpacing: 1,
                                paddingVertical:6,
                                backgroundColor:'transparent'
                            }}
                            >{this.props.text}</TakeerText>
                        </View>
                    </View>
                );
            }
        }else{
            //no icon just plain text
            return (
            <View style={{backgroundColor: 'transparent'}}>
                <View style={{backgroundColor:'transparent'}}>
                    <TakeerText
                    style={{
                        fontSize: this.props.textSize,
                        //fontFamily: this.font(),
                        color: this.props.textColor,
                        fontWeight: this.textBold(),
                        letterSpacing: 1,
                        paddingVertical:6,
                        textAlign:'center',
                        backgroundColor:'transparent'
                    }}
                    >{this.props.text}</TakeerText>
                </View>
            </View>
            );
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>  
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[Colors.first, Colors.mid, Colors.last]}
            style={{
                    padding:4,
                    paddingHorizontal: this.paddingHorizontal(),
                    borderWidth: this.borderWidth(),
                    marginTop:6,
                    marginRight:0,
                    backgroundColor:this.props.backgroundColor,
                    borderRadius: this.borderRadius(),
                    borderColor:this.props.borderColor
                    }}>
            {this.renderView()}
                </LinearGradient>                         
                {/* <View style={{
                    padding:4,
                    paddingHorizontal: this.paddingHorizontal(),
                    borderWidth: this.borderWidth(),
                    marginTop:6,
                    marginRight:0,
                    backgroundColor:this.props.backgroundColor,
                    borderRadius: this.borderRadius(),
                    borderColor:this.props.borderColor
                    }}>
                    {this.renderView()}
                </View> */}
            </TouchableOpacity>
        );
    }
}

export default TakeerButton;