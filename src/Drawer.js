import React, { Component } from 'react';
import { 
    Button,
    View,
    TouchableOpacity 
} from 'react-native';

import * as actions from './actions';
import { connect } from 'react-redux';
import { Colors, Styles } from './Common';
import TakeerText from './components/TakeerText';
import TakeerIcon from './components/TakeerIcon';

class Drawer extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={[Styles.container, { paddingTop:30, flexDirection:'column', justifyContent: 'space-between' }]}>
                <View style={{flex:1, paddingHorizontal:10}}>
                    <TakeerText>
                        Add Sidebar contents here..
                    </TakeerText>
                </View>
                <TouchableOpacity style={{backgroundColor: Colors.secondary, paddingVertical:10, alignItems:'center'}}
                onPress={()=>this.props.resetData()}
                >
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TakeerIcon
                            iconName="ios-exit"
                            iconType="Ionicons"
                            iconColor={Colors._default}
                            iconSize={20}
                        />
                        <TakeerText style={{paddingLeft:4}}>Logout</TakeerText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = ( state ) => ({
    settings: state.settings
});

export default connect(mapStateToProps,actions)(Drawer);