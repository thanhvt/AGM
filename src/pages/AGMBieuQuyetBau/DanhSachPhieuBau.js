import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image, Alert,
    TouchableOpacity, ImageBackground,
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

import Dialog from "react-native-dialog";
import { NavigationEvents } from "react-navigation";
import TakeerIcon from './../../components/TakeerIcon';
import { Fab } from 'native-base';
import { url_UyQuyen_List, url_DanhSachPhieuBau_List } from '../../Global';
class DanhSachPhieuBau extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lstDanhSachPhieuBau: [],
            dgLyDoInLai: false,
            txtLyDoInLai: '',
            MA_CODONG: ''
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

        var sURL = await url_DanhSachPhieuBau_List();
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
                console.log("url_DanhSachPhieuBau_List", response.Data);
                if (response.State == true) {
                    this.setState({ lstDanhSachPhieuBau: response.Data });
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

            <SafeAreaView style={Styles.safeArea}>

                <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
                    <View style={Styles.appHeader}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <View style={{ padding: 4 }}>
                                    <TakeerIcon
                                        iconType="Feather"
                                        iconName="arrow-left"
                                        iconSize={30}
                                        iconColor={Colors.primaryAccent}
                                        iconPosition="" //left, right, null
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexGrow: 1, alignItems: 'flex-start' }}>
                                <TakeerText style={Styles.headerTitle}>Danh sách phiếu bầu</TakeerText>
                            </View>

                        </View>
                    </View>
                    <ImageBackground
                        source={require("../../assets/images/night2.jpg")}
                        style={Styles.backgroundView}>
                        <ScrollView style={Styles.containerAfterHeader}>

                            <View>

                                {this.state.lstDanhSachPhieuBau.map((v, i) => (
                                    <TouchableOpacity key={`${i}-latest`} style={[Styles.latestHolder, {
                                        // backgroundColor: Colors.opacity,
                                        borderRadius: 4,
                                        alignContent: 'center',
                                        alignItems: 'center'

                                    }]} onPress={() => this.goCourse(v)}>
                                        <TakeerText style={Styles.latestTitle}>{i + 1}.</TakeerText>

                                        <View style={[Styles.latestContentHolder, { flex: 1 }]}>

                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                                                <TakeerText style={Styles.latestTitle}>{v.TEN_UVIEN}</TakeerText>
                                                {/* <TakeerText style={Styles.latestTitle}>In {v.SOLAN_IN} lần </TakeerText>  */}
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 }}>
                                                <View>
                                                    <TakeerText style={Styles.latestListH}>{v.SODKSH}</TakeerText>
                                                    <TakeerText style={Styles.latestListB}>Số ĐKSH</TakeerText>
                                                </View>
                                                <View>
                                                    <TakeerText style={Styles.latestListH}>{v.SOPHIEUBAU}</TakeerText>
                                                    <TakeerText style={Styles.latestListB}>Số phiếu bầu</TakeerText>
                                                </View>
                                                {/* <View>
                                                    <TakeerText style={Styles.latestListH}>{v.SOLAN_IN}</TakeerText>
                                                    <TakeerText style={Styles.latestListB}>SL In</TakeerText>
                                                </View> */}
                                                {/* <TouchableOpacity onPress={() => this.btnInLai(v.MA_CODONG)} style={{ alignItems: 'center' }}>
                                                    <TakeerIcon
                                                        iconType="MaterialCommunityIcons"
                                                        iconName="printer-wireless"
                                                        iconSize={22}
                                                        iconColor={Colors.textWhite}
                                                    />
                                                    <TakeerText style={Styles.latestListB}>In lại</TakeerText>
                                                </TouchableOpacity> */}
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                                                <View style={Styles.itm}>
                                                    <View style={Styles.itb} />
                                                </View>
                                                <TakeerText style={{
                                                    textAlign: 'center',
                                                    fontSize: 12,
                                                    paddingHorizontal: 6,
                                                    color: Colors.textSecondary
                                                }}>
                                                    ------
                                                </TakeerText>
                                                <View style={Styles.itm}>
                                                    <View style={Styles.itb} />
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>

                        </ScrollView>


                    </ImageBackground>
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

                <NavigationEvents
                    onWillFocus={payload => {
                        this.componentDidMount();
                    }}
                    onDidBlur={payload => {
                        this.setState({
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
export default connect(mapStateToProps, actions)(DanhSachPhieuBau);
