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
// import { url_NhanSu_List, urlServerImage, urlApiGetThongTinUser } from './../../Global';
import { url_NhanSu_List } from '../../Global'; 

import TakeerIcon from './../../components/TakeerIcon';
import { Fab } from 'native-base';
import styles from './styles'; 
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

class NhanSu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lstNhom: [],
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
        StatusBar.setHidden(true);
        await this.setState({
            isLoading: true,
        });

        var sURL = await url_NhanSu_List();
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
            .then(async response => {
                console.log("url_NhanSu_List", response.Data);
                if (response.State == true) {
                    var resArr = [];
                    response.Data.forEach(e => {
                        var i = resArr.findIndex(x => x.NHOM_TV == e.NHOM_TV);
                        // console.log()
                        if (i <= -1) {
                            resArr.push({ NHOM_TV: e.NHOM_TV, TEN_NHOM: e.TEN_NHOM });
                        }
                    })

                    await this.setState({ lstNhom: resArr, lstNhanSu: response.Data });
                    console.log('lstNhom', resArr);

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

    goVote = (nhom) => {
        var lstNhanSu = this.state.lstNhanSu.filter(c => c.NHOM_TV == nhom.NHOM_TV);
        console.log('ns bau', lstNhanSu);
        this.props.nav.navigate('BauCuNhanSu', {
            NHOM_TV: nhom.NHOM_TV,
            TEN_NHOM: nhom.TEN_NHOM,
            LST_NHANSU: lstNhanSu
        });
    }
 

    render() {

        // const lstKhoaHoc = this.props.language5.listKhoaHoc;

        return (
           

            <SafeAreaView style={Styles.safeArea}>
                <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
                    <ScrollView style={Styles.containerAfterHeader}>

                        <View>


                            {this.state.lstNhom.map((v, i) => (
                                <TouchableOpacity key={`${i}-latest`} style={[Styles.latestHolder, {
                                    backgroundColor: Colors.opacity,
                                    borderRadius: 4,
                                }]} onPress={() => this.goVote(v)}>
                                    <TakeerText style={[styles.latestTitle, { marginLeft: 5 }]}>{i + 1}.</TakeerText>
                                    <View style={[Styles.latestContentHolder, { flex: 1 }]}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TakeerText style={styles.latestTitle}>{v.TEN_NHOM}</TakeerText>
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
export default connect(mapStateToProps, actions)(NhanSu);
