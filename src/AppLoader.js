import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Styles } from './Common';
import TakeerText from './components/TakeerText';
class AppLoader extends Component {
    render() {
        return (
            <View style={[{flex:1, justifyContent:'center',alignItems:'center'}, Styles.safeArea]}>
                <View>
                    <ActivityIndicator
                        size="large" 
                        color="#FFF" 
                    />
                    <TakeerText style={{marginTop:20}}>Getting Ready..</TakeerText>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({

});
export default AppLoader;