import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView, Text,
    TextInput, KeyboardAvoidingView,
    Keyboard, ImageBackground,
    SafeAreaView, Modal, Dimensions
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import TakeerText from '../../components/TakeerText';
import { Styles, Fonts, Colors, Images } from '../../Common';
import TakeerIcon from '../../components/TakeerIcon';
import styles from './styles';
import TakeerButton from '../../components/TakeerButton';

import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import * as actions from '../../actions';
import { connect } from 'react-redux';

import {
    url_Checkin_HASHCODE, url_Checkin_MACD, url_Checkin_SODKSH, url_BauCu_SODKSH, url_BauCu_MACD,
    url_Answer_ThemLo, url_Answer_ThemLe
} from '../../Global';
const { width, height } = Dimensions.get('window')

class BieuQuyetCauHoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            margin_bottom: 10, dgQR: false,

            scan: false,
            ScanResult: false,
            result: null,
            ID_CAUHOI: '',
            NOIDUNG: '',
            KETQUA: null,
            STT: null,

            macodong: '',
            sodksh: '',
            lstBQHangDoi: [],

            HOTEN: '',
            SOCP_SOHUU: ''
        }
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;

        this.loadInitialState()
            .done();

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    };

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide() {
        this.setState({ margin_bottom: 10 });
    }

    _keyboardDidShow(e) {
        var height = e.endCoordinates.height;
        //console.log('Keyboard Height', height);
        this.setState({ margin_bottom: height });
        setTimeout(() => {
            //this.scrollRef.scrollToEnd();
        }, 10)
    }

    async loadInitialState() {

        const item = this.props.navigation.state.params;


        await this.setState({
            ID_CAUHOI: item.ID_CAUHOI,
            NOIDUNG: item.NOIDUNG,
            KETQUA: item.KETQUA,
            STT: item.STT
        });
        await this.setState({
            isLoading: true,
        });


        // ThanhVT khi lấy hàng đợị lọc theo KHÔNG ĐỒNG Ý | KHÁC
        var LIST_BIEUQUYETCAUHOI = await AsyncStorage.getItem("LIST_BIEUQUYETCAUHOI");
        var lstBQHangDoi = [];
        if (LIST_BIEUQUYETCAUHOI != undefined && LIST_BIEUQUYETCAUHOI != null) {
            lstBQHangDoi = JSON.parse(LIST_BIEUQUYETCAUHOI);
            console.log("lstBQHangDoi ", lstBQHangDoi, item);
            lstBQHangDoi = lstBQHangDoi.filter(c => c.KETQUA == item.KETQUA && c.ID_CAUHOI == item.ID_CAUHOI);
        };
        await this.setState({
            isLoading: false,
            lstBQHangDoi: lstBQHangDoi
        });

    }

    btnQRCODE = async () => {
        this.setState({ dgQR: true, scan: true })
    };

    onSuccess = async (e) => {

        console.log('scanned data' + e.data);
        this.setState({
            result: e.data,
            scan: false,
            ScanResult: true,
            dgQR: false,
            SOCP_SOHUU: '',
            HOTEN: ''
        });

        var result = e.data.replace(/-/g, '');
        var splitData = result.split('|');
        console.log(splitData);
        await this.setState({
            sodksh: splitData[2],
            macodong: splitData[3],
            SOCP_SOHUU: Number(splitData[1]) + Number(splitData[0]) + '',
            SOCP_UQ: splitData[0],
            HOTEN: '',
        });

        // await this.setState({
        //     isLoading: true,
        // });

        var data = {};
        var sURL = '';
        if (this.state.macodong != '' && this.state.macodong != 0 && this.state.macodong != '0') {
            sURL = await url_BauCu_MACD();
            data = {
                MA_CODONG: this.state.macodong,
                ID_CAUHOI: this.state.ID_CAUHOI,
                SODKSH: '',
                GET_NAME: true
            }
        }
        else if (this.state.sodksh != '') {
            sURL = await url_BauCu_SODKSH();
            data = {
                MA_CODONG: '0',
                ID_CAUHOI: this.state.ID_CAUHOI,
                SODKSH: this.state.sodksh,
                GET_NAME: true
            }
        }
        console.log(data, sURL);

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
                console.log("url_CoDong_xxx", response);
                if (response.State == true) {
                    this.setState({
                        HOTEN: response.Data.HOTEN,
                    });
                }
                else if (response.Message != '') {
                    alert(response.Message);
                    this.setState({
                        sodksh: '',
                        macodong: '',
                        SOCP_SOHUU: '',
                        HOTEN: ''
                    });
                }
                this.setState({
                    isLoading: false
                });
            })
            .catch(e => {
                console.log('exp tkiem', e)
                this.setState({
                    isLoading: false
                });
            });
    }

    btnHangDoi = async () => {

        if (this.state.sodksh == '' || this.state.HOTEN == '' || this.state.SOCP_SOHUU == '') {
            alert("Thông tin không hợp lệ")
            return;
        }


        var LIST_BIEUQUYETCAUHOI = await AsyncStorage.getItem("LIST_BIEUQUYETCAUHOI");
        var lstBQHangDoi = [];
        if (LIST_BIEUQUYETCAUHOI != undefined && LIST_BIEUQUYETCAUHOI != null) {
            lstBQHangDoi = JSON.parse(LIST_BIEUQUYETCAUHOI);
            console.log(lstBQHangDoi)
            lstBQHangDoi = lstBQHangDoi.filter(c => c.KETQUA == this.state.KETQUA && c.ID_CAUHOI == this.state.ID_CAUHOI);

            var lstCheckTrung = lstBQHangDoi.filter(c => c.MA_CODONG == this.state.macodong && c.SODKSH == this.state.sodksh);
            console.log(lstCheckTrung.length);
            if (lstCheckTrung.length > 0) {
                alert('Nội dung biểu quyết này đã tồn tại trong hàng đợi');
                return;
            }
        }

        await this.setState({
            isLoading: true,
        });

        var item = {
            "MA_CODONG": this.state.macodong,
            "SODKSH": this.state.sodksh,
            "SOCP_SOHUU": this.state.SOCP_SOHUU,
            "ID_CAUHOI": this.state.ID_CAUHOI,
            "ND_CAUHOI": this.state.NOIDUNG,
            "KETQUA": this.state.KETQUA,
            "YKIENKHAC": "",
            "HOTEN": this.state.HOTEN
        };
        lstBQHangDoi.push(item);
        await AsyncStorage.setItem('LIST_BIEUQUYETCAUHOI', JSON.stringify(lstBQHangDoi));
        await this.setState({
            lstBQHangDoi: lstBQHangDoi,
            macodong: '',
            sodksh: '',
            isLoading: false,
            SOCP_SOHUU: '',
            HOTEN: ''
        });
        alert('Thành công')
    }

    btnGuiBQ = async () => {
        await this.setState({
            isLoading: true,
        });
        var sURL = await url_Answer_ThemLo();
        var data = this.state.lstBQHangDoi;

        var dataPush = {
            BieuQuyetList: this.state.lstBQHangDoi
        };
        console.log('data push', dataPush);
        await fetch(sURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "username": this.props.agm.userAGM.userName,
                "token": this.props.agm.userAGM.signInToken
            },
            body: JSON.stringify(dataPush)
        })
            .then(res => {
                return res.json();
            })
            .then(response => {
                console.log("url_Answer_ThemLo", response);
                if (response.State == true) {
                    alert('Thành công');
                    // this.state.lstBQHangDoi.forEach(e => {
                    //     this.btnXoaHangDoi(e);
                    // })
                    this.thucHienXoaHangDoi();
                    // ThanhVT xoá trong hàng đợi
                } else {
                    alert(response.Message);
                }
                this.setState({
                    isLoading: false,
                    macodong: '',
                    sodksh: ''
                });
            })
            .catch(e => {
                console.log('exp', e)
                this.setState({
                    isLoading: false
                });
            });
    }

    btnGuiNgay = async () => {
        if (this.state.sodksh == '' || this.state.HOTEN == '' || this.state.SOCP_SOHUU == '') {
            alert("Thông tin không hợp lệ")
            return;
        }

        await this.setState({
            isLoading: true,
        });
        var sURL = await url_Answer_ThemLe();
        var dataPush = {
            "MA_CODONG": this.state.macodong,
            "SODKSH": this.state.sodksh,
            "SOCP_SOHUU": this.state.SOCP_SOHUU,
            "ID_CAUHOI": this.state.ID_CAUHOI,
            "ND_CAUHOI": this.state.NOIDUNG,
            "KETQUA": this.state.KETQUA,
            "YKIENKHAC": ""
        };
        console.log('data push', dataPush);
        await fetch(sURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "username": this.props.agm.userAGM.userName,
                "token": this.props.agm.userAGM.signInToken
            },
            body: JSON.stringify(dataPush)
        })
            .then(res => {
                return res.json();
            })
            .then(response => {
                console.log("url_Answer_ThemLe", response);
                if (response.State == true) {
                    alert('Thành công');
                } else {
                    alert(response.Message);
                }
                this.setState({
                    isLoading: false,
                    macodong: '',
                    sodksh: '',
                    SOCP_SOHUU: '',
                    HOTEN: ''
                });
            })
            .catch(e => {
                console.log('exp', e)
                this.setState({
                    isLoading: false
                });
            });
    }

    btnTimKiem = async () => {
        await this.setState({
            isLoading: true,
            SOCP_SOHUU: '',
            HOTEN: ''
        });

        var data = {};
        var sURL = '';
        if (this.state.macodong != '') {
            sURL = await url_BauCu_MACD();
            data = {
                MA_CODONG: this.state.macodong,
                ID_CAUHOI: this.state.ID_CAUHOI,
                SODKSH: '',
                GET_NAME: false
            }
        }
        else if (this.state.sodksh != '') {
            sURL = await url_BauCu_SODKSH();
            data = {
                SODKSH: this.state.sodksh,
                MA_CODONG: 0,
                ID_CAUHOI: this.state.ID_CAUHOI,
                GET_NAME: false
            }
        }
        console.log('data tk', data)
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
                console.log("url_CoDong_xxx", response);
                if (response.State == true) {
                    this.setState({
                        sodksh: response.Data.SODKSH,
                        macodong: response.Data.MA_CODONG + '',
                        SOCP_SOHUU: response.Data.SOCP_SOHUU + '',
                        // SOCP_UQ: response.Data.SOCP_DUOCUQ + '',
                        HOTEN: response.Data.HOTEN,
                    });

                } 
                else if (response.Message != '') {
                    alert(response.Message)
                } else {
                    alert('Tìm kiếm không thành công')
                }
                this.setState({
                    isLoading: false
                });
            })
            .catch(e => {
                console.log('exp tkiem', e)
                this.setState({
                    isLoading: false
                });
            });
    }

    thucHienXoaHangDoi = async () => {
        var LIST_BIEUQUYETCAUHOI = await AsyncStorage.getItem("LIST_BIEUQUYETCAUHOI");
        console.log('1', LIST_BIEUQUYETCAUHOI);
        var lstBQHangDoi = [];
        var lstPush = [];
        if (LIST_BIEUQUYETCAUHOI != undefined && LIST_BIEUQUYETCAUHOI != null) {
            lstBQHangDoi = JSON.parse(LIST_BIEUQUYETCAUHOI);
            console.log('2', lstBQHangDoi);
            lstBQHangDoi.forEach((element, i) => {
                if (element.ID_CAUHOI != this.state.ID_CAUHOI) lstPush.push(element);
            });
            this.setState({ lstBQHangDoi: [] });
            await AsyncStorage.setItem('LIST_BIEUQUYETCAUHOI', JSON.stringify(lstPush));
        }
    }

    btnXoaHangDoi = async (v) => {
        console.log(v);
        // var array = [...this.state.lstBQHangDoi]; // make a separate copy of the array
        // var index = array.indexOf(v)
        // if (index !== -1) {
        //     array.splice(index, 1);
        //     this.setState({ lstBQHangDoi: array });
        // }

        var LIST_BIEUQUYETCAUHOI = await AsyncStorage.getItem("LIST_BIEUQUYETCAUHOI");
        console.log('1', LIST_BIEUQUYETCAUHOI);
        var lstBQHangDoi = [];
        if (LIST_BIEUQUYETCAUHOI != undefined && LIST_BIEUQUYETCAUHOI != null) {
            lstBQHangDoi = JSON.parse(LIST_BIEUQUYETCAUHOI);
            console.log('2', lstBQHangDoi);
            var index = -1;
            lstBQHangDoi.forEach((element, i) => {
                if (element.MA_CODONG == v.MA_CODONG && element.SODKSH == v.SODKSH && element.ID_CAUHOI == v.ID_CAUHOI) index = i;
            });

            console.log('3', index);
            if (index !== -1) {
                lstBQHangDoi.splice(index, 1);
                this.setState({ lstBQHangDoi: lstBQHangDoi });
                console.log('lstBQHangDoi', lstBQHangDoi);
                await AsyncStorage.setItem('LIST_BIEUQUYETCAUHOI', JSON.stringify(lstBQHangDoi));
            }
        }
    }

    render() {

        const { scan, ScanResult, result, KETQUA, STT, NOIDUNG } = this.state

        return (
            <ImageBackground
                source={require("../../assets/images/night2.jpg")}
                style={Styles.backgroundView}

            >
                <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                        <View style={Styles.containerNoHeaderImage}>
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
                                <View>
                                    <TakeerText style={{ textAlign: 'center', fontWeight: 'bold', color: Colors.textPrimary, fontSize: 25  }}>
                                        Biếu quyết câu hỏi số {STT}
                                    </TakeerText>
                                    <TakeerText style={{ textAlign: 'center', color: Colors.textPrimary, fontSize: 20 }}>
                                        {KETQUA == 0 ? "Không đồng ý" : "Khác"}
                                    </TakeerText>
                                </View>
                                <View>
                                    {/* <Image source={Images.users.user1} style={{
                                    width: 30, height: 30, borderRadius: 15
                                }} /> */}
                                    <TakeerIcon
                                        iconType="FontAwesome"
                                        iconName="list"
                                        iconSize={30}
                                        iconColor={Colors.primaryAccent}
                                        iconPosition="" //left, right, null
                                    />
                                </View>
                            </View>

                            <ScrollView>
                                <TakeerText style={{ textAlign: 'center', color: Colors.textPrimary, fontSize: 16, marginTop: 3 }}>
                                    {NOIDUNG}
                                </TakeerText>
                                {/* Time Separator */}
                                <TakeerButton
                                    onPress={this.btnQRCODE}
                                    backgroundColor={Colors.green}
                                    padding={15}
                                    borderWidth={1}
                                    borderRadius={5}
                                    borderColor="transparent"
                                    textColor="#fff"
                                    textBold={false}
                                    textItalic={false}
                                    textSize={16}
                                    textFont=""
                                    text="QUÉT QR CODE" //button texts
                                    showIcon={true} // if false, pass null to every icon attribute below
                                    iconType="MaterialCommunityIcons" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                                    iconName="qrcode-scan" //icon name according to iconType or pass null to hide
                                    iconSize={30}
                                    iconColor="#fff"
                                    iconPosition="right" //left, right, null
                                    loading={false} //true or false -- true to show spinner/loading
                                    loadingText="" // default is Loading.., you may pass any texts or null not to show
                                />

                                <View style={{ marginVertical: 5 }}></View>

                                <TextInput
                                    placeholder="Mã cổ đông"
                                    placeholderTextColor={Colors.textSecondary}
                                    textColor={Colors.textWhite}
                                    underlineColorAndroid="transparent"
                                    keyboardType="numeric"
                                    style={styles.input}
                                    value={this.state.macodong}
                                    onChangeText={(macodong) => this.setState({ macodong })}
                                    onSubmitEditing={() => this.refs.macodong.focus()}
                                    ref='macodong'
                                    returnKeyType='done'
                                />
                                <View style={{ marginVertical: 5 }}></View>
                                <TextInput
                                    placeholder="Số ĐKSH"
                                    placeholderTextColor={Colors.textSecondary}
                                    textColor={Colors.textWhite}
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                    value={this.state.sodksh}
                                    onChangeText={(sodksh) => this.setState({ sodksh })}
                                    onSubmitEditing={() => this.refs.sodksh.focus()}
                                    ref='sodksh'
                                    returnKeyType='done'
                                />
                                <View style={{ marginTop: 5 }}>
                                    <TakeerButton
                                        onPress={this.btnTimKiem}
                                        backgroundColor={Colors.green}
                                        padding={15}
                                        borderWidth={1}
                                        borderRadius={5}
                                        borderColor="transparent"
                                        textColor="#fff"
                                        textBold={false}
                                        textItalic={false}
                                        textSize={16}
                                        textFont=""
                                        text="HOẶC CHỈ GÕ 1 TRONG 2 ĐỂ TÌM KIẾM" //button texts
                                        showIcon={false} // if false, pass null to every icon attribute below
                                        iconType="Ionicons" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                                        iconName="md-send" //icon name according to iconType or pass null to hide
                                        iconSize={30}
                                        iconColor="#fff"
                                        iconPosition="right" //left, right, null
                                        loading={false} //true or false -- true to show spinner/loading
                                        loadingText="" // default is Loading.., you may pass any texts or null not to show
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 6 }}>
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


                                <View style={{ marginVertical: 5 }}></View>
                                <TakeerText style={styles.normalText}>Họ tên</TakeerText>
                                <TextInput
                                    editable={false}
                                    placeholder="..."
                                    placeholderTextColor={Colors.textSecondary}
                                    textColor={Colors.textWhite}
                                    underlineColorAndroid="transparent"
                                    keyboardType="default"
                                    style={styles.input}
                                    value={this.state.HOTEN}
                                    onChangeText={(HOTEN) => this.setState({ HOTEN })}
                                    onSubmitEditing={() => this.refs.HOTEN.focus()}
                                    ref='HOTEN'
                                />
                                <View style={{ marginVertical: 5 }}></View>
                                <TakeerText style={styles.normalText}>Số cổ phần sở hữu và được UQ(nếu có)</TakeerText>
                                <TextInput
                                    editable={false}
                                    placeholder="..."
                                    placeholderTextColor={Colors.textSecondary}
                                    textColor={Colors.textWhite}
                                    underlineColorAndroid="transparent"
                                    keyboardType="numeric"
                                    style={styles.input}
                                    value={this.state.SOCP_SOHUU}
                                    onChangeText={(SOCP_SOHUU) => this.setState({ SOCP_SOHUU })}
                                    onSubmitEditing={() => this.refs.SOCP_SOHUU.focus()}
                                    ref='SOCP_SOHUU'
                                />
                                <View style={{ flexDirection: 'row', paddingHorizontal: 0, marginTop: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <TakeerButton
                                            onPress={this.btnGuiNgay}
                                            backgroundColor={Colors.green}
                                            padding={15}
                                            borderWidth={1}
                                            borderRadius={5}
                                            borderColor="transparent"
                                            textColor="#fff"
                                            textBold={false}
                                            textItalic={false}
                                            textSize={16}
                                            textFont=""
                                            text={"BIỂU QUYẾT NGAY"} //button texts
                                            showIcon={false} // if false, pass null to every icon attribute below
                                            iconType="Ionicons" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                                            iconName="md-send" //icon name according to iconType or pass null to hide
                                            iconSize={30}
                                            iconColor="#fff"
                                            iconPosition="right" //left, right, null
                                            loading={false} //true or false -- true to show spinner/loading
                                            loadingText="" // default is Loading.., you may pass any texts or null not to show
                                        />
                                    </View>
                                    <View style={{ marginHorizontal: 5 }}></View>
                                    <View style={{ flex: 1 }}>
                                        <TakeerButton
                                            onPress={this.btnHangDoi}
                                            backgroundColor={Colors.green}
                                            padding={15}
                                            borderWidth={1}
                                            borderRadius={5}
                                            borderColor="transparent"
                                            textColor="#fff"
                                            textBold={false}
                                            textItalic={false}
                                            textSize={16}
                                            textFont=""
                                            text={"THÊM HÀNG ĐỢI"} //button texts
                                            showIcon={false} // if false, pass null to every icon attribute below
                                            iconType="Ionicons" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                                            iconName="md-send" //icon name according to iconType or pass null to hide
                                            iconSize={30}
                                            iconColor="#fff"
                                            iconPosition="right" //left, right, null
                                            loading={false} //true or false -- true to show spinner/loading
                                            loadingText="" // default is Loading.., you may pass any texts or null not to show
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                                    <View style={Styles.itm}>
                                        <View style={Styles.itb} />
                                    </View>
                                    <TakeerText style={{
                                        textAlign: 'center',
                                        fontSize: 12,
                                        paddingHorizontal: 6,
                                        color: Colors.textWhite
                                    }}>
                                        ---------------------------
                                </TakeerText>
                                    <View style={Styles.itm}>
                                        <View style={Styles.itb} />
                                    </View>
                                </View>
                                <TakeerText style={{
                                    color: Colors.textPrimary,
                                    fontSize: 18, marginTop: 10, fontWeight: 'bold'
                                }}>
                                    Danh sách hàng đợi ({this.state.lstBQHangDoi.length})
                                </TakeerText>

                                {this.state.lstBQHangDoi.map((v, i) => (
                                    <TouchableOpacity key={`${i}-latest`} style={[Styles.latestHolder, {
                                        borderRadius: 4,
                                        alignContent: 'center',
                                        alignItems: 'center'

                                    }]}>

                                        <View style={[Styles.latestContentHolder, { flex: 1 }]}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 0.9 }}>
                                                    <TakeerText style={Styles.latestTitle}>{i + 1}. </TakeerText>
                                                    <TakeerText style={Styles.latestTitle}>{v.SODKSH} - {v.HOTEN}</TakeerText>
                                                </View>
                                                <TouchableOpacity onPress={() => this.btnXoaHangDoi(v)}>
                                                    <TakeerIcon
                                                        iconType="FontAwesome"
                                                        iconName="remove"
                                                        iconSize={30}
                                                        iconColor={Colors.textWhite}
                                                        iconPosition="" //left, right, null
                                                    />
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

                            </ScrollView>
                            <TakeerButton
                                onPress={this.btnGuiBQ}
                                backgroundColor={Colors.green}
                                padding={15}
                                borderWidth={1}
                                borderRadius={5}
                                borderColor="transparent"
                                textColor="#fff"
                                textBold={false}
                                textItalic={false}
                                textSize={16}
                                textFont=""
                                text={"GỬI BIỂU QUYẾT " + (KETQUA == 0 ? "KHÔNG ĐỒNG Ý" : "KHÁC")} //button texts
                                showIcon={false} // if false, pass null to every icon attribute below
                                iconType="Ionicons" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                                iconName="md-send" //icon name according to iconType or pass null to hide
                                iconSize={30}
                                iconColor="#fff"
                                iconPosition="right" //left, right, null
                                loading={false} //true or false -- true to show spinner/loading
                                loadingText="" // default is Loading.., you may pass any texts or null not to show
                            />

                        </View>
                    </KeyboardAvoidingView>

                    <Modal
                        style={{
                            flex: 1,
                            backgroundColor: Colors.primaryAccentLight,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        animationType={'slide'}
                        visible={this.state.dgQR}
                        onRequestClose={() => this.setState({ dgQR: false })}
                        onTouchOutside={() => this.setState({ dgQR: false })}>
                        <SafeAreaView
                            style={{
                                flex: 1,
                                // borderColor: "rgba(158, 150, 150, .5)",
                                // borderRadius: 20,
                                height: height,

                            }}
                        >
                            <View style={Styles.appHeader}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <TouchableOpacity onPress={() => this.setState({ dgQR: false })}>
                                        <View style={{ padding: 4 }}>
                                            <TakeerIcon
                                                iconType="MaterialIcons"
                                                iconName="close"
                                                iconSize={30}
                                                iconColor={Colors.primaryLight}
                                                iconPosition="" //left, right, null
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    <TakeerText style={{
                                        color: Colors.primaryLight,
                                        fontSize: 25,
                                        textAlign: 'center',
                                        flex: 1,
                                        marginRight: 1
                                    }}>
                                        Quét thông tin cổ đông
                                </TakeerText>

                                </View>
                            </View>

                            <ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
                                <View style={{ flexDirection: 'column', backgroundColor: Colors._default }}>
                                    {scan && <QRCodeScanner
                                        reactivate={true}
                                        showMarker={true}
                                        ref={(node) => { this.scanner = node }}
                                        onRead={this.onSuccess}

                                        bottomContent={
                                            <View>
                                                <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
                                                    <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
                                                    <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                                                </TouchableOpacity>
                                            </View>

                                        }
                                    />
                                    }
                                </View>

                            </ScrollView>
                            {/* <View>
                            <TakeerButton
                                onPress={this.btnGiaHan}
                                backgroundColor={Colors.yellowish}
                                borderWidth={1}
                                borderColor="transparent"
                                borderRadius={5} // pass border radius
                                textColor="#fff"
                                textBold={false}
                                textItalic={false}
                                textSize={14}
                                textFont=""
                                text="XÁC NHẬN GIA HẠN" //button texts
                                showIcon={false} // if false, pass null to every icon attribute below
                                iconType="Ionicons" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                                iconName="md-send" //icon name according to iconType or pass null to hide
                                iconSize={30}
                                iconColor="#fff"
                                iconPosition="right" //left, right, null
                                loading={false} //true or false -- true to show spinner/loading
                                loadingText="" // default is Loading.., you may pass any texts or null not to show
                                paddingHorizontal={1} //
                            />
                        </View> */}

                        </SafeAreaView>
                    </Modal>

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
                </SafeAreaView>

            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings,
    agm: state.agm
})
export default connect(mapStateToProps, actions)(BieuQuyetCauHoi);