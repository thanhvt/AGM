import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Styles, Colors } from '../../Common';
import TakeerText from '../../components/TakeerText';
class Instructors extends Component {

    goInstructor=()=>{
        this.props.navigation.navigate('Instructor');
    }

    render() {
        const { id, name, category, photo, online } = this.props.item;
        return (
            <TouchableOpacity style={Styles.i_c} onPress={this.goInstructor}>
                <Image
                    source={photo}
                    style={Styles.i_p}
                />
                <TakeerText style={Styles.i_tc}>
                    {name}
                </TakeerText>
                <TakeerText style={Styles.i_cc}>
                    {category}
                </TakeerText>
                {online && <View style={Styles.i_a_o}>
                    <View style={Styles.i_o}/>
                </View>}
            </TouchableOpacity>
        );
    }
}

export default Instructors;