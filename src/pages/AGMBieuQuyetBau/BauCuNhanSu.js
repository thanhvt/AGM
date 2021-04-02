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

import { url_Checkin_HASHCODE, url_BauCu_MACD, url_BauCu_SODKSH, url_NhanSu_ThemLo, url_Answer_ThemLe } from '../../Global';
const { width, height } = Dimensions.get('window')

class BauCuNhanSu extends Component {
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
            lstNhanSu: [],
            lstSoCPBau: [],
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
            NHOM_TV: item.NHOM_TV,
            TEN_NHOM: item.TEN_NHOM,
            lstNhanSu: item.LST_NHANSU
        });
        
        var array = [...this.state.lstSoCPBau]; // make a separate copy of the array
        for (let index = 0; index < this.state.lstNhanSu.length; index++) {
            array[index] = '0';
        }
        this.setState({ lstSoCPBau: array }); 

    }

    btnQRCODE = async () => {
        this.setState({
            dgQR: true, scan: true, HOTEN: '',
            SOCP_SOHUU: ''
        })
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
                // ID_CAUHOI: this.state.ID_CAUHOI,
                SODKSH: '',
                GET_NAME: true
            }
        }
        else if (this.state.sodksh != '') {
            sURL = await url_BauCu_SODKSH();
            data = {
                MA_CODONG: '0',
                // ID_CAUHOI: this.state.ID_CAUHOI,
                SODKSH: this.state.sodksh,
                GET_NAME: true
            }
        }
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

    btnChiaDeu = async () => {
        console.log('lstSoCPBau 1', this.state.lstSoCPBau);
        var array = [...this.state.lstSoCPBau]; // make a separate copy of the array
        for (let index = 0; index < this.state.lstNhanSu.length; index++) {
            const element = this.state.lstNhanSu[index];
            array[index] = this.state.SOCP_SOHUU + '';
        }
        console.log('lstSoCPBau 2', array);
        this.setState({ lstSoCPBau: array }); 
    }

    btnKhongHopLe = async () => {
        if (this.state.sodksh == '' || this.state.HOTEN == '' || this.state.SOCP_SOHUU == '') {
            alert("Thông tin không hợp lệ")
            return;
        }
 

        await this.setState({
            isLoading: true,
        });
        var sURL = await url_NhanSu_ThemLo();
        var data = this.state.lstNhanSu;
        var dataPush = [];
        data.forEach((element, index) => {
            dataPush.push({
                "MA_CODONG": this.state.macodong,
                "SODKSH": this.state.sodksh,
                "SOCP_SOHUU": this.state.SOCP_SOHUU,
                "ID_NHANSU": element.ID_NHANSU,
                "SOPHIEUBAU": 0,
                "KIEU_BAU": this.state.NHOM_TV,
                "HOP_LE": false
            })
        });
        var dataPush = {
            PHIEU_BAU: dataPush
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
                console.log("url_NhanSu_ThemLo", response);
                if (response.State == true) {
                    alert('Thành công');
                } else {
                    alert(response.Message);
                }
                this.setState({
                    isLoading: false,
                    macodong: '',
                    sodksh: '',
                    HOTEN: '',
                    SOCP_SOHUU: '',
                    lstSoCPBau: [],
                });
            })
            .catch(e => {
                console.log('exp', e)
                this.setState({
                    isLoading: false
                });
            });
    }

    btnGuiBQ = async () => {
        if (this.state.sodksh == '' || this.state.HOTEN == '' || this.state.SOCP_SOHUU == '') {
            alert("Thông tin không hợp lệ")
            return;
        }

        for (let index = 0; index < this.state.lstSoCPBau.length; index++) {
            const e = this.state.lstSoCPBau[index];
            if (e == undefined || Number(e) < 0 || e.toString().indexOf('.') !== -1 || e == '' || e.toString().indexOf(',') !== -1) {
                alert('Số phiếu bầu không hợp lệ');
                return;
            }
        }
        console.log('socp bau', this.state.lstSoCPBau);

        await this.setState({
            isLoading: true,
        });
        var sURL = await url_NhanSu_ThemLo();
        var data = this.state.lstNhanSu;
        var dataPush = [];
        data.forEach((element, index) => {
            dataPush.push({
                "MA_CODONG": this.state.macodong,
                "SODKSH": this.state.sodksh,
                "SOCP_SOHUU": this.state.SOCP_SOHUU,
                "ID_NHANSU": element.ID_NHANSU,
                "SOPHIEUBAU": this.state.lstSoCPBau[index],
                "KIEU_BAU": this.state.NHOM_TV,
                "HOP_LE": true
            })
        });
        var dataPush = {
            PHIEU_BAU: dataPush
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
                console.log("url_NhanSu_ThemLo", response);
                if (response.State == true) {
                    alert('Thành công');
                } else {
                    alert(response.Message);
                }
                this.setState({
                    isLoading: false,
                    macodong: '',
                    sodksh: '',
                    HOTEN: '',
                    SOCP_SOHUU: '',
                    lstSoCPBau: [],
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
                GET_NAME: false
            }
        }
        else if (this.state.sodksh != '') {
            sURL = await url_BauCu_SODKSH();
            data = {
                SODKSH: this.state.sodksh,
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
                console.log("url_CoDong_xxx", response.Data);
                if (response.State == true) {
                    this.setState({
                        sodksh: response.Data.SODKSH,
                        macodong: response.Data.MA_CODONG + '',
                        SOCP_SOHUU: response.Data.SOCP_SOHUU + '',
                        // SOCP_UQ: response.Data.SOCP_DUOCUQ + '',
                        HOTEN: response.Data.HOTEN,
                    });
                    alert('Tìm kiếm thành công')
                } else if (response.Message != '') {
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

    render() {

        const { scan, ScanResult, result, NHOM_TV, TEN_NHOM } = this.state

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
                                    <TakeerText style={{ textAlign: 'center', fontWeight: 'bold', color: Colors.textPrimary }}>
                                        Bầu cử {TEN_NHOM}
                                    </TakeerText>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DanhSachPhieuBau')}>
                                    <View>
                                        <TakeerIcon
                                            iconType="FontAwesome"
                                            iconName="list"
                                            iconSize={30}
                                            iconColor={Colors.primaryAccent}
                                            iconPosition="" //left, right, null
                                        />
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <ScrollView>
                                {/* <TakeerText style={{ textAlign: 'center', color: Colors.textPrimary, fontSize: 16 }}>
                                    123
                                </TakeerText> */}
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
                                <TakeerButton
                                    onPress={this.btnChiaDeu}
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
                                    text={"CHIA ĐỀU PHIẾU"} //button texts
                                    showIcon={false} // if false, pass null to every icon attribute below
                                    iconType="Ionicons" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                                    iconName="md-send" //icon name according to iconType or pass null to hide
                                    iconSize={30}
                                    iconColor="#fff"
                                    iconPosition="right" //left, right, null
                                    loading={false} //true or false -- true to show spinner/loading
                                    loadingText="" // default is Loading.., you may pass any texts or null not to show
                                />
                                <TakeerText style={{
                                    color: Colors.textPrimary,
                                    fontSize: 18, marginTop: 10, fontWeight: 'bold'
                                }}>
                                    Danh sách nhân sự bầu
                                </TakeerText>

                                {this.state.lstNhanSu.map((v, i) => (
                                    <TouchableOpacity key={`${i}-latest`} style={[Styles.latestHolder, {
                                        borderRadius: 4,
                                        alignContent: 'center',
                                        alignItems: 'center'

                                    }]} onPress={() => this.goCourse(v)}>

                                        <View style={[Styles.latestContentHolder, { flex: 1 }]}>

                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <View style={{ flex: 3, flexDirection: 'row' }}>
                                                    <TakeerText style={Styles.latestTitle}>{i + 1}. </TakeerText>
                                                    <TakeerText style={Styles.latestTitle}>{v.TEN_UVIEN}</TakeerText>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <TextInput
                                                        placeholder="..."
                                                        placeholderTextColor={Colors.textSecondary}
                                                        textColor={Colors.textWhite}
                                                        underlineColorAndroid="transparent"
                                                        keyboardType="numeric"
                                                        style={styles.input}
                                                        value={this.state.lstSoCPBau[i]}
                                                        onChangeText={(SOPHIEUBAU) => {
                                                            // this.setState({ SOCP_SOHUU })
                                                            let newValue = [... this.state.lstSoCPBau];
                                                            newValue[i] = SOPHIEUBAU;
                                                            this.setState({ lstSoCPBau: newValue })
                                                        }
                                                        }
                                                        onSubmitEditing={() => this.refs.SOPHIEUBAU.focus()}
                                                        ref='SOPHIEUBAU'
                                                    />
                                                </View>



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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}
                            >
                                <View style={{ flex: 1, padding: 5 }}>
                                    <TakeerButton
                                        onPress={this.btnKhongHopLe}
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
                                        text={"KHÔNG HỢP LỆ"} //button texts
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
                                <View style={{ flex: 1, padding: 5 }}>
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
                                        text={"GỬI PHIẾU BẦU"} //button texts
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
                                    {/* <TakeerText style={Styles.normalText}>Bước 1: Chọn khoá học</TakeerText>
                                <View style={{ marginVertical: 5 }}></View> */}
                                    {scan && <QRCodeScanner
                                        reactivate={true}
                                        showMarker={true}
                                        ref={(node) => { this.scanner = node }}
                                        onRead={this.onSuccess}

                                    // bottomContent={
                                    //     <View>
                                    //         <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
                                    //             <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                                    //         </TouchableOpacity>

                                    //         <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
                                    //             <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                                    //         </TouchableOpacity>
                                    //     </View>

                                    // }
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

                </SafeAreaView>

            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings,
    agm: state.agm
})
export default connect(mapStateToProps, actions)(BauCuNhanSu);