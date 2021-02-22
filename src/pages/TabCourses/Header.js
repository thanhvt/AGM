import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Colors, Styles } from '../../Common';
import TakeerText from '../../components/TakeerText';
import TakeerIcon from '../../components/TakeerIcon';

class Header extends Component {

    render() {
        return (
           <View style={Styles.appHeader}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexGrow:1, alignItems:'flex-start'}}>
                        <TakeerText style={Styles.headerTitle}>My Courses</TakeerText>
                    </View>
                    <TouchableOpacity
                    onPress={()=>null} 
                    style={{padding:4, marginTop:4}}>
                        <TakeerIcon
                            iconType="Ionicons"
                            iconName="ios-search"
                            iconSize={30}
                            iconColor="transparent"
                            iconPosition="" //left, right, null
                        />
                    </TouchableOpacity>
                </View>
           </View> 
        );
    }
}

const mapStateToProps = ( state ) => ({
    settings: state.settings
});

export default connect(mapStateToProps,actions)(Header);