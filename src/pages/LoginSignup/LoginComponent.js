import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';
import TakeerIcon from '../../components/TakeerIcon';
import TakeerButton from '../../components/TakeerButton';
import TakeerText from '../../components/TakeerText';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Colors } from '../../Common';

class LoginComponent extends Component {

    goLoggedIn=()=>{
        this.props.isConnected();
    }

    render() {
        return (
            <View>
                <View style={styles.iTxt}>
                    <View style={styles.iIcon}>
                        <TakeerIcon
                            iconType= "Ionicons"
                            iconName="ios-mail"
                            iconSize={22}
                            iconColor="#aaa"
                            iconPosition=""
                        />
                    </View>
                    <View style={styles.iInput}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#aaa"
                            underlineColorAndroid="transparent"
                            keyboardType="email-address"
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.iTxt}>
                    <View style={styles.iIcon}>
                        <TakeerIcon
                            iconType= "Ionicons"
                            iconName="ios-lock"
                            iconSize={22}
                            iconColor="#aaa"
                            iconPosition=""
                        />
                    </View>
                    <View style={styles.iInput}>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="#aaa"
                            underlineColorAndroid="transparent"
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={{marginHorizontal:'10%'}}>
                    <TakeerButton
                        onPress={this.goLoggedIn}
                        backgroundColor= {Colors.primaryAccent}
                        borderWidth={1}
                        borderColor="transparent"
                        borderRadius={30} // pass border radius
                        textColor="#fff"
                        textBold={false}
                        textItalic={false}
                        textSize={14}
                        textFont=""
                        text="LOGIN" //button texts
                        showIcon={false}// if false, pass null to every icon attribute below
                        iconType="Ionicons" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                        iconName="ios-people" //icon name according to iconType or pass null to hide
                        iconSize={30}
                        iconColor="#fff"
                        iconPosition="left" //left, right, null
                        loading={false} //true or false -- true to show spinner/loading
                        loadingText="" // default is Loading.., you may pass any texts or null not to show
                        paddingHorizontal={10}// 
                    />                        
                </View>
                <View style={{flexDirection:'row', alignSelf:'center', marginVertical:30}}>
                    <View>
                        <TakeerText style={{color:'#aaa'}}>Don't have an Account ? </TakeerText>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.props.t}>
                            <TakeerText style={{color:Colors.primaryAccent}}>Signup</TakeerText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) =>({
    settings: state.settings
});

export default connect(mapStateToProps,actions)(LoginComponent);