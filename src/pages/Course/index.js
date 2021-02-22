import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import Header from './Header';
import { Styles, Colors, Fonts } from '../../Common';
import TakeerText from '../../components/TakeerText';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import TakeerFlatTabs from '../../components/TakeerFlatTabs';

import Lessons from './Lessons';
import Reviews from './Reviews';
import About from './About';

class Course extends Component {

    render() {

        const TTabNavigator = createAppContainer(createMaterialTopTabNavigator({
            TabOne:{
                screen: props => <Lessons {...props} nav={this.props.navigation}/>,
                navigationOptions:{
                    header:null,
                    title:'Lessons',
                },
            },
            TabTwo:{
                screen: props => <Reviews {...props} nav={this.props.navigation}/>,
                navigationOptions:{
                    header:null,
                    title:'Reviews',
                },
            },
            TabThree:{
                screen: props => <About {...props} nav={this.props.navigation}/>,
                navigationOptions:{
                    header:null,
                    title:'About',
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
                <View style={{paddingHorizontal:10, flex:1}}>
                    <View>
                        <TakeerText style={Styles.headerTitle}>Business Management</TakeerText>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center',marginTop:6}}>
                        <View>
                            <Image source={require('./assets/605.jpg')}
                            style={{width:20, height:20, borderRadius:10}} />
                        </View>
                        <View style={{marginLeft:8}}>
                            <TakeerText style={{color:'#FFF'}}>Louisa McGee</TakeerText>
                        </View>
                    </View>

                    <View style={{flex:1}}>
                        <TTabNavigator />
                    </View>
                </View>
            </View>
            </SafeAreaView>
        );
    }
}
export default Course;