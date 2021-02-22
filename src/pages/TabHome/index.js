import React, { Component } from 'react';
import { 
    View, 
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Colors, Styles, Images, Fonts } from '../../Common';
import TakeerText from '../../components/TakeerText';
import Course from '../Course';

import Header from './Header';

var Featured=[
    {
        title:'Business Management',
        curPrice:12.99,
        oldPrice:19.99,
        cover: Images.business,
        isFeatured:true,
        category:'Business'
    },
    {
        title:'Learn How To Play Guitar',
        curPrice:16.99,
        oldPrice:20.99,
        cover: Images.guitar,
        isFeatured:false,
        category:'Technology'
    },
    {
        title:'Medicine & Biology Basics',
        curPrice:10.98,
        oldPrice:10.98,
        cover: Images.medicine,
        isFeatured:true,
        category:'Design'
    },
    {
        title:'Technology for Enthusiast',
        curPrice:200.5,
        oldPrice:222.8,
        cover:Images.guitar,
        isFeatured:true,
        category:'Business'
    }
];

var Categories = [
    {
        title:'Business',
        iconName:Images.icons.business
    },
    {
        title:'Design',
        iconName:Images.icons.design
    },
    {
        title:'Economy',
        iconName:Images.icons.economy
    },
    {
        title:'Literature',
        iconName:Images.icons.literature
    },
    {
        title:'Computing',
        iconName:Images.icons.database
    },
    {
        title:'Science',
        iconName:Images.icons.science
    }
];

class TabHome extends Component {

    goCourse=(course)=>{
        this.props.navigation.navigate('Course');
    }

    renderPrice(o,n){
        var dis = o - n;
        if(dis > 0.001){
            return (
                <View style={{flexDirection:'row'}}>
                    <View>
                        <TakeerText style={{
                            color:'#FFF',
                            opacity:0.5
                        }}>${n}</TakeerText>
                    </View>
                    <View style={{paddingLeft:8}}>
                        <TakeerText style={{
                            color:Colors.textSecondary,
                            textDecorationLine:'line-through',
                            textDecorationColor:Colors.textSecondary,
                            opacity:0.5
                        }}>${o}</TakeerText>
                    </View>
                </View>
            )
        }else{
            return (
                <View>
                    <TakeerText style={{
                        color:'#FFF',
                        opacity:0.5
                    }}>${o}</TakeerText>
                </View>
            )
        }
    }

    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
                <View style={{flex:1, backgroundColor:Colors.primaryLight}}>
                    <Header navigation={this.props.navigation}/>
                    
                    <Text style={{padding:8, color:'#FFF'}}>
                        To buy this template, visit https://shop.codeonfly.com
                    </Text>

                    <ScrollView style={Styles.containerAfterHeader}>
                        <View style={{
                            flexDirection:'row'
                        }}>
                            <View style={{width:'50%'}}>
                                <TakeerText style={Styles.headerTitle}>Featured</TakeerText>
                            </View>
                            <View style={{width:'50%', alignItems:'flex-end', justifyContent:'center'}}>
                                <TouchableOpacity style={{marginTop:10}}>
                                    <TakeerText style={{
                                        color:Colors.primaryAccent,
                                        fontSize:16
                                    }}>SEE ALL</TakeerText>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <ScrollView 
                                horizontal={true}
                            >
                            {Featured.map((v,i)=>(
                                <TouchableOpacity style={Styles.featuredHolder} key={`${i}-key`} onPress={()=>this.goCourse(v)}>
                                    <View style={Styles.featuredHolderImg}>
                                        <Image 
                                            source={v.cover} 
                                            style={Styles.featuredImage}
                                            resizeMethod='scale'
                                        />
                                    </View>
                                    <View style={Styles.featuredHolderTitleHolder}>
                                        <TakeerText style={Styles.featuredHolderTitle}>{v.title}</TakeerText>
                                        {this.renderPrice(v.oldPrice, v.curPrice)}
                                    </View>
                                </TouchableOpacity>
                            ))}
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={Styles.headerTitle}>Categories</Text>
                        </View>
                        <View style={Styles.gridWrapContainer}>
                            {Categories.map((cat,i)=>(
                                <TouchableOpacity key={`${i}-c`} style={Styles.gridWrapInnerContainer}>
                                    <View style={Styles.gridCategories}>
                                        <Image source={cat.iconName}
                                        style={Styles.iconStyle}
                                        />
                                    </View>
                                    <View>
                                        <TakeerText style={Styles.gridCatTitle}>{cat.title}</TakeerText>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View>
                            <TakeerText style={Styles.headerTitle}>Latest</TakeerText>
                        </View>
                        <View>
                            {Featured.map((v,i)=>(
                                <TouchableOpacity key={`${i}-latest`} style={[Styles.latestHolder,{
                                    backgroundColor:'rgba(255,255,255,0.03)',
                                    borderRadius:4
                                }]} onPress={()=>this.goCourse(v)}>
                                    <View style={Styles.latestImage}>
                                        <Image source={v.cover} style={Styles.latestCover}
                                        resizeMethod="scale"
                                        />
                                    </View>
                                    <View style={[Styles.latestContentHolder,{flex:1}]}>
                                        <View>
                                            <TakeerText style={Styles.latestTitle}>{v.title}</TakeerText>
                                            <View style={{alignItems:'center'}}>
                                                {this.renderPrice(v.oldPrice, v.curPrice)}
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',justifyContent:'space-between', paddingHorizontal:8}}>
                                            <View>
                                                <TakeerText style={Styles.latestListH}>215</TakeerText>
                                                <TakeerText style={Styles.latestListB}>Students</TakeerText>
                                            </View>
                                            <View>
                                                <TakeerText style={Styles.latestListH}>14</TakeerText>
                                                <TakeerText style={Styles.latestListB}>Lectures</TakeerText>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ( state ) => ({
    settings: state.settings
})
export default connect(mapStateToProps,actions)(TabHome);