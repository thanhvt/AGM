import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ViewPropTypes,
    TextPropTypes,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import TakeerText from '../TakeerText';

class TakeerFlatTabs extends Component {

    static propTypes = {
        tabs: PropTypes.array.isRequired,
        activeTitleColor: PropTypes.string,
        inactiveTitleColor: PropTypes.string,
        initialIndex: PropTypes.number,
        containerStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        activeIndicatorStyle:ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        titleTextStyle:TextPropTypes ? TextPropTypes.style : Text.propTypes.style,
        titleContainerStyle:ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
    }

    static defaultProps={
        activeTitleColor:'blue',
        inactiveTitleColor:'#aaa',
        initialIndex:0,
        containerStyle:{},
        activeIndicatorStyle:{},
        titleTextStyle:{},
        titleContainerStyle:{}
    }

    constructor(props) {
        super(props);
        this.state={
            activeChild: this.props.initialIndex
        }
    }

    renderTabs(v){
        const tabs = this.props.tabs;
        if(!v){
            global.ErrorUtils.reportFatalError('Sorry, TakeerFlatTabs has no childrens! Please add Childrens to be mapped as tab contents');
        }else{
            if(tabs.length === v.length){

                return (
                    v[this.state.activeChild]
                )
                //console.error('Good Childrens match');
            }else{
                global.ErrorUtils.reportFatalError('Sorry, TakeerFlatTabs children do not match with tabs array items, they must match');
            }
        }
    }

    activeBar(i){
        if(this.state.activeChild === i){
            return (
                <View style={[{
                    height:2,
                    backgroundColor:'blue'
                },this.props.activeIndicatorStyle]}/>
            )
        }
        return (
            <View style={{
                height:2,
                backgroundColor:'transparent'
            }}/>   
        )
    }

    renderTabTitles(){
        return (
        <View style={{height:30}}>
            <ScrollView 
                horizontal
                contentContainerStyle={{
                    flexDirection:'row'
                }}
                style={{
                    flex:1
                }}
            >
                {this.props.tabs.map((t,i)=>(
                    <TouchableOpacity
                        style={[{
                            marginRight:30
                        },this.props.titleContainerStyle]}
                        key={`${i}_t`}
                        onPress={()=>{this.setState({activeChild:i})}}
                    >
                        <View style={{padding:4}}>
                            <TakeerText style={[this.props.titleTextStyle,{
                                color: this.state.activeChild === i ? this.props.inactiveTitleColor : this.props.activeTitleColor
                            }]}>
                                {t}
                            </TakeerText>
                            {this.activeBar(i)}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
        )
    }

    render() {
        return (
            <View style={[{
                flex:1
            },this.props.containerStyle]}>
                {this.renderTabTitles()}
                {this.renderTabs(this.props.children)}
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default TakeerFlatTabs;