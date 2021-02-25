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
import { url_UyQuyen_List } from '../../Global';
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
        title: 'Business Management',
        curPrice: 12.99,
        oldPrice: 19.99,
        cover: Images.business,
        isFeatured: true,
        category: 'Business'
    },
    {
        title: 'Learn How To Play Guitar',
        curPrice: 16.99,
        oldPrice: 20.99,
        cover: Images.guitar,
        isFeatured: false,
        category: 'Technology'
    },
    {
        title: 'Medicine & Biology Basics',
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

class AGMUyQuyen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lstUyQuyen: []

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


        var sURL = await url_UyQuyen_List();
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
                console.log("url_UyQuyen_List", response);
                if (response.State == true) {
                    this.setState({ lstUyQuyen: response.Data});
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

        // let data = {
        //     CommentContent: '111',
        //     UserName: 'dunghoang',
        //     UserId: '12',
        //     LessionId: 22,
        //     CreatedBy: 'thanh'
        //   };
        //   var result = await fetch('http://apil5.vnittech.com/api/Bookmark/AddQuestion/7C383E6B-C314-4F82-FB66-08D85E1AAA5E/22/dunghoang', {
        //     method: 'POST',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        //   })
        //     .then((res) => res.json())
        //     .then(resJson => {

        //       console.log("urlApiSendComment", resJson);

        //     })
        //     .catch(e => {
        //       console.log("ex", e);
        //     });

    }

    goCourse = (course) => {
        // this.props.trangThaiHoc(false);
        // this.props.broadcastITEM_KHOAHOC(course);
        // this.props.nav.navigate('Course');
    }

    // renderPrice(o, n) {
    //     var dis = Number(o) - Number(n);
    //     if (dis > 0.001) {
    //         return (
    //             <View style={{ flexDirection: 'row' }}>
    //                 <View> 
    //                     <NumberFormat value={n}
    //                         renderText={(value) => <TakeerText style={{
    //                             color: Colors.textPrimary,
    //                         }} >{value}</TakeerText>}
    //                         displayType={'text'} thousandSeparator={true} suffix={' VNĐ'} />
    //                 </View>
    //                 <View style={{ paddingLeft: 8 }}> 
    //                     <NumberFormat value={o}
    //                         renderText={(value) => <TakeerText style={{
    //                             color: Colors.textPrimary,
    //                             textDecorationLine: 'line-through',
    //                             textDecorationColor: Colors.textSecondary,
    //                         }}>{value}</TakeerText>}
    //                         displayType={'text'} thousandSeparator={true} suffix={' VNĐ'} />
    //                 </View>
    //             </View>
    //         )
    //     } else {
    //         return (
    //             <View> 
    //                 <NumberFormat value={o}
    //                     renderText={(value) => <TakeerText style={{
    //                         color: Colors.textPrimary,
    //                     }} >{value}</TakeerText>}
    //                     displayType={'text'} thousandSeparator={true} suffix={' VNĐ'} />
    //             </View>
    //         )
    //     }
    // }

    render() {

        // const lstUyQuyen = this.props.language5.listKhoaHoc;

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

                            {this.state.lstUyQuyen.map((v, i) => (
                                <TouchableOpacity key={`${i}-latest`} style={[Styles.latestHolder, {
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    borderRadius: 4
                                }]} onPress={() => this.goCourse(v)}>
                                    <View style={[Styles.latestImage, {justifyContent: 'center', alignItems: 'center'}]}>
                                        {/* <Image source={v.cover} style={Styles.latestCover}
                                            resizeMethod="scale"
                                        /> */}
                                        <TakeerText style={Styles.latestTitleUQ}>{v.CMT_NGUOIUQ}</TakeerText>
                                    </View>
                                    <View style={[Styles.latestContentHolder, { flex: 1 }]}>
                                        <View>
                                            <TakeerText style={Styles.latestTitle}>{v.NGUOI_UQ}</TakeerText>
                                            <View style={{ alignItems: 'center' }}>

                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 }}>
                                            <View>
                                                <TakeerText style={Styles.latestListH}>{v.SOCP_UQ}</TakeerText>
                                                <TakeerText style={Styles.latestListB}>Số CP UQ</TakeerText>
                                            </View>
                                            <View>
                                                <TakeerText style={Styles.latestListH}>{v.CMTDUOC_UQ}</TakeerText>
                                                <TakeerText style={Styles.latestListB}>CMND người được UQ</TakeerText>
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
                        this.props.navigation.navigate('UyQuyen');
                    }}>

                    <TakeerIcon
                        iconType="MaterialIcons"
                        iconName="person-add"
                        iconSize={24}
                        iconColor={Colors.vcb}
                    />

                </Fab>
            </SafeAreaView>
        );
    }

}

const mapStateToProps = (state) => ({
    settings: state.settings,
    agm: state.agm
})
export default connect(mapStateToProps, actions)(AGMUyQuyen);
