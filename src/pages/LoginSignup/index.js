import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Image } from 'react-native';
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

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginActive:true
        }
    }
    
    toggle=()=>{
        this.setState({loginActive: !this.state.loginActive});
    }

    loadComponent(){
        if(this.state.loginActive){
            return (
                <LoginComponent t={this.toggle} />
            )
        }else{
            return (
                <SignupComponent t={this.toggle} />
            )
        }
    }

    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
                <View style={{flex:1}}>
                    <Header navigation={this.props.navigation}/>
                    <View style={styles.main}>
                        <View style={styles.iLogo}>
                            {/* Logo Area */}
                            <Image source={require('../../assets/images/Logo.png')} />
                        </View>
                        <ScrollView style={{flex:1}}>
                        {this.loadComponent()}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ( state ) => ({
    settings: state.settings
});

export default connect(mapStateToProps,actions)(index);