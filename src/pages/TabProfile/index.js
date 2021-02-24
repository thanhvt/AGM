import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Colors, Styles, Images, Fonts } from '../../Common';
import TakeerText from '../../components/TakeerText';
import TakeerIcon from '../../components/TakeerIcon';

import AsyncStorage from '@react-native-community/async-storage';
import {  Platform } from 'react-native';




class TabProfile extends Component {

    logout = async () => {
        await this.setState({
            isLoading: true
        })

        // await AsyncStorage.clear();
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
            if (Platform.OS === 'android') {
                await AsyncStorage.clear();
            }
            if (Platform.OS === 'ios') {
                await AsyncStorage.multiRemove(asyncStorageKeys);
            }
        }
        await this.setState({
            isLoading: false
        })
        this.props.resetData();
    }

    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
                <View style={Styles.containerNoHeader}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={Styles.profilePhoto}>
                            <Image source={Images.profile} style={{ borderRadius: 50 }} />
                        </View>
                        <View>
                            <View>
                                <TakeerText style={Styles.headerTitle}>Nimasha Perera</TakeerText>
                            </View>
                            <View>
                                <TakeerText style={{ fontSize: Fonts.size.h6, color: Colors.textSecondary }}>390,329 Points</TakeerText>
                            </View>
                            <View style={Styles.badgeHolder}>
                                <View style={Styles.badge}>
                                    <Image source={Images.badges.starter} />
                                </View>
                                <View style={Styles.badge}>
                                    <Image source={Images.badges.elite} />
                                </View>
                                <View style={Styles.badge}>
                                    <Image source={Images.badges.geek} />
                                </View>
                                <View style={Styles.badge}>
                                    <Image source={Images.badges.pro} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 30, borderBottomWidth: 1, borderBottomColor: Colors.separator, paddingBottom: 6 }}>
                        <TakeerText style={{
                            color: Colors.textSecondary,
                            fontSize: Fonts.size.h7
                        }}>GENERAL</TakeerText>
                    </View>
                    <TouchableOpacity style={Styles.settingItem}>
                        <View style={Styles.settingIcon}>
                            <Image source={Images.icons.favorite} />
                        </View>
                        <View style={Styles.settingContent}>
                            <View>
                                <TakeerText style={Styles.settingLabel}>Favourite Courses</TakeerText>
                            </View>
                            <TakeerIcon
                                iconType="Entypo"
                                iconName="chevron-small-right"
                                iconSize={20}
                                iconColor={Colors.textSecondary}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.settingItem}>
                        <View style={Styles.settingIcon}>
                            <Image source={Images.icons.friends} />
                        </View>
                        <View style={Styles.settingContent}>
                            <View>
                                <TakeerText style={Styles.settingLabel}>My Friends</TakeerText>
                            </View>
                            <View style={{
                                backgroundColor: Colors.primaryAccent,
                                paddingHorizontal: 10,
                                borderRadius: 30,
                                paddingVertical: 2,
                            }}>
                                <TakeerText style={{ color: Colors.textPrimary }}>
                                    50+
                            </TakeerText>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.settingItem}>
                        <View style={Styles.settingIcon}>
                            <Image source={Images.icons.achieve} />
                        </View>
                        <View style={Styles.settingContent}>
                            <View>
                                <TakeerText style={Styles.settingLabel}>Achievements</TakeerText>
                            </View>
                            <TakeerIcon
                                iconType="Entypo"
                                iconName="chevron-small-right"
                                iconSize={20}
                                iconColor={Colors.textSecondary}
                            />
                        </View>
                    </TouchableOpacity>



                    <View style={{ marginTop: 30, borderBottomWidth: 1, borderBottomColor: Colors.separator, paddingBottom: 6 }}>
                        <TakeerText style={{
                            color: Colors.textSecondary,
                            fontSize: Fonts.size.h7
                        }}>SETTINGS</TakeerText>
                    </View>
                    <TouchableOpacity style={Styles.settingItem}>
                        <View style={Styles.settingIcon}>
                            <Image source={Images.icons.key} />
                        </View>
                        <View style={Styles.settingContent}>
                            <View>
                                <TakeerText style={Styles.settingLabel}>Edit Login Details</TakeerText>
                            </View>
                            <TakeerIcon
                                iconType="Entypo"
                                iconName="chevron-small-right"
                                iconSize={20}
                                iconColor={Colors.textSecondary}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.settingItem}>
                        <View style={Styles.settingIcon}>
                            <Image source={Images.icons.interest} />
                        </View>
                        <View style={Styles.settingContent}>
                            <View>
                                <TakeerText style={Styles.settingLabel}>Update Interests</TakeerText>
                            </View>
                            <TakeerIcon
                                iconType="Entypo"
                                iconName="chevron-small-right"
                                iconSize={20}
                                iconColor={Colors.textSecondary}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={Styles.settingItem} onPress={this.logout.bind(this)}>>
                    <View style={Styles.settingIcon}>
                            <Image source={Images.icons.blocked} />
                        </View>
                        <View style={Styles.settingContent}>
                            <View>
                                <TakeerText style={Styles.settingLabel}>Đăng xuất</TakeerText>
                            </View>
                            <TakeerIcon
                                iconType="Entypo"
                                iconName="chevron-small-right"
                                iconSize={20}
                                iconColor={Colors.textSecondary}
                            />
                        </View>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={Styles.settingItem} onPress={this.logout.bind(this)}>
                        <View style={Styles.settingIcon}>
                            <Image source={Images.icons.blocked} />
                            {/* <TakeerIcon
                                iconType="MaterialCommunityIcons"
                                iconName="logout"
                                iconSize={20}
                                iconColor={Colors.red}
                            /> */}
                        </View>
                        <View style={Styles.settingContent}>
                            <View>
                                <TakeerText style={Styles.settingLabel}>Đăng xuất</TakeerText>
                            </View>
                            <TakeerIcon
                                iconType="Entypo"
                                iconName="chevron-small-right"
                                iconSize={20}
                                iconColor={Colors.textSecondary}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings
})
export default connect(mapStateToProps, actions)(TabProfile);