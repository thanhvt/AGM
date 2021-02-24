import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ActivityIndicator,
    StatusBar
} from 'react-native';

import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
////////////////////////////////////////////////
//////////////////// REDUX IMPORT //////////////
import { Provider, connect } from 'react-redux';
import store from './Store';
import { Styles, Colors } from './Common';


//////////////////////////////////////////////////
//////////////////// IMPORT PAGES ////////////////
//Main Tabs
import TabHome from './pages/TabHome';
import AGMUyQuyen from './pages/AGMUyQuyen';
import TabCourses from './pages/TabCourses';
import TabChats from './pages/TabChats';
import TabProfile from './pages/TabProfile';
import TabSearch from './pages/TabSearch';

//Import Pages
import Drawer from './Drawer';
import AppLoader from './AppLoader';
import Walkthrough from './pages/Walkthrough';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import Modal from './pages/Modal';
import Course from './pages/Course';

import TakeerIcon from './components/TakeerIcon';
import CourseDetail from './pages/CourseDetail';
import Chat from './pages/Chat';
import Congrats from './pages/Congrats';
import Instructor from './pages/User/Instructor';
import Student from './pages/User/Student';
import UyQuyen from './pages/AGMUyQuyen/UyQuyen';

import Checkin from './pages/AGMCheckin';
import ThucHienCheckin from './pages/AGMCheckin/ThucHienCheckin';

//////////////////////////////////////////////////
/////////////////// NAVIGATORS ///////////////////
//Tab Navigator for Home and Settings Screen
const TTabNavigator = createBottomTabNavigator({
    AGMUyQuyen: {
        screen: AGMUyQuyen,
        navigationOptions: {
            title: 'Uỷ quyền',
            tabBarIcon: ({ tintColor }) => <TakeerIcon
                iconType="MaterialIcons"
                iconName="assessment"
                iconSize={24}
                iconColor={tintColor}
                iconPosition="" />,
        },
    },
    AGMCheckin: {
        screen: Checkin,
        navigationOptions: {
            title: 'Checkin',
            tabBarIcon: ({ tintColor }) => <TakeerIcon
                iconType="MaterialCommunityIcons"
                iconName="presentation-play"
                iconSize={24}
                iconColor={tintColor}
                iconPosition="" />,
        },
    },
    TabHome: {
        screen: TabHome,
        navigationOptions: {
            title: 'Home',
            tabBarIcon: ({ tintColor }) => <TakeerIcon
                iconType="Ionicons"
                iconName="ios-home"
                iconSize={24}
                iconColor={tintColor}
                iconPosition="" />,
        },
    },
    TabChats: {
        screen: TabChats,
        navigationOptions: {
            title: 'Phiếu bầu',
            tabBarIcon: ({ tintColor }) => <TakeerIcon
                iconType="MaterialCommunityIcons"
                iconName="comment-text"
                iconSize={24}
                iconColor={tintColor}
                iconPosition="" />,
        },
    },
    TabProfile: {
        screen: TabProfile,
        navigationOptions: {
            title: 'Cài đặt',
            tabBarIcon: ({ tintColor }) => <TakeerIcon
                iconType="MaterialCommunityIcons"
                iconName="account-edit"
                iconSize={24}
                iconColor={tintColor}
                iconPosition="" />,
        },
    },
}, {
        initialRouteName: "TabHome",
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: Colors.activeTabColor,
            inactiveTintColor: Colors.inactiveTab,
            showLabel: true,
            showIcon: true,
            indicatorStyle: {
                backgroundColor: 'transparent',
            },
            tabStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                /*...Platform.select({
                    ios:{
                        paddingBottom:20,
                    },
                    android:{
                        paddingBottom:10,
                    }
                }),*/
                paddingHorizontal: 0,
                paddingTop: 3
            },
            style: {
                backgroundColor: Colors.bgTab,
            },
        },
    });


//wrap tab navigation into drawer navigation
const TabsWithDrawerNavigation = createDrawerNavigator({
    Tbs: {
        screen: TTabNavigator,
    }
}, {
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        drawerWidth: 250,
        contentComponent: props => <Drawer {...props} />,
        drawerBackgroundColor: 'transparent'
    });

//lastly stack drawer with tabs and modal navigation
const MasterNavigator = createAppContainer(createStackNavigator({
    TabsWithDrawer: {
        screen: TabsWithDrawerNavigation,
    },
    Modal: {
        screen: Modal
    },
    LoginSignup: {
        screen: LoginSignup
    },
    Course: {
        screen: Course
    },
    CourseDetail: {
        screen: CourseDetail
    },
    Chat: {
        screen: Chat
    },
    UyQuyen: {
        screen: UyQuyen
    },
    ThucHienCheckin: {
        screen: ThucHienCheckin
    }, 
    Congrats: {
        screen: Congrats
    },
    Instructor: {
        screen: Instructor
    },
    Student: {
        screen: Student
    }
}, {
        mode: 'modal',
        headerMode: 'none'
    }));

//////////////////////////////////////////////////
///////////// MAIN CLASS /////////////////////////
const StartApp = ({ settings, rehydrate }) => {
    if (rehydrate) {
        //check if setting splash is true
        // if (settings.walkthrough) 
        {
            if (!settings.userLoggedIn) {
                return (
                    <LoginSignup />
                );
            } else {
                return (
                    <MasterNavigator />
                );
            }
        }
        // else {
        //     return (
        //         <Walkthrough />
        //     )
        // }
    } else {
        return (
            <AppLoader />
        )
    }
}
const mapStateToProps = (state) => ({
    settings: state.settings,
    rehydrate: state.rehydrate
});
Start = connect(mapStateToProps)(StartApp);


////////////////////////////////////////////////
////////// EXPORT ROOT APP /////////////////////
const Root = () => (
    <Provider store={store}>
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor="#000"
                barStyle="light-content"
                translucent={true}
            />
            <Start />
        </View>
    </Provider>
);
export default Root;