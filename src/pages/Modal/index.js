import React, { Component } from 'react';
import { 
    Text, 
    View,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

import * as actions from '../../actions';
import { connect } from 'react-redux';
import TakeerIcon from '../../components/TakeerIcon';
import TakeerText from '../../components/TakeerText';

export default class Modal extends Component {

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{
                    ...StyleSheet.absoluteFillObject,
                    top:20,
                    left:10,
                }}
                onPress={() => goBack()}>
                    <TakeerIcon
                        iconType="Ionicons"
                        iconName="ios-close"
                        iconSize={50}
                        iconColor="#FFF"
                        iconPosition=""
                    />
                </TouchableOpacity>

                <TakeerText style={styles.header}>
                    Hi, I'm a Modal!
                </TakeerText>
                <Button
                    onPress={() => goBack()}
                    title="Close Me"
                />
            </View>
        );
    }
}
