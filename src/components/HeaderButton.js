import React, { Component } from 'react';
import { 
    StyleSheet, 
    View 
} from 'react-native';
import TakeerIcon from './TakeerIcon';
import PropTypes from 'prop-types';


export default class HeaderButton extends Component {

    static propTypes = {
        onPress: PropTypes.func.isRequired,
        icon: PropTypes.string.isRequired,
    }

    static defaultProps = {
        icon: 'md-menu',
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress}
                style={{backgroundColor:'#FFF'}}>
                    <TakeerIcon
                    iconType="Ionicons"
                    iconName={this.props.icon}
                    iconSize={26}
                    iconColor="#4F8F7F"/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        top:20,
        left:5,
    }
});