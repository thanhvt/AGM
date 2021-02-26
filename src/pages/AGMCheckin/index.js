import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Colors, Styles, Images, Fonts } from '../../Common';
import TakeerText from '../../components/TakeerText';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';
import { Container, ActionSheet, Button, Body, Right } from 'native-base';
import NumberFormat from 'react-number-format';
import { StatusBar } from 'react-native';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
// import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
// import { createAppContainer } from 'react-navigation';
// import { urlApiGetKhoaHoc, urlServerImage, urlApiGetThongTinUser } from './../../Global';
// import { urlApiGetDanhMucKhoaHoc } from '../../Global'; 

import { NavigationEvents } from "react-navigation";
import TakeerIcon from './../../components/TakeerIcon';
import { Fab } from 'native-base';
import { url_UyQuyen_List, url_Checkin_List } from '../../Global';
var BUTTONS = [
    { text: "Tiếng Anh", icon: "american-football", iconColor: "#2c8ef4", value: "en-US" },
    { text: "Tiếng Tây Ban Nha", icon: "american-football", iconColor: "#ddd2ac", value: "es-ES" },
    { text: "Tiếng Nhật", icon: "analytics", iconColor: "#f42ced", value: "ja-JP" },
    { text: "Tiếng Hàn", icon: "aperture", iconColor: "#ea943b", value: "ko-KO" },
    { text: "Tiếng Trung", icon: "american-football", iconColor: "#3aabcc", value: "vi-VN" },
    // { text: "Tiếng Hàn", icon: "aperture", iconColor: "#22cab1", value: "zh-ZH" },
];
// Id   Name
// en-US    Tiếng Anh
// es-ES    Tiếng Tây Ban Nha
// ja-JP    Tiếng Nhật
// ko-KO    Tiếng Hàn
// vi-VN    Tiếng Trung
// zh-ZH    Tiếng Trung
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

var Featured = [
    {
        title: 'Đỗ Quốc Anh - 92829293',
        curPrice: 12.99,
        oldPrice: 19.99,
        cover: Images.business,
        isFeatured: true,
        category: 'Business'
    },
    {
        title: 'Nguyễn Anh Tuấn - 092829921',
        curPrice: 16.99,
        oldPrice: 20.99,
        cover: Images.guitar,
        isFeatured: false,
        category: 'Technology'
    },
    {
        title: 'Trịnh Văn Thanh - 02928383',
        curPrice: 10.98,
        oldPrice: 10.98,
        cover: Images.medicine,
        isFeatured: true,
        category: 'Design'
    },
    {
        title: 'Technology for Enthusiast',
        curPrice: 200.5,
        oldPrice: 222.8,
        cover: Images.guitar,
        isFeatured: true,
        category: 'Business'
    }
];

class Checkin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lstCheckin: []
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
        StatusBar.setHidden(true);

        await this.setState({
            isLoading: true,
        });

        var sURL = await url_Checkin_List();
        await fetch(sURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "username": this.props.agm.userAGM.userName,
                "token": this.props.agm.userAGM.signInToken
            }
        })
            .then(res => {
                return res.json();
            })
            .then(response => {
                console.log("url_Checkin_List", response.Data);
                if (response.State == true) {
                    this.setState({ lstCheckin: response.Data });
                } else {

                }
                this.setState({
                    isLoading: false
                });
            })
            .catch(e => {
                console.log('exp', e)
                this.setState({
                    isLoading: false
                });
            });
    }

    goCourse = (course) => {
        // this.props.trangThaiHoc(false);
        // this.props.broadcastITEM_KHOAHOC(course);
        // this.props.nav.navigate('Course');
    }
 

    render() {

        // const lstKhoaHoc = this.props.language5.listKhoaHoc;

        return (
            // <SafeAreaView style={Styles.safeArea}>
            // <View style={{flex:1, backgroundColor:Colors.secondary}}>
            //     <Header navigation={this.props.navigation}/>
            //     <View style={{flex:1, paddingHorizontal:8}}>
            //         <TTabNavigator />
            //     </View>
            // </View>
            // </SafeAreaView>

            <SafeAreaView style={Styles.safeArea}>
                <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
                    <Header navigation={this.props.navigation} />
                    <ScrollView style={Styles.containerAfterHeader}>

                        <View>


                            {this.state.lstCheckin.map((v, i) => (
                                <TouchableOpacity key={`${i}-latest`} style={[Styles.latestHolder, {
                                    backgroundColor: Colors.opacity,
                                    borderRadius: 4
                                }]} onPress={() => this.goCourse(v)}>
                                    {/* <View style={Styles.latestImage}>
                                        <Image source={v.cover} style={Styles.latestCover}
                                            resizeMethod="scale"
                                        />
                                    </View> */}
                                    <TakeerText style={Styles.latestTitle}>{i + 1}.</TakeerText>
                                    <View style={[Styles.latestContentHolder, { flex: 1 }]}>
                                   
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            
                                            <TakeerText style={Styles.latestTitle}>{v.CMT}</TakeerText>
                                            {/* <TakeerText style={Styles.latestTitle}>SL in: {v.SOLAN_IN}</TakeerText> */}
                                            {/* <View style={{ alignItems: 'center' }}>
                                            <TakeerText style={Styles.latestTitle}>{v.title}</TakeerText>
                                            </View> */}
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 }}>
                                            <View>
                                                <TakeerText style={Styles.latestListH}>{v.SOCP_SOHUU}</TakeerText>
                                                <TakeerText style={Styles.latestListB}>Số CP sở hữu</TakeerText>
                                            </View>
                                            <View>
                                                <TakeerText style={Styles.latestListH}>{v.SOCP_DUOCUQ}</TakeerText>
                                                <TakeerText style={Styles.latestListB}>Số CP được UQ</TakeerText>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </ScrollView>
                </View>
                <OrientationLoadingOverlay
                    visible={this.state.isLoading}
                    color="white"
                    indicatorSize="large"
                    messageFontSize={24}
                    message="Đang tải dữ liệu ..."
                >
                    <View>
                        <Image style={{ height: 128, width: 128 }}
                            source={Images.loading}
                        />
                    </View>
                </OrientationLoadingOverlay>

                <Fab
                    active={true}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: Colors.textWhite }}
                    position="bottomRight"
                    onPress={() => {
                        this.props.navigation.navigate('ThucHienCheckin');
                    }}>

                    <TakeerIcon
                        iconType="MaterialCommunityIcons"
                        iconName="qrcode"
                        iconSize={24}
                        iconColor={Colors.vcb}
                    />

                </Fab>
           
                <NavigationEvents
                    onWillFocus={payload => {
                        console.log('11111111', payload);
                        this.componentDidMount();
                    }}
                    onDidBlur={payload => {
                        console.log('22222222', payload);
                        this.setState({
                            itemPhieuCongTac: undefined,
                        });
                    }}
                />
            </SafeAreaView>
        );
    }

}

const mapStateToProps = (state) => ({
    settings: state.settings,
    agm: state.agm
})
export default connect(mapStateToProps, actions)(Checkin);
