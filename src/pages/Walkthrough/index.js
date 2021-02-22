import React, { Component } from 'react';
import {
	Image,
	Text,
    TouchableOpacity,
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    ScrollView
} from 'react-native';
import Header from './header';
import styles from './styles';
import TakeerButton from '../../components/TakeerButton';
import TakeerText from '../../components/TakeerText';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Carousel, { Pagination } from 'react-native-snap-carousel';

//slide items, you can replace with your items..
const entries = [
    {
        img:'../../assets/images/Intro.png',
        title:'Learn Effortlessly',
        descr: 'Use your Phone to become productive, Download Courses and study offline'
    },
    {
        img:'../../assets/images/Intro.png',
        title:'New Courses',
        descr: 'Discover new courses added every week from handcraft to digital'
    },
    {
        img:'../../assets/images/Intro.png',
        title:'Expert Trainers',
        descr:'We have expert lectures from Top Universities in a Country.'
    },
    {
        img:'../../assets/images/Intro.png',
        title:'Certicate on Demand!',
        descr:'Become certified and expand your field to be needed!'
    }
]

const horizontalMargin = 20;
const slideWidth = 220;

const sliderWidth = Dimensions.get('window').width;
const screenW = Dimensions.get('screen').width;
const screenH = Dimensions.get('screen').height;
const itemWidth = slideWidth + horizontalMargin * 2;


class index extends Component {

    constructor(props){
        super(props);
        this.state = {
            entries: entries,
            activeSlide: 0,
            finish:false
        }
    }

    skip=()=>{
        this.props.skipWalkthrough();
    }

    _renderItem ({item, index}) {
        return (
            <View style={[styles.sliderItem, {width: screenW}]}>
                <View style={{height:'70%'}}>
                    {/* Image */}
                    <Image source={require('../../assets/images/Intro.png')}
                    style={{
                        width:300,
                        height:300,
                        alignSelf:'center'
                    }}
                    />
                </View>
                <View>
                    {/* Header */}
                    <TakeerText style={{
                        textAlign:'center',
                        fontSize:30,
                        fontWeight:'bold',
                        color:'#fff'
                    }}>
                        {item.title}
                    </TakeerText>
                </View>
                <View style={{
                    paddingHorizontal:30,
                    marginTop:30
                }}>
                    {/* Description */}
                    <TakeerText style={{
                        color:'#fff',
                        textAlign:'center',
                        fontWeight:'bold'
                    }}>
                        {item.descr}
                    </TakeerText>
                </View>
            </View>
        );
    }

    sliderDots() {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.sliderDotsContainer}
              dotStyle={styles.sliderDots}
              inactiveDotStyle={styles.sliderDotsInactive}
              inactiveDotOpacity={1}
              inactiveDotScale={0.4}
            />
        );
    }

    nextClick=()=>{
        this.setState({
            activeSlide: this.state.activeSlide+1
        })
        this._carousel.snapToNext();
    }

    renderNext(){
        if(this.state.activeSlide <= this.state.entries.length-2){
            return (
                <TakeerButton
                    onPress={this.nextClick}
                    backgroundColor='rgba(255,255,255,0.5)'
                    borderWidth={0}
                    borderColor="transparent"
                    borderRadius={40} // pass border radius
                    textColor="#000"
                    textSize={16}
                    textWeight="bold"
                    textFont=""
                    text="Next" //button texts
                    showIcon={true}// if false, pass null to every icon attribute below
                    iconType="Entypo" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                    iconName="arrow-bold-right" //icon name according to iconType or pass null to hide
                    iconSize={20}
                    iconColor="#000"
                    iconPosition="left" //left, right, null
                    loading={false} //true or false -- true to show spinner/loading
                    loadingText="" // default is Loading.., you may pass any texts or null not to show
                    paddingHorizontal={40}// 
                />
            )
        }else{
            return (
                <TakeerButton
                    onPress={this.skip}
                    backgroundColor='rgba(255,255,255,0.5)'
                    borderWidth={0}
                    borderColor="transparent"
                    borderRadius={40} // pass border radius
                    textColor="#000"
                    textSize={16}
                    textWeight="bold"
                    textFont=""
                    text="Finish" //button texts
                    showIcon={true}// if false, pass null to every icon attribute below
                    iconType="Feather" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                    iconName="check-square" //icon name according to iconType or pass null to hide
                    iconSize={20}
                    iconColor="#000"
                    iconPosition="left" //left, right, null
                    loading={false} //true or false -- true to show spinner/loading
                    loadingText="" // default is Loading.., you may pass any texts or null not to show
                    paddingHorizontal={40}// 
                />
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}/>
                <View style={{flex:1}}>
                    <View
                    style={{
                        height:'90%'
                    }}>
                        <View style={{flex:1}}>
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.entries}
                                renderItem={this._renderItem}
                                sliderWidth={screenW}
                                itemWidth={screenW}
                                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                            />
                            { this.sliderDots() }
                        </View>
                    </View>
                    <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        paddingHorizontal:10
                    }}>
                        <TakeerButton
                            onPress={this.skip}
                            backgroundColor='transparent'
                            borderWidth={0}
                            borderColor="transparent"
                            borderRadius={40} // pass border radius
                            textColor="#fff"
                            textSize={16}
                            textWeight="bold"
                            textFont=""
                            text="Skip" //button texts
                            showIcon={true}// if false, pass null to every icon attribute below
                            iconType="Feather" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
                            iconName="eye-off" //icon name according to iconType or pass null to hide
                            iconSize={20}
                            iconColor="#fff"
                            iconPosition="left" //left, right, null
                            loading={false} //true or false -- true to show spinner/loading
                            loadingText="" // default is Loading.., you may pass any texts or null not to show
                            paddingHorizontal={20}// 
                        />

                        {this.renderNext()}
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ( state ) => ({
    settings: state.settings
})

export default connect(mapStateToProps, actions)(index);