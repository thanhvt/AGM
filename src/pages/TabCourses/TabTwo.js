import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import TakeerIcon from '../../components/TakeerIcon';
import { Styles, Colors } from '../../Common';
import TakeerText from '../../components/TakeerText';

const { width, height } = Dimensions.get('screen');
const conWidth = (width/2);
const slidHeight = height-160;
const data = [
    {
        id:3,
        icon:{
            type:'MaterialCommunityIcons',
            name:'guitar-acoustic',
            color:'#c5c5c5'
        },
        title:'Learn how to play Guitar',
        progress:'34%'
    },
    {
        id:4,
        icon:{
            type:'Entypo',
            name:'cake',
            color:'magenta'
        },
        title:'Basics of Baking Cakes',
        progress:'49%'
    },
    {
        id:5,
        icon:{
            type:'MaterialCommunityIcons',
            name:'margin',
            color:'#888'
        },
        title:'Calculus II',
        progress:'8%'
    },
    {
        id:6,
        icon:{
            type:'FontAwesome',
            name:'language',
            color:'black'
        },
        title:'Machine Language',
        progress:'50%'
    },
    {
        id:7,
        icon:{
            type:'MaterialCommunityIcons',
            name:'guitar-acoustic',
            color:'#c5c5c5'
        },
        title:'Learn how to play Guitar',
        progress:'34%'
    },
    {
        id:8,
        icon:{
            type:'Entypo',
            name:'cake',
            color:'magenta'
        },
        title:'Basics of Baking Cakes',
        progress:'49%'
    },
    {
        id:9,
        icon:{
            type:'MaterialCommunityIcons',
            name:'margin',
            color:'#888'
        },
        title:'Calculus II',
        progress:'8%'
    },
    {
        id:10,
        icon:{
            type:'FontAwesome',
            name:'language',
            color:'black'
        },
        title:'Machine Language',
        progress:'50%'
    }
];

class TabTwo extends Component {
    goCourse=()=>{
        this.props.nav.navigate('Course');
    }
    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <View style={{height:conWidth, width:conWidth}}>
            <View style={{flex:1, flexDirection:'column', borderRadius:8, margin:16, backgroundColor:'rgba(255,255,255,0.12)', justifyContent:'space-between', padding:10}}>
                <View>
                    <TakeerIcon
                    iconType={item.icon.type}
                    iconName={item.icon.name}
                    iconSize={40}
                    iconColor={item.icon.color}
                    iconPosition=""
                    />
                </View>
                <TouchableOpacity onPress={()=>this.goCourse(item)}>
                    <View style={{marginBottom:20}}>
                        <TakeerText style={{fontSize:18, color:'#FFF'}}>
                            {item.title}
                        </TakeerText>
                    </View>
                    <View style={{height:5, borderRadius:10, backgroundColor:'#000'}}>
                        <View style={{height:5, borderRadius:10, width: item.progress, backgroundColor:'green'}}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{position:'absolute', padding:4, paddingRight:0, top:10,right:10}}>
                    <TakeerIcon
                    iconType="Entypo"
                    iconName="dots-three-vertical"
                    iconSize={20}
                    iconColor="#aaa"
                    iconPosition=""
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    render() {
        return (
            <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', flexWrap:'wrap'}}>
                <FlatList
                    style={{flexGrow:1, height: slidHeight}}
                    contentContainerStyle={{
                        alignItems:'center',
                        justifyContent:'space-between'
                    }}
                    horizontal={false}
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    initialNumToRender={10}
                    numColumns={2}
                />
            </View>
        );
    }
}
export default TabTwo;