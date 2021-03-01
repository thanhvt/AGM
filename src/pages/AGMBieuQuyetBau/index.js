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
import CauHoi from './CauHoi';
import NhanSu from './NhanSu';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';


import {
    Image,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';
import TakeerText from '../../components/TakeerText';
import TakeerIcon from '../../components/TakeerIcon';
import { ActionSheet, Picker } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles'
const Item = Picker.Item;
 


class AGMBieuQuyetBau extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lstCauHoi: [],
            lstNhanSu: []
        };
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;

        this.loadInitialState()
            .done();
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    loadInitialState = async () => {
        var userProfile = JSON.parse(await AsyncStorage.getItem('user'));
        var provider = await AsyncStorage.getItem('provider');
        var idUser = await AsyncStorage.getItem('userId');
        // var avatar = await AsyncStorage.getItem('avatar');
        // var ngoaiNgu = this.props.language5.ngoaiNgu; // await AsyncStorage.getItem("NGOAI_NGU");

        // this.setState({
        //     isLoading: true,
        //     ngoaiNgu: ngoaiNgu
        // });

        // fetch(urlApiGetTuVung(idUser, ngoaiNgu, "-1"))
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((resJson) => {
        //         console.log('urlApiGetAllPagingByNotebookId', resJson);
        //         if (this._isMounted) {
        //             this.setState({
        //                 lstTuVung: resJson.Data.Results,
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //     });

        // fetch(urlApiGetBookmark(idUser, ngoaiNgu, "-1"))
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((resJson) => {
        //         console.log('urlApiGetAllQuestionPagingByNotebookId', resJson);
        //         if (this._isMounted) {
        //             this.setState({
        //                 lstBookmark: resJson.Data.Results,
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //     });

    }

    render() {
        const TTabNavigator = createAppContainer(createMaterialTopTabNavigator({
            TabOne: {
                screen: props => <CauHoi lstBookmark={this.state.lstCauHoi} {...props} nav={this.props.navigation} />,
                navigationOptions: {
                    header: null,
                    title: 'Câu hỏi biểu quyết',
                },
            },
            TabTwo: {
                screen: props => <NhanSu lstTuVung={this.state.lstNhanSu} {...props} nav={this.props.navigation} />,
                navigationOptions: {
                    header: null,
                    title: 'Bầu cử nhân sự',
                },
            }
            
        }, {
            tabBarPosition: 'top',
            animationEnabled: false,
            swipeEnabled: true,
            tabBarOptions: {
                activeTintColor: Colors.primaryAccent,
                inactiveTintColor: Colors.textSecondary,
                showLabel: true,
                showIcon: false,
                indicatorStyle: {
                    backgroundColor: Colors.primaryAccent,
                },
                labelStyle: {
                    fontSize: Fonts.size.h7
                },
                tabStyle: {
                    paddingHorizontal: 0,
                },
                style: {
                    backgroundColor: 'transparent'
                },
            },
        }));

        return (
            <SafeAreaView style={Styles.safeArea}>
                <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
                    <Header navigation={this.props.navigation} />
                    <View style={{ flex: 1, paddingHorizontal: 1 }}>
                        <TTabNavigator />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings,
    language5: state.language5
})
export default connect(mapStateToProps, actions)(AGMBieuQuyetBau); 