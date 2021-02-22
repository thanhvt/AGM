import React, { Component } from 'react';
import { 
    Button,
    Text, 
    StyleSheet, 
    View,
    SafeAreaView 
} from 'react-native';

import styles from './styles';
import TakeerText from '../../components/TakeerText';


export default class Profile extends Component {

    static navigationOptions = {
        headerStyle:{
            backgroundColor:'#FFF'
        }
    }

    render() {

        const { navigate, state: { params } } = this.props.navigation;
        return (
            <SafeAreaView style={Styles.safeArea}>
            <View style={styles.container}>
                <TakeerText style={styles.header}>
                    This is {params.user}'s Profile
                </TakeerText>
                <Button
                    onPress={() => navigate('Modal')}
                    title="Open Modal"
                />
            </View>
            </SafeAreaView>
        );
    }
}