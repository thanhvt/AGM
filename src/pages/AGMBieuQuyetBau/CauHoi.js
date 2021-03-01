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

import TakeerIcon from './../../components/TakeerIcon';
import { Fab } from 'native-base';
import styles from './styles';
import { url_Question_List } from '../../Global';
var BUTTONS = [
    { text: "Tiếng Anh", icon: "american-football", iconColor: "#2c8ef4", value: "en-US" },
    { text: "Tiếng Tây Ban Nha", icon: "american-football", iconColor: "#ddd2ac", value: "es-ES" },
    { text: "Tiếng Nhật", icon: "analytics", iconColor: "#f42ced", value: "ja-JP" },
    { text: "Tiếng Hàn", icon: "aperture", iconColor: "#ea943b", value: "ko-KO" },
    { text: "Tiếng Trung", icon: "american-football", iconColor: "#3aabcc", value: "vi-VN" },
    // { text: "Tiếng Hàn", icon: "aperture", iconColor: "#22cab1", value: "zh-ZH" },
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

var Featured = [
    {
        title: 'Tăng vốn điều lệ giai đoạn 2020 - 2025. Đồng thời tăng lượng cổ đông',
        curPrice: 12.99,
        oldPrice: 19.99,
        cover: Images.business,
        isFeatured: true,
        category: 'Business'
    },
    {
        title: 'Tăng cường các hoạt đôngj giao lưu giữa các khối Nguyễn Anh Tuấn - 092829921',
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
    },
    {
        title: 'Tăng cường các hoạt đôngj giao lưu giữa các khối Nguyễn Anh Tuấn - 092829921',
        curPrice: 16.99,
        oldPrice: 20.99,
        cover: Images.guitar,
        isFeatured: false,
        category: 'Technology'
    },
    {
        title: 'Tăng cường các hoạt đôngj giao lưu giữa các khối Nguyễn Anh Tuấn - 092829921',
        curPrice: 16.99,
        oldPrice: 20.99,
        cover: Images.guitar,
        isFeatured: false,
        category: 'Technology'
    },
    {
        title: 'Tăng cường các hoạt đôngj giao lưu giữa các khối Nguyễn Anh Tuấn - 092829921',
        curPrice: 16.99,
        oldPrice: 20.99,
        cover: Images.guitar,
        isFeatured: false,
        category: 'Technology'
    },
];

class CauHoi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lstCauHoi: []

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

        var sURL = await url_Question_List();
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
                console.log("url_Question_List", response.Data);
                if (response.State == true) {
                    this.setState({ lstCauHoi: response.Data });
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

    }

    btnBieuQuyetCauHoi = (ID_CAUHOI, KETQUA, NOIDUNG, STT) => { 
        this.props.nav.navigate('BieuQuyetCauHoi', {
            ID_CAUHOI: ID_CAUHOI,
            KETQUA: KETQUA,
            NOIDUNG: NOIDUNG,
            STT: STT
        });
    }

    render() {

        return (
            <SafeAreaView style={Styles.safeArea}>
                <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
                    <ScrollView style={Styles.containerAfterHeader}>

                        <View>
                            {this.state.lstCauHoi.map((v, i) => (
                                <TouchableOpacity key={`${i}-latest`} style={[Styles.latestHolder, {
                                    backgroundColor: Colors.opacity,
                                    borderRadius: 4,
                                }]} onPress={() => this.goCourse(v)}>
                                    <TakeerText style={[styles.latestTitle, { marginLeft: 5 }]}>{i + 1}.</TakeerText>
                                    <View style={[Styles.latestContentHolder, { flex: 1 }]}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TakeerText style={styles.latestTitle}>{v.NOIDUNG}</TakeerText>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingVertical: 5 }}>
                                            <TouchableOpacity onPress={() => this.btnBieuQuyetCauHoi(v.Id, 0, v.NOIDUNG, i + 1)} style={{alignItems: 'center'}}>
                                                <TakeerIcon
                                                    iconType="Foundation"
                                                    iconName="dislike"
                                                    iconSize={30}
                                                    iconColor={Colors.bgGG}
                                                />
                                                <TakeerText style={Styles.normalTextBlack}>Không đồng ý</TakeerText>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.btnBieuQuyetCauHoi(v.Id, 2, v.NOIDUNG, i + 1)} style={{alignItems: 'center'}}>
                                                <TakeerIcon
                                                    iconType="MaterialCommunityIcons"
                                                    iconName="comment-plus"
                                                    iconSize={30}
                                                    iconColor={Colors.yellowish}
                                                />
                                                <TakeerText style={Styles.normalTextBlack}>Ý kiến khác</TakeerText>
                                            </TouchableOpacity>

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

                {/* <Fab
                    active={true}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: Colors.textWhite }}
                    position="bottomRight"
                    onPress={() => {
                        this.props.navigation.navigate('BieuQuyetCauHoi');
                    }}>

                    <TakeerIcon
                        iconType="MaterialCommunityIcons"
                        iconName="vote"
                        iconSize={24}
                        iconColor={Colors.vcb}
                    />

                </Fab> */}
            </SafeAreaView>
        );
    }

}

const mapStateToProps = (state) => ({
    settings: state.settings,
    agm: state.agm
})
export default connect(mapStateToProps, actions)(CauHoi);
