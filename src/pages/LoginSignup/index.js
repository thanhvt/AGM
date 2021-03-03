import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput,
    SafeAreaView, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native';
import Header from './header';
import styles from './styles';
import TakeerIcon from '../../components/TakeerIcon';
import TakeerButton from '../../components/TakeerButton';
import TakeerContainer from '../../components/TakeerContainer';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import TakeerText from '../../components/TakeerText';
import { Colors, Styles } from '../../Common';
import { Container } from 'native-base';
const bg = require("../../assets/images/bg.jpg");

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginActive: true
        }
    }

    componentDidMount() { 
    
        StatusBar.setHidden(true);
      }

    toggle = () => {
        this.setState({ loginActive: !this.state.loginActive });
    }

    loadComponent() {
        if (this.state.loginActive) {
            return (
                <LoginComponent t={this.toggle} />
            )
        } else {
            return (
                <SignupComponent t={this.toggle} />
            )
        }
    }

    render() {
        return (
            <Container style={Styles.safeArea}>
                <StatusBar barStyle="light-content" />
                <ImageBackground source={bg} style={Styles.backgroundLogin}>
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}> 
                        {this.loadComponent()}
                    </View>
                </ImageBackground>

            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings
});

export default connect(mapStateToProps, actions)(index);