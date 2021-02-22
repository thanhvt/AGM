import React, { Component } from 'react';
import { 
    View, 
    Text,
    SafeAreaView 
} from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Colors, Styles, Fonts } from '../../Common';
import Header from './Header';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'

import All from './All';
import Instructors from './Instructors';
import Friends from './Friends';

class TabChats extends Component {

    render() {
        const TTabNavigator = createAppContainer(createMaterialTopTabNavigator({
            TabOne:{
                screen: props => <All {...props} nav={this.props.navigation}/>,
                navigationOptions:{
                    header:null,
                    title:'All',
                },
            },
            TabTwo:{
                screen: props => <Instructors {...props} nav={this.props.navigation}/>,
                navigationOptions:{
                    header:null,
                    title:'Instructors',
                },
            },
            TabThree:{
                screen: props => <Friends {...props} nav={this.props.navigation}/>,
                navigationOptions:{
                    header:null,
                    title:'Friends',
                },
            }
        },{
            tabBarPosition: 'top',
            animationEnabled: false,
            swipeEnabled: true,
            tabBarOptions: {
              activeTintColor: Colors.primaryAccent,
              inactiveTintColor: Colors.textSecondary,
              showLabel:true,
              showIcon:false,
              indicatorStyle:{
                backgroundColor: Colors.primaryAccent,
              },
              labelStyle:{
                fontSize: Fonts.size.h7 
              },
              tabStyle: {
                /*...Platform.select({
                    ios:{
                        paddingBottom:20,
                    },
                    android:{
                        paddingBottom:10,
                    }
                }),*/
                paddingHorizontal:0,
              },
              style: {
                backgroundColor: 'transparent'
              },
            },
        }));

        return (
            <SafeAreaView style={Styles.safeArea}>
            <View style={{flex:1, backgroundColor:Colors.secondary}}>
                <Header navigation={this.props.navigation}/>
                <View style={{flex:1, paddingHorizontal:8}}>
                    <TTabNavigator />
                </View>
            </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ( state ) => ({
    settings: state.settings
})
export default connect(mapStateToProps,actions)(TabChats);