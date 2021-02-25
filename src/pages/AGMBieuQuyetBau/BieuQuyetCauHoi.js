import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView, Text,
    TextInput, KeyboardAvoidingView,
    Keyboard,
    SafeAreaView, Modal, Dimensions
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import TakeerText from '../../components/TakeerText';
import { Styles, Fonts, Colors, Images } from '../../Common';
import TakeerIcon from '../../components/TakeerIcon';
import styles from './styles';
import TakeerButton from '../../components/TakeerButton';


const { width, height } = Dimensions.get('window')

class BieuQuyetCauHoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            margin_bottom: 10, dgQR: false,

            scan: false,
            ScanResult: false,
            result: null
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

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

    btnQRCODE = async () => {
        this.setState({ dgQR: true, scan: true })
    };

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);

        alert(e.data);
        console.log('scanned data' + e.data);
        this.setState({
            result: e.data,
            scan: false,
            ScanResult: true, 
            macodong: e.data,
            dgQR: false
        }) 

    }

    render() {

        const { scan, ScanResult, result } = this.state

        return (
            <SafeAreaView style={Styles.safeArea}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={Styles.containerNoHeader}>
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
                                    Thực hiện checkin và in phiếu
                        </TakeerText>
                                <TakeerText style={{ textAlign: 'center', color: Colors.textPrimary, fontSize: 10 }}>
                                    Online
                        </TakeerText>
                            </View>
                            <View>
                                <Image source={Images.users.user1} style={{
                                    width: 30, height: 30, borderRadius: 15
                                }} />
                            </View>
                        </View>

                        <ScrollView>
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
                                keyboardType="numeric"
                                style={styles.input}
                                value={this.state.sodksh}
                                onChangeText={(sodksh) => this.setState({ sodksh })}
                                onSubmitEditing={() => this.refs.sodksh.focus()}
                                ref='sodksh'
                                returnKeyType='done'
                            />
                            <View style={{ marginTop: 5 }}>
                                <TakeerButton
                                    onPress={this.btnLuyenTap}
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
                                    text="HOẶC GÕ 1 TRONG 2 ĐỂ TÌM KIẾM" //button texts
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
                            <TakeerText style={styles.normalText}>Người uỷ quyền</TakeerText>
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
                            <TakeerText style={styles.normalText}>Số cổ phần sở hữu</TakeerText>
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
                            <View style={{ marginVertical: 5 }}></View>
                            <TakeerText style={styles.normalText}>Số cổ phần uỷ quyền</TakeerText>
                            <TextInput
                                placeholder="..."
                                placeholderTextColor={Colors.textSecondary}
                                textColor={Colors.textWhite}
                                underlineColorAndroid="transparent"
                                keyboardType="numeric"
                                style={styles.input}
                                value={this.state.SOCP_UQ}
                                onChangeText={(SOCP_UQ) => this.setState({ SOCP_UQ })}
                                onSubmitEditing={() => this.refs.SOCP_UQ.focus()}
                                ref='SOCP_UQ'
                                returnKeyType='next'
                            />
                            <View style={{ marginVertical: 5 }}></View>
                            <TakeerText style={styles.normalText}>Người được uỷ quyền</TakeerText>
                            <TextInput
                                placeholder="..."
                                placeholderTextColor={Colors.textSecondary}
                                textColor={Colors.textWhite}
                                underlineColorAndroid="transparent"
                                keyboardType='default'
                                style={styles.input}
                                value={this.state.NGUOIDUOC_UQ}
                                onChangeText={(NGUOIDUOC_UQ) => this.setState({ NGUOIDUOC_UQ })}
                                onSubmitEditing={() => this.refs.NGUOIDUOC_UQ.focus()}
                                ref='NGUOIDUOC_UQ'
                                returnKeyType='next'
                            />
                            <View style={{ marginVertical: 5 }}></View>
                            <TakeerText style={styles.normalText}>CMT người được uỷ quyền</TakeerText>
                            <TextInput
                                placeholder="..."
                                placeholderTextColor={Colors.textSecondary}
                                textColor={Colors.textWhite}
                                underlineColorAndroid="transparent"
                                keyboardType="default"
                                style={styles.input}
                                value={this.state.CMTDUOC_UQ}
                                onChangeText={(CMTDUOC_UQ) => this.setState({ CMTDUOC_UQ })}
                                onSubmitEditing={() => this.refs.CMTDUOC_UQ.focus()}
                                ref='CMTDUOC_UQ'
                                returnKeyType='done'
                            />
                        </ScrollView>
                        <TakeerButton
                            onPress={this.btnLuyenTap}
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
                            text="CHECKIN VÀ IN" //button texts
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
                                {/* <TakeerText style={Styles.normalText}>Bước 1: Chọn khoá học</TakeerText>
                                <View style={{ marginVertical: 5 }}></View> */}
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

            </SafeAreaView>
        );
    }
}

export default BieuQuyetCauHoi;