import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput, KeyboardAvoidingView,
    Keyboard, ImageBackground,
    SafeAreaView
} from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import TakeerText from '../../components/TakeerText';
import { Styles, Fonts, Colors, Images } from '../../Common';
import TakeerIcon from '../../components/TakeerIcon';
import styles from './styles';
import TakeerButton from '../../components/TakeerButton';
import { url_CoDong_MACD, url_CoDong_SODKSH, url_UyQuyen_Them } from '../../Global';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

class UyQuyen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            margin_bottom: 10,
            macodong: '',
            sodksh: '',
            HOTEN: '',
            SOCP_SOHUU: '',
            SOCP_UQ: '',
            NGUOIDUOC_UQ: '',
            CMTDUOC_UQ: '',
        }
    }

    // componentDidMount() {
    //     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    //     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    // }

    // componentWillUnmount() {
    //     this.keyboardDidShowListener.remove();
    //     this.keyboardDidHideListener.remove();
    // }

    // _keyboardDidHide() {
    //     this.setState({ margin_bottom: 10 });
    // }

    // _keyboardDidShow(e) {
    //     var height = e.endCoordinates.height;
    //     //console.log('Keyboard Height', height);
    //     this.setState({ margin_bottom: height });
    //     setTimeout(() => {
    //         //this.scrollRef.scrollToEnd();
    //     }, 10)
    // }

    btnTimKiem = async () => {
        await this.setState({
            isLoading: true,
        });

        var data = {};
        var sURL = '';
        if (this.state.macodong != '') {
            sURL = await url_CoDong_MACD();
            data = {
                MA_CODONG: this.state.macodong
            }
        }
        else if (this.state.sodksh != '') {
            sURL = await url_CoDong_SODKSH();
            data = {
                SODKSH: this.state.sodksh
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
                console.log("url_CoDong_xxx", response.Data.SOCP_SOHUU);
                if (response.State == true) {
                    this.setState({
                        sodksh: response.Data.SODKSH,
                        // macodong: response.Data.MA_CODONG,
                        SOCP_SOHUU: response.Data.SOCP_SOHUU + '',
                        SOCP_UQ: response.Data.SOCP_SOHUU + '',
                        HOTEN: response.Data.HOTEN,
                    });

                } else {
                    alert('Tìm kiếm không thành công')
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

    btnUyQuyen = async () => {
        await this.setState({
            isLoading: true,
        });
        var sURL = await url_UyQuyen_Them();
        var data = {
            NGUOI_UQ: this.state.HOTEN,
            CMT_NGUOIUQ: this.state.sodksh,
            SOCP_UQ: this.state.SOCP_UQ,
            NGUOIDUOC_UQ: this.state.NGUOIDUOC_UQ,
            CMTDUOC_UQ: this.state.CMTDUOC_UQ

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
                console.log("url_UyQuyen_Them", response);
                if (response.State == true) {
                    alert('Thành công')
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

    render() {
        // console.log('state', this.state)
        return (
            <ImageBackground
                source={require("../../assets/images/night.jpg")}
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
                                        Thực hiện uỷ quyền
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

                                <TextInput
                                    placeholder="Mã cổ đông"
                                    placeholderTextColor={Colors.textSecondary}
                                    textColor={Colors.textWhite}
                                    underlineColorAndroid="transparent"
                                    keyboardType="numeric"
                                    style={styles.input}
                                    value={this.state.macodong}
                                    onChangeText={(macodong) => this.setState({ macodong })}
                                    onSubmitEditing={() => { this.refs.SOCP_UQ.focus() }}
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
                                    onSubmitEditing={() => { this.refs.SOCP_UQ.focus(); }}
                                    ref='sodksh'
                                    returnKeyType='done'
                                />
                                <View style={{ marginLeft: 0 }}>
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
                                        text="TÌM KIẾM" //button texts
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
                                    keyboardType="default"
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
                                    onSubmitEditing={() => this.refs.NGUOIDUOC_UQ.focus()}
                                    ref='SOCP_UQ'
                                    returnKeyType='done'
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
                                    onSubmitEditing={() => this.refs.CMTDUOC_UQ.focus()}
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
                                onPress={this.btnUyQuyen}
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
                                text="UỶ QUYỀN" //button texts
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
                    <OrientationLoadingOverlay
                        visible={this.state.isLoading}
                        color="white"
                        indicatorSize="large"
                        messageFontSize={24}
                        message="Đang xử lý ..."
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

// export default UyQuyen;

const mapStateToProps = (state) => ({
    settings: state.settings,
    agm: state.agm
})
export default connect(mapStateToProps, actions)(UyQuyen);