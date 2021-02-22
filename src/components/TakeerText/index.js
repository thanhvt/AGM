import React, { Component } from 'react';
import {
    Text,
} from 'react-native';

import { Fonts as fonts, Colors } from '../../Common';

class TakeerText extends Component {
    render() {
        let { children, style, ...props } = this.props;
        return (
            <Text
            {...props}
            style={[{
                //add default styles here..
                //fontFamily: fonts.family._default,
                fontSize: fonts.size._default,
                color: Colors._default
            },style]}
            >
            {children}
            </Text>
        );
    }
}
export default TakeerText;