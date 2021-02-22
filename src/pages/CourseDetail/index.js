import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';

import TakeerText from '../../components/TakeerText';
import TakeerIcon from '../../components/TakeerIcon';
import { Styles, Images, Fonts, Colors } from '../../Common';
import Course from './Course';

class CourseDetail extends Component {

    render() {
        let data = [
            {
                id:1,
                title: 'Introduction',
                subtitle:'About this course and overview',
                type:'Video'
            },
            {
                id:2,
                title: 'What is Management',
                subtitle:'Basics and Introduction',
                type:'Article'
            },
            {
                id:3,
                title: 'How does your decision affect your project',
                subtitle:'Learn the most important aspect of decisions',
                type:'Presentation'
            },
            {
                id:4,
                title: 'Introduction',
                subtitle:'About this course and overview',
                type:'Video'
            },
            {
                id:5,
                title: 'Introduction',
                subtitle:'About this course and overview',
                type:'Video'
            },
            {
                id:6,
                title: 'Introduction',
                subtitle:'About this course and overview',
                type:'Video'
            },
            {
                id:7,
                title: 'Introduction',
                subtitle:'About this course and overview',
                type:'Video'
            }
        ]
        return (
            <SafeAreaView style={Styles.safeArea}>
            <View style={{flex:1}}>
                <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center',
                    position:'absolute',
                    top:40,
                    left:10,
                    zIndex:1000,
                    backgroundColor:'rgba(255,255,255,0.2)',
                    paddingVertical:4,
                    paddingHorizontal:10,
                    borderRadius:20,
                    zIndex:1000
                }} onPress={()=>this.props.navigation.goBack()}>
                    <TakeerIcon
                    iconType="Entypo"
                    iconName="chevron-small-left"
                    iconColor={Colors.primary}
                    iconSize={20}/>
                    <TakeerText style={{
                        color: Colors.primary
                    }}>
                        Back
                    </TakeerText>
                </TouchableOpacity>

                <ScrollView style={{backgroundColor:Colors.secondary}}>
                    <View style={{backgroundColor: Colors.primaryLight}}>
                        <Image source={Images.coursecv} style={{width:null, maxHeight:200, flex:1}} resizeMode="cover"/>
                        <View style={{padding:20}}>
                            <TakeerText style={{
                                fontSize: Fonts.size.h1,
                                color: Colors.textPrimary,
                                textAlign:'center',
                                paddingVertical:10
                            }}>
                                Project Management
                            </TakeerText>

                            <View style={{alignSelf:'center', borderRadius:6, backgroundColor:'green', paddingVertical:4, paddingHorizontal:8}}>
                                <TakeerText style={{fontSize:Fonts.size.h6, fontWeight:'bold'}}>
                                    $28.99
                                </TakeerText>
                            </View>

                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                flex:1,
                                marginTop:20
                            }}>
                                <View style={Styles.cri}>
                                    <Image source={Images.icons.students} style={Styles.crg}/>
                                    <TakeerText style={Styles.crth}>
                                        5.8K
                                    </TakeerText>
                                    <TakeerText style={Styles.crtp}>
                                        Students
                                    </TakeerText>
                                </View>
                                <View style={Styles.cri}>
                                    <Image source={Images.icons.ratings} style={Styles.crg}/>
                                    <TakeerText style={Styles.crth}>
                                        5.0
                                    </TakeerText>
                                    <TakeerText style={Styles.crtp}>
                                        Rating
                                    </TakeerText>
                                </View>
                                <View style={Styles.cri}>
                                    <Image source={Images.icons.lectures} style={Styles.crg}/>
                                    <TakeerText style={[Styles.crth,{paddingTop:6}]}>
                                        37
                                    </TakeerText>
                                    <TakeerText style={Styles.crtp}>
                                        Lectures
                                    </TakeerText>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:Colors.separator, justifyContent:'space-between', paddingHorizontal:15, alignItems:'center', paddingVertical:8}}>
                        <View>
                            <Image source={Images.users.user1} style={{
                                width:18, height:18, borderRadius:9
                            }}/>
                        </View>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingLeft:10}}>
                            <View>
                                <TakeerText style={{
                                    color: Colors.primaryAccent,
                                    fontSize: Fonts.size.h6
                                }}>
                                    Alexander Jean
                                </TakeerText>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <TakeerIcon
                                iconType="Entypo"
                                iconName="star"
                                iconSize={18}
                                iconColor={Colors.yellowish}
                                />
                                <TakeerText style={{
                                    fontSize: Fonts.size.h6,
                                    color: Colors.yellowish
                                }}>
                                    5.0
                                </TakeerText>
                            </View>
                        </View>
                    </View>
                    {data.map((v,i)=>(
                        <Course data={v} key={v.id.toString()} navigation={this.props.navigation}/>
                    ))}
                    <TouchableOpacity style={{
                        backgroundColor: Colors.primaryAccent,
                        paddingVertical:18
                    }}>
                        <View style={{flexDirection:'row', alignSelf:'center', alignItems:'center'}}>
                            <Image source={Images.icons.download}/>
                            <TakeerText style={{paddingLeft:6, fontSize: Fonts.size.h5, color: Colors.textPrimary, fontWeight:'bold'}}>
                                Download Course
                            </TakeerText>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            </SafeAreaView>
        );
    }
}

export default CourseDetail;