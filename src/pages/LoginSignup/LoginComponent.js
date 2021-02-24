import React, { Component } from 'react';


import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Button, Image, Platform,
    KeyboardAvoidingView, TouchableHighlight,
    Alert,
  } from "react-native";
  import styles from "./styles";
  import TakeerIcon from "../../components/TakeerIcon";
  import TakeerButton from "../../components/TakeerButton";
  import TakeerText from "../../components/TakeerText";
  import * as actions from "../../actions";
  import { connect } from "react-redux";
  import { Colors, Images } from "../../Common";
  import { Toast } from "native-base";
//   import { showToast, showEror } from "../../components/mToast";
  import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
//   import { urlApiLogin, urlApiExternalLoginCallback } from './../../Global';
  import AsyncStorage from '@react-native-community/async-storage';

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          userInfo: null,
          loggedIn: false,
          username: '',
          password: '',
          ipserver: '',
          isLoading: false,
        };
      }

    goLoggedIn=()=>{
        this.props.isConnected();
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={[styles.iLogo, { flex: 1 }]}>
              <TakeerText style={{ color: Colors.vcb, fontSize: 24}}>ĐẠI HỘI CỔ ĐÔNG THƯỜNG NIÊN</TakeerText>
              <Image source={require('../../assets/images/vcb.png')} resizeMode="center"/>
            </View>
            <View style={{ flex: 2, justifyContent: 'space-between' }}>
                <View style={styles.inputLogin}>
                  <TextInput
                    placeholder="Tài khoản"
                    placeholderTextColor={Colors.primaryLight}
                    textColor={Colors.textWhite}
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                    style={styles.input}
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })}
                    onSubmitEditing={() => this.refs.password.focus()}
                    ref='username'
                    returnKeyType='next'
                  />
                </View>
                <View style={styles.inputLogin}>
                  <TextInput
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    placeholderTextColor={Colors.primaryLight}
                    textColor={Colors.textWhite}
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    onSubmitEditing={this.goLoggedIn.bind(this)}
                    ref='password'
                  />
                </View>
                <View style={styles.inputLogin}>
                  <TextInput
                    placeholder="Địa chỉ server"
                    placeholderTextColor={Colors.primaryLight}
                    textColor={Colors.textWhite}
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    value={this.state.ipserver}
                    onChangeText={(ipserver) => this.setState({ ipserver })}
                    onSubmitEditing={() => this.refs.ipserver.focus()}
                    ref='ipserver'
                    returnKeyType='done'
                  />
                </View>
    
              <View style={{
                paddingVertical: 6,
                marginHorizontal: 23,
    
              }}>
                <TouchableHighlight
                  style={{ justifyContent: 'center', borderColor: "transparent", borderRadius: 10, borderWidth: 1, backgroundColor: Colors.vcb, paddingVertical: 10 }}
                  onPress={this.goLoggedIn}
                >
                  <TakeerText style={{ color: Colors.textWhite, fontSize: 20, textAlign: 'center', paddingVertical: 6 }}>Đăng nhập</TakeerText>
                </TouchableHighlight>
              </View> 
    
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginVertical: 30
                }}
              >
                 
              </View>
    
    
            </View>
    
    
            <OrientationLoadingOverlay
              visible={this.state.isLoading}
              color="white"
              indicatorSize="large"
              messageFontSize={24}
              message="Đang tải dữ liệu ..."
            >
              <View>
                <Image style={{ height: 128, width: 128 }}
                  source={Images.loading}
                />
              </View>
            </OrientationLoadingOverlay>
    
          </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) =>({
    settings: state.settings
});

export default connect(mapStateToProps,actions)(LoginComponent);