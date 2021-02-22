import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';

export default class TakeerContainer extends Component {
    constructor(props){
        super(props)
    }

    contents(){
        return this.props.children;
    }

    renderContents(){
        if(Platform.OS === "ios"){
            return (
                <KeyboardAvoidingView behavior="padding"
                style={{flexGrow:1}}>
                    {this.contents()}
                </KeyboardAvoidingView>
            )
        }else{
            return (
                <ScrollView style={{flexGrow:1}}>
                    {this.contents()}
                </ScrollView>
            )
        }
    }

    render() {
        return this.renderContents();
    }
}
