import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { Styles, Fonts, Colors, Images } from '../../Common';
import TakeerIcon from '../../components/TakeerIcon';
import TakeerText from '../../components/TakeerText';
class User extends Component {

    render() {
        let data = [{id:1},{id:2},{id:3},{id:4},{id:5}];
        return (
            <SafeAreaView style={Styles.safeArea}>
            <View style={Styles.containerNoHeader}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity>
                        <TakeerIcon
                        iconType="Entypo"
                        iconName="chevron-small-left"
                        iconSize={25}
                        iconColor={Colors.primaryAccent}/>
                    </TouchableOpacity>
                    <TakeerText style={{color: Colors.primaryAccent, paddingLeft:6}}>
                        Back
                    </TakeerText>
                </View>
                <View style={{alignItems:'center'}}>
                    <TakeerText style={{color:Colors.textPrimary, fontSize: Fonts.size.h6}}>
                        James Johnson
                    </TakeerText>
                    <TakeerText style={{color:Colors.textSecondary}}>
                        Instructor
                    </TakeerText>
                    <TouchableOpacity style={{
                        paddingVertical:8,
                        paddingHorizontal:20,
                        backgroundColor: Colors.primaryAccent,
                        borderRadius:20,
                        marginTop:20
                    }}>
                        <TakeerText style={{
                            color: Colors.textPrimary,
                            fontSize: Fonts.size.h7
                        }}>
                            Follow
                        </TakeerText>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10, paddingHorizontal:10}}>
                    <View>
                        <TakeerText style={Styles.ptt}>
                            29
                        </TakeerText>
                        <TakeerText style={Styles.ptb}>
                            COURSES
                        </TakeerText>
                    </View>
                    <View>
                        <TakeerText style={Styles.ptt}>
                            5.0
                        </TakeerText>
                        <TakeerText style={Styles.ptb}>
                            RATING
                        </TakeerText>
                    </View>
                    <View>
                        <TakeerText style={Styles.ptt}>
                            1.6k
                        </TakeerText>
                        <TakeerText style={Styles.ptb}>
                            STUDENTS
                        </TakeerText>
                    </View>
                </View>

                <ScrollView>
                    {data.map((v, i)=>(
                        <TouchableOpacity style={{
                            flexDirection:'row',
                            backgroundColor:'rgba(255,255,255,0.07)',
                            padding:8,
                            marginVertical:8,
                            borderRadius:4
                        }} key={v.id}>
                            <View style={{paddingRight:8}}>
                                <Image 
                                    source={Images.icons.business}
                                    style={{
                                        width:40,
                                        height:40,
                                        borderRadius:20
                                    }}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <View style={{
                                    marginBottom:6, paddingBottom:6, borderBottomWidth:1, borderBottomColor:Colors.separator1
                                }}>
                                    <TakeerText style={{
                                        fontSize: Fonts.size.h5,
                                        fontWeight: 'bold'
                                    }}>
                                        Project Management
                                    </TakeerText>
                                    <TakeerText>
                                        Management
                                    </TakeerText>
                                </View>
                                <View style={{
                                    flexDirection:'row', 
                                    justifyContent:'space-between', 
                                    alignItems:'flex-end'
                                }}>
                                    <View>
                                        <TakeerText style={{fontSize: Fonts.size.h6}}>
                                            280
                                        </TakeerText>
                                        <TakeerText style={{color:Colors.textSecondary}}>
                                            Students
                                        </TakeerText>
                                    </View>
                                    <View>
                                        <TakeerText style={{fontSize: Fonts.size.h6}}>
                                            37
                                        </TakeerText>
                                        <TakeerText style={{color:Colors.textSecondary}}>
                                            Lectures
                                        </TakeerText>
                                    </View>
                                    <View style={{backgroundColor: 'green', paddingHorizontal:10, paddingVertical:4, borderRadius:4}}>
                                        <TakeerText style={{color:'#000'}}>
                                            $28.99
                                        </TakeerText>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            </SafeAreaView>
        );
    }
}

export default User;