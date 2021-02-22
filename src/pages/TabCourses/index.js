import React, { Component } from 'react';
import { 
    View, 
    Text,
    SafeAreaView
} from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Colors, Styles, Fonts } from '../../Common';
import TakeerText from '../../components/TakeerText';
import TakeerIcon from '../../components/TakeerIcon';
import Course from '../Course';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import TabOne from './TabOne';
import TabTwo from './TabTwo';
import TabThree from './TabThree';
import Header from './Header';


class TopTabs extends Component {

}

class TabCourses extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }
    
    render() {
        const TTabNavigator = createAppContainer(createMaterialTopTabNavigator({
            TabOne:{
                screen: props => <TabOne {...props} nav={this.props.navigation} />,
                navigationOptions:{
                    header:null,
                    title:'All',
                },
            },
            TabTwo:{
                screen:  props => <TabTwo {...props} nav={this.props.navigation} />,
                navigationOptions:{
                    header:null,
                    title:'Ongoing',
                },
            },
            TabThree:{
                screen:  props => <TabThree {...props} nav={this.props.navigation} />,
                navigationOptions:{
                    header:null,
                    title:'Completed',
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
                <Header/>
                <View style={{flex:1, marginTop:10}}>
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
export default connect(mapStateToProps,actions)(TabCourses);