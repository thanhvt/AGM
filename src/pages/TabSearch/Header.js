import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Colors, Styles } from '../../Common';
import TakeerIcon from '../../components/TakeerIcon';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            s_term:''
        }
    }

    clear=()=>{
        this.setState({s_term:''});
    }

    render() {
        return (
           <View style={[Styles.appHeader]}>
                <View style={{position:'relative', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                    <View style={{width:40, paddingLeft:6, paddingBottom:4}}>
                        <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('DrawerOpen')}} 
                        style={{padding:4, marginTop:4}}>
                            <TakeerIcon
                                iconType="FontAwesome"
                                iconName="search"
                                iconSize={25}
                                iconColor={Colors.primaryAccent}
                                iconPosition="" //left, right, null
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexGrow:1, paddingVertical:4, paddingLeft:8}}>
                        <TextInput
                            placeholder="Search..."
                            placeholderTextColor="#ccc"
                            style={{
                                fontSize:20,
                                color:'#ccc'
                            }}
                            value={this.state.s_term}
                            underlineColorAndroid="transparent"
                            onChangeText={(txt)=>this.setState({s_term:txt})}
                        />
                    </View>
                    {this.state.s_term != "" && <TouchableOpacity
                        style={{
                            position:'absolute',
                            right:0
                        }}
                        onPress={this.clear}
                    >
                        <TakeerIcon
                            iconType="FontAwesome"
                            iconName="times-circle"
                            iconSize={30}
                            iconColor="rgba(255,255,255,0.4)"
                            iconPosition=""
                        />
                    </TouchableOpacity>}
                </View>
           </View> 
        );
    }
}

const mapStateToProps = ( state ) => ({
    settings: state.settings
});

export default connect(mapStateToProps,actions)(Header);