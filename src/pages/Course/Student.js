import React, { Component } from 'react';
import {
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import { Styles, Colors } from '../../Common';
import TakeerText from '../../components/TakeerText';
class Student extends Component {
    render() {
        const { id, name, photo, online } = this.props.item;
        return (
            <TouchableOpacity style={Styles.i_c} onPress={()=>this.props.navigation.navigate('Student')}>
                <Image
                    source={photo}
                    style={Styles.i_p}
                />
                <TakeerText style={Styles.i_tc}>
                    {name}
                </TakeerText>
                {online && <View style={Styles.i_a_o}>
                    <View style={Styles.i_o}/>
                </View>}
            </TouchableOpacity>
        );
    }
}

export default Student;