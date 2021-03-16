import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity, TextInput,
    SafeAreaView
} from 'react-native';
import { Picker } from 'native-base';
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
import { url_UyQuyen_List } from '../../Global';
import styles from './styles';
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


class AGMUyQuyen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lstFULL: [],
            lstUyQuyen: [],
            pickType: -1,
            dgThongTinUQ: false,
            itemUQ: undefined,
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

    goUQ = async (uq) => {
        // this.props.navigation.navigate('UyQuyen', {data: uq});
        this.setState({ itemUQ: uq, dgThongTinUQ: true })
    }

    pickLoc = async (type) => {
        this.setState({
            pickType: type
        });
        console.log(type);

        // await this.setState({
        //     isLoading: true,
        // });

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
                console.log("url_UyQuyen_List", response.Data);
                if (response.State == true) {
                    let mData = [];
                    if (type == 0) {
                        mData = response.Data.filter(c => c.USERID == this.props.agm.userAGM.id);
                    }
                    else if (type == 1) {
                        mData = response.Data;
                    }
                    this.setState({ lstUyQuyen: mData, lstFULL: response.Data });
                } else {

                }
                this.setState({
                    isLoading: false
                });
            }).finally(() => {
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

    txtTimKiemSubmit = (txtTim) => { 
        var lstTK = this.state.lstFULL.filter(c => c.NGUOI_UQ.indexOf(txtTim.nativeEvent.text) !== -1
        || c.CMTDUOC_UQ.indexOf(txtTim.nativeEvent.text) !== -1
        || c.CMT_NGUOIUQ.indexOf(txtTim.nativeEvent.text) !== -1
        || c.MA_CODONG.indexOf(txtTim.nativeEvent.text) !== -1
        || c.NGUOIDUOC_UQ.indexOf(txtTim.nativeEvent.text) !== -1);
        this.setState({ lstUyQuyen: lstTK });
    }

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
                                placeholder="Tìm kiếm theo họ tên, mã cổ đông, số đksh"
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

                            {this.state.lstUyQuyen.map((v, i) => (
                                <TouchableOpacity key={`${i}-latest`} style={[Styles.latestHolder, {
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    borderRadius: 4
                                }]} onPress={() => this.goUQ(v)}>
                                    <View style={[Styles.latestImage, { justifyContent: 'center', alignItems: 'center' }]}>
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

                <Dialog.Container visible={this.state.dgThongTinUQ}>
                    <Dialog.Title>Thông tin uỷ quyền</Dialog.Title>
                    {
                        this.state.itemUQ != undefined ?
                            <View>
                                <Dialog.Description>
                                    Người uỷ quyền: {this.state.itemUQ.NGUOI_UQ}
                                </Dialog.Description>
                                <Dialog.Description>
                                    CMT người uỷ quyền: {this.state.itemUQ.CMT_NGUOIUQ}
                                </Dialog.Description>
                                <Dialog.Description>
                                    Mã cổ đông: {this.state.itemUQ.MA_CODONG}
                                </Dialog.Description>
                                <Dialog.Description>
                                    Người được uỷ quyền: {this.state.itemUQ.NGUOI_DUOCUQ}
                                </Dialog.Description>
                                <Dialog.Description>
                                    CMT được uỷ quyền: {this.state.itemUQ.CMTDUOC_UQ}
                                </Dialog.Description>
                                <Dialog.Description>
                                    Số CP UQ: {this.state.itemUQ.SOCP_UQ}
                                </Dialog.Description>

                            </View>
                            :
                            <View>
                            </View>
                    }


                    <Dialog.Button label="Quay lại" onPress={() =>
                        this.setState({
                            dgThongTinUQ: false,
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
export default connect(mapStateToProps, actions)(AGMUyQuyen);
