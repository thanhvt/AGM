import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Colors, Styles } from '../../Common';
import TakeerIcon from '../../components/TakeerIcon';
import TakeerText from '../../components/TakeerText';

class Header extends Component {

    render() {
        return (
           <View style={Styles.appHeader}>
                <View style={{position:'relative', alignItems:'center'}}>
                    <View style={{flexGrow:1, alignItems:'center', paddingVertical:6}}>
                        <TakeerText style={Styles.appHeaderLogoText}>Đại hội cổ đông</TakeerText>
                    </View>
                </View>
           </View> 
        );
    }
}

const mapStateToProps = ( state ) => ({
    settings: state.settings
});

export default connect(mapStateToProps,actions)(Header);