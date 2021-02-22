import React, { Component } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import TakeerText from '../../components/TakeerText';
import { Styles, Colors, Fonts } from '../../Common';
class Course extends Component {

    render() {
        let { data } = this.props;
        return (
            <View style={{flexDirection:'row', padding:15}}>
                <View>
                    <TakeerText style={{color: Colors.textPrimary, paddingLeft:4, paddingRight:8, fontWeight:'bold', fontSize:Fonts.size.h6}}>
                        {data.id}
                    </TakeerText>
                </View>
                <View style={{flex:1}}>
                   <TakeerText style={{color: Colors.textPrimary, fontWeight:'bold', fontSize:Fonts.size.h6}}>
                       {data.title}
                   </TakeerText>
                   <TakeerText style={{color: Colors.textPrimary}}>
                       {data.subtitle}
                   </TakeerText>
                   <TakeerText style={{color: Colors.textSecondary}}>
                       {data.type}
                   </TakeerText>
                </View>
            </View>
        );
    }
}

export default Course;