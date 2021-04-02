import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image, Alert,
    TouchableOpacity, ImageBackground, TextInput,
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
import { Fab, Picker } from 'native-base';
import { url_UyQuyen_List, url_Checkin_List, url_Checkin_InLai } from '../../Global';
import styles from './styles';
var BUTTONS = [
    { text: "Tiếng Anh", icon: "american-football", iconColor: "#2c8ef4", value: "en-US" },
    { text: "Tiếng Tây Ban Nha", icon: "american-football", iconColor: "#ddd2ac", value: "es-ES" },
    { text: "Tiếng Nhật", icon: "analytics", iconColor: "#f42ced", value: "ja-JP" },
    { text: "Tiếng Hàn", icon: "aperture", iconColor: "#ea943b", value: "ko-KO" },
    { text: "Tiếng Trung", icon: "american-football", iconColor: "#3aabcc", value: "vi-VN" },
    // { text: "Tiếng Hàn", icon: "aperture", iconColor: "#22cab1", value: "zh-ZH" },
];

class Checkin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lstCheckin: [],
            dgLyDoInLai: false,
            txtLyDoInLai: '',
            MA_CODONG: '',
            pickType: -1,
            dgThongTinCheckin: false,
            itemCheckin: undefined,
            lstFULL: [],
            txtTimKiem: ''
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


    }

    goCheckIn = async (uq) => {
        this.setState({ itemCheckin: uq, dgThongTinCheckin: true })
    }


    handleCancel = () => {
        this.setState({
            dgLyDoInLai: false,
        });
    };

    handleOK = async () => {
        await this.setState({
            dgLyDoInLai: false
        });
        await this.setState({
            isLoading: true,
        });
        var sURL = await url_Checkin_InLai();
        var data = {
            MA_CODONG: this.state.MA_CODONG,
            REASON: this.state.txtLyDoInLai,
            CMT: this.state.CMT
        };
        await fetch(sURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "username": this.props.agm.userAGM.userName,
                "token": this.props.agm.userAGM.signInToken
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json();
            })
            .then(response => {
                console.log("url_Checkin_InLai", response);
                if (response.State == true) {
                    alert('Thành công');
                    this.componentDidMount();
                } else {
                    alert(response.Message);
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

    btnInLai = (MA_CODONG, CMT) => {
        this.setState({
            dgLyDoInLai: true,
            MA_CODONG: MA_CODONG,
            CMT: CMT
        });
    }

    getDSCheckin = async (type, filter) => {
        var sURL = await url_Checkin_List();
        await fetch(sURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "username": this.props.agm.userAGM.userName,
                "token": this.props.agm.userAGM.signInToken
            },
            body: JSON.stringify({ FILTER: filter })
        })
            .then(res => {
                return res.json();
            })
            .then(response => {
                console.log("url_Checkin_List", response.Data);
                if (response.State == true) {

                    let mData = [];
                    if (type == 0) {
                        mData = response.Data.filter(c => c.USERID == this.props.agm.userAGM.id);
                    }
                    else {
                        mData = response.Data;
                    }
                    this.setState({ lstCheckin: mData, lstFULL: response.Data });
                    console.log("state", this.state.lstCheckin, mData);
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

    pickLoc = async (type) => {
        console.log(type);
        this.setState({
            pickType: type,
        });
        this.getDSCheckin(type, '-1');
    }

    txtTimKiemSubmit = (txtTim) => {
        // console.log(this.state.lstFULL);
        this.getDSCheckin('-100', txtTim.nativeEvent.text);
        // var lstTK = this.state.lstFULL.filter(c => c.CMT.indexOf(txtTim.nativeEvent.text) !== -1
        //     || c.MA_CODONG.toString().indexOf(txtTim.nativeEvent.text) !== -1);
        // if (lstTK.length == 0) {
        //     alert('Không tìm thấy thông tin')
        // }
        // this.setState({ lstCheckin: lstTK });
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
                    <ImageBackground
                        source={require("../../assets/images/night2.jpg")}
                        style={Styles.backgroundView}>
                        <ScrollView style={Styles.containerAfterHeader}>

                            <View>

                                <View style={Styles.borderPicker}>
                                    <Picker
                                        selectedValue={this.state.pickType}
                                        onValueChange={this.pickLoc.bind(this)}
                                    >
                                        <Picker.Item key={-1} label="Chọn" value={-1} />
                                        <Picker.Item key={0} label="Lọc theo user đăng nhập" value={0} />
                                        <Picker.Item key={1} label={"Tất cả"} value={1} />
                                    </Picker>
                                </View>

                                <View style={{ marginVertical: 5 }}></View>
                                <TextInput
                                    placeholder="Tìm kiếm theo cmt"
                                    placeholderTextColor={Colors.textSecondary}
                                    textColor={Colors.textWhite}
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                    value={this.state.txtTimKiem}
                                    onChangeText={(txtTimKiem) => this.setState({ txtTimKiem })}
                                    onSubmitEditing={(txtTimKiem) => this.txtTimKiemSubmit(txtTimKiem)}
                                    ref='txtTimKiem'
                                    returnKeyType='search'
                                />
                                {this.state.lstCheckin.map((v, i) => (
                                    <TouchableOpacity key={`${i}-latest`} style={[Styles.latestHolder, {
                                        // backgroundColor: Colors.opacity,
                                        borderRadius: 4,
                                        alignContent: 'center',
                                        alignItems: 'center'

                                    }]} onPress={() => this.goCheckIn(v)}>
                                        {/* <TakeerText style={Styles.latestTitle}>{i + 1}.</TakeerText> */}

                                        <View style={[Styles.latestContentHolder, { flex: 1 }]}>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 }}>

                                                <TakeerText style={Styles.latestTitle}>{v.MA_CODONG}</TakeerText>
                                                <TakeerText style={Styles.latestTitle}>{v.CMT}</TakeerText>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 }}>
                                                <View>
                                                    <TakeerText style={Styles.latestListH}>{v.SOCP_SOHUU}</TakeerText>
                                                    <TakeerText style={Styles.latestListB}>CP sở hữu</TakeerText>
                                                </View>
                                                <View>
                                                    <TakeerText style={Styles.latestListH}>{v.SOCP_DUOCUQ}</TakeerText>
                                                    <TakeerText style={Styles.latestListB}>CP được UQ</TakeerText>
                                                </View>
                                                <View>
                                                    <TakeerText style={Styles.latestListH}>{v.SOLAN_IN}</TakeerText>
                                                    <TakeerText style={Styles.latestListB}>SL In</TakeerText>
                                                </View>
                                                <TouchableOpacity onPress={() => this.btnInLai(v.MA_CODONG, v.CMT)} style={{ alignItems: 'center' }}>
                                                    <TakeerIcon
                                                        iconType="MaterialCommunityIcons"
                                                        iconName="printer-wireless"
                                                        iconSize={22}
                                                        iconColor={Colors.textWhite}
                                                    />
                                                    <TakeerText style={Styles.latestListB}>In lại</TakeerText>
                                                </TouchableOpacity>
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

                <Dialog.Container visible={this.state.dgLyDoInLai}>
                    <Dialog.Title>Xác nhận</Dialog.Title>
                    <Dialog.Description>
                        Anh/Chị điền lý do in lại cho cổ đông này ?
                        </Dialog.Description>

                    <Dialog.Input value={this.state.txtLyDoInLai} style={{ color: "#000" }}
                        onChangeText={(txtLyDoInLai) => this.setState({ txtLyDoInLai })}></Dialog.Input>
                    <Dialog.Button label="Hủy" onPress={this.handleCancel} />
                    <Dialog.Button label="Đồng ý" onPress={() => this.handleOK()} />
                </Dialog.Container>

                <Dialog.Container visible={this.state.dgThongTinCheckin}>
                    <Dialog.Title>Thông tin checkin</Dialog.Title>
                    {
                        this.state.itemCheckin != undefined ?
                            <View>
                                <Dialog.Description>
                                    Người checkin: {this.state.itemCheckin.CMT}
                                </Dialog.Description>
                                <Dialog.Description>
                                    Mã cổ đông: {this.state.itemCheckin.MA_CODONG}
                                </Dialog.Description>
                                <Dialog.Description>
                                    Số CP sở hữu: {this.state.itemCheckin.SOCP_SOHUU}
                                </Dialog.Description>
                                <Dialog.Description>
                                    Số CP được uỷ quyền: {this.state.itemCheckin.SOCP_DUOCUQ}
                                </Dialog.Description>
                                <Dialog.Description>
                                    Số lần in: {this.state.itemCheckin.SOLAN_IN}
                                </Dialog.Description>

                            </View>
                            :
                            <View>
                            </View>
                    }


                    <Dialog.Button label="Quay lại" onPress={() =>
                        this.setState({
                            dgThongTinCheckin: false,
                        })}

                    />
                </Dialog.Container>

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
export default connect(mapStateToProps, actions)(Checkin);
