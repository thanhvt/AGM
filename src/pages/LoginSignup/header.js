import React, { Component } from 'react';
import {
	Image,
	Text,
    TouchableOpacity,
    StyleSheet,
	View,
    TouchableNativeFeedback
} from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import TakeerIcon from '../../components/TakeerIcon';
import { Styles, Colors } from '../../Common';


class Header extends Component {
    constructor(props){
        super(props)
    }

    back(){
        //just reset    
        this.props.resetData();  
    }

    render() {
        return (
            <View style={Styles.appHeader}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={()=>this.back()}>
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
const mapStateToProps = ( state ) => ({
    settings: state.settings
});

export default connect(mapStateToProps,actions)(Header);