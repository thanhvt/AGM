import React, { Component } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';

import TakeerText from '../../components/TakeerText';

class Lecture extends Component {

    render() {
        const { id, title, description, type, time } = this.props.item;
        return (
            <TouchableOpacity style={{
                flexDirection:'row',
                backgroundColor:'rgba(255,255,255,0.15)',
                marginRight:20,
                padding:10,
                borderRadius:6
            }}>
                <View>
                    <TakeerText style={{color:'#FFF'}}>
                        {id}.
                    </TakeerText>
                </View>
                <View style={{marginLeft:10}}>
                    <View>
                        <TakeerText style={{color:'#FFF', fontWeight:'bold'}}>
                            {title}
                        </TakeerText>
                    </View>
                    <View style={{paddingVertical:2}}>
                        <TakeerText style={{color:'#ccc'}}>
                            {description}
                        </TakeerText>
                    </View>
                    <View>
                        <TakeerText style={{color:'#999'}}>
                            {type} - {time}
                        </TakeerText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
export default Lecture;