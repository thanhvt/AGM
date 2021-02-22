import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { Styles, Fonts, Colors, Images } from '../../Common';
import TakeerIcon from '../../components/TakeerIcon';
import TakeerText from '../../components/TakeerText';
import Header from '../Course/Header';
class User extends Component {

    render() {
        let data = [{id:1},{id:2},{id:3},{id:4},{id:5}];
        return (
            <SafeAreaView style={Styles.safeArea}>
            <View style={{flex:1, backgroundColor:Colors.secondary}}>
                <Header navigation={this.props.navigation}/>
                <View style={{alignItems:'center'}}>
                    <View>
                        <Image
                            source={Images.users.user4}
                            style={[Styles.i_p,{
                                width:100,
                                height:100,
                                borderRadius:50,
                            }]}
                        />
                        <View style={Styles.i_a_o}>
                            <View style={Styles.i_o}/>
                        </View>
                    </View>
                    <TakeerText style={{color:Colors.textPrimary, fontSize: Fonts.size.h6}}>
                        Emily Petersz
                    </TakeerText>
                    <TakeerText style={{color:Colors.textSecondary}}>
                        Student
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
                            Add Friend
                        </TakeerText>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10, paddingHorizontal:10, marginBottom:20}}>
                    <View>
                        <TakeerText style={Styles.ptt}>
                            7
                        </TakeerText>
                        <TakeerText style={Styles.ptb}>
                            COURSES
                        </TakeerText>
                    </View>
                    <View>
                        <TakeerText style={Styles.ptt}>
                            193.79
                        </TakeerText>
                        <TakeerText style={Styles.ptb}>
                            POINTS
                        </TakeerText>
                    </View>
                    <View>
                        <TakeerText style={Styles.ptt}>
                            11
                        </TakeerText>
                        <TakeerText style={Styles.ptb}>
                            RANK
                        </TakeerText>
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', marginVertical:10, marginHorizontal:10}}>
                    <Image source={Images.badges.starter}/>
                    <View style={{flex:1, paddingLeft:8}}>
                        <TakeerText style={{fontSize:Fonts.size.h6}}>
                            Quick Learner
                        </TakeerText>
                        <TakeerText style={{color:Colors.textSecondary}}>
                            Completed 1 course
                        </TakeerText>
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', marginVertical:10, marginHorizontal:10}}>
                    <Image source={Images.badges.elite}/>
                    <View style={{flex:1, paddingLeft:8}}>
                        <TakeerText style={{fontSize:Fonts.size.h6}}>
                            Master Mind!
                        </TakeerText>
                        <TakeerText style={{color:Colors.textSecondary}}>
                            Got 1st place on Leaderboard
                        </TakeerText>
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', marginVertical:10, marginHorizontal:10}}>
                    <Image source={Images.badges.pro}/>
                    <View style={{flex:1, paddingLeft:8}}>
                        <TakeerText style={{fontSize:Fonts.size.h6}}>
                            Super Learner
                        </TakeerText>
                        <TakeerText style={{color:Colors.textSecondary}}>
                            Completed more than 5 courses
                        </TakeerText>
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', marginVertical:10, marginHorizontal:10}}>
                    <Image source={Images.badges.geek}/>
                    <View style={{flex:1, paddingLeft:8}}>
                        <TakeerText style={{fontSize:Fonts.size.h6}}>
                            The Achiever
                        </TakeerText>
                        <TakeerText style={{color:Colors.textSecondary}}>
                            Logged in everyday for 1 Month.
                        </TakeerText>
                    </View>
                </View>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Congrats')}>
                    <TakeerText style={{padding:8}}>
                        New Achievement Screen!
                    </TakeerText>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        );
    }
}

export default User;