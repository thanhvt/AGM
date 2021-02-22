import React, { Component } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';

import { Styles, Colors } from '../../Common';
import TakeerIcon from '../../components/TakeerIcon';
class Header extends Component {

    render() {
        return (
            <View style={Styles.appHeader}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <View style={{padding:4}}>
                            <TakeerIcon
                                iconType="Feather"
                                iconName="arrow-left"
                                iconSize={30}
                                iconColor={Colors.primaryAccent}
                                iconPosition="" //left, right, null
                            />
                        </View>
                    </TouchableOpacity>
                    {/*<TouchableOpacity>
                        <View style={{padding:4}}>
                            <TakeerIcon
                                iconType="Entypo"
                                iconName="dots-three-vertical"
                                iconSize={18}
                                iconColor={Colors.primaryAccent}
                                iconPosition="" //left, right, null
                            />
                        </View>
                    </TouchableOpacity>*/}
                </View>
            </View>
        );
    }
}
export default Header;