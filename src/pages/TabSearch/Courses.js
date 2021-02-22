import React, { Component } from 'react';
import {
    Image,
    View,
    Text, 
    TouchableOpacity
} from 'react-native';
import { Styles, Colors } from '../../Common';
import TakeerText from '../../components/TakeerText';
class Courses extends Component {

    goCourse=()=>{
        this.props.navigation.navigate('Course');
    }

    render() {
        const { id, title, iconName } = this.props.item;
        return (
            <TouchableOpacity style={Styles.i_c} onPress={this.goCourse}>
                <Image
                    source={iconName}
                    style={Styles.i_p}
                />
                <TakeerText style={Styles.i_tc}>
                    {title}
                </TakeerText>
                {/*<TakeerText style={Styles.i_cc}>
                    {category}
                </TakeerText>*/}
            </TouchableOpacity>
        );
    }
}

export default Courses;