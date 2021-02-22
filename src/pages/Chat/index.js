import React, { Component } from 'react';
import {
    View, 
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Keyboard,
    SafeAreaView
} from 'react-native';

import TakeerText from '../../components/TakeerText';
import { Styles, Fonts, Colors, Images } from '../../Common';
import TakeerIcon from '../../components/TakeerIcon';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state={
            margin_bottom:10
        }
    }

    componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',this._keyboardDidHide.bind(this));
    }

    componentWillUnmount(){
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide(){
        this.setState({margin_bottom:10});
    }

    _keyboardDidShow(e){
        var height = e.endCoordinates.height;
        //console.log('Keyboard Height', height);
        this.setState({margin_bottom:height});
        setTimeout(()=>{
            //this.scrollRef.scrollToEnd();
        },10)
    }    
    
    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
            <View style={Styles.containerNoHeader}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <View style={{padding:4}}>
                            <TakeerIcon
                                iconType="Feather"
                                iconName="arrow-left"
                                iconSize={30}
                                iconColor={Colors.primaryAccent}
                                iconPosition="" //left, right, null
                            />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <TakeerText style={{textAlign:'center', fontWeight:'bold', color: Colors.textPrimary}}>
                            Elsie Johnson
                        </TakeerText>
                        <TakeerText style={{textAlign:'center', color: Colors.textPrimary, fontSize:10}}>
                            Online
                        </TakeerText>
                    </View>
                    <View>
                        <Image source={Images.users.user1} style={{
                            width:30, height:30, borderRadius:15
                        }}/>
                    </View>
                </View>

                <ScrollView>
                    {/* Time Separator */}
                    <View style={{flexDirection:'row', marginVertical:6}}>
                        <View style={Styles.itm}>
                            <View style={Styles.itb}/>
                        </View>
                        <TakeerText style={{
                            textAlign:'center',
                            fontSize:12,
                            paddingHorizontal:6,
                            color: Colors.textSecondary
                        }}>
                            YESTERDAY
                        </TakeerText>
                        <View style={Styles.itm}>
                            <View style={Styles.itb}/>
                        </View>
                    </View>

                    {/* Chat */}
                    <View style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        paddingVertical:6,
                        paddingHorizontal:20,
                        borderRadius:20,
                        alignSelf:'flex-start',
                        marginVertical:6
                        }}>
                        <TakeerText style={{color: Colors.textPrimary}}>
                            Hi Nimasha
                        </TakeerText>
                    </View>

                    <View style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        paddingVertical:6,
                        paddingHorizontal:20,
                        borderRadius:20,
                        alignSelf:'flex-start',
                        marginVertical:6,
                        maxWidth:'80%'
                        }}>
                        <TakeerText style={{color: Colors.textPrimary}}>
                            May i have the answer for the question i asked on lesson 5
                        </TakeerText>
                    </View>

                    <View style={{
                        backgroundColor: Colors.primaryLight,
                        paddingVertical:6,
                        paddingHorizontal:20,
                        borderRadius:20,
                        alignSelf:'flex-end',
                        marginVertical:6,
                        maxWidth:'80%'
                        }}>
                        <TakeerText style={{color: Colors.textPrimary}}>
                            oh.. sure..
                        </TakeerText>
                    </View>

                    <View style={{
                        backgroundColor: Colors.primaryLight,
                        paddingVertical:6,
                        paddingHorizontal:20,
                        borderRadius:20,
                        alignSelf:'flex-end',
                        marginVertical:6,
                        maxWidth:'80%'
                        }}>
                        <TakeerText style={{color: Colors.textPrimary}}>
                            I will send you answers on your Email at 9:30am
                        </TakeerText>
                    </View>

                    {/* Time Separator */}
                    <View style={{flexDirection:'row', marginVertical:6}}>
                        <View style={Styles.itm}>
                            <View style={Styles.itb}/>
                        </View>
                        <TakeerText style={{
                            textAlign:'center',
                            fontSize:12,
                            paddingHorizontal:6,
                            color: Colors.textSecondary
                        }}>
                            TODAY
                        </TakeerText>
                        <View style={Styles.itm}>
                            <View style={Styles.itb}/>
                        </View>
                    </View>

                    {/* Chat Proceed */}
                    <View style={{
                        backgroundColor: Colors.primaryLight,
                        paddingVertical:6,
                        paddingHorizontal:20,
                        borderRadius:20,
                        alignSelf:'flex-end',
                        marginVertical:6,
                        maxWidth:'80%'
                        }}>
                        <TakeerText style={{color: Colors.textPrimary}}>
                            Sent to your email.. Proceed with your coursework.
                        </TakeerText>
                    </View> 

                    <View style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        paddingVertical:6,
                        paddingHorizontal:20,
                        borderRadius:20,
                        alignSelf:'flex-start',
                        marginVertical:6
                        }}>
                        <TakeerText style={{color: Colors.textPrimary}}>
                            Thank you..
                        </TakeerText>
                    </View>
                </ScrollView>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    backgroundColor:Colors.primary,
                    marginBottom:this.state.margin_bottom,
                    borderRadius:30,
                    elevation:6
                }}>
                    <View style={{padding:8, flexDirection:'row', alignItems:'center', flex:1}}>
                        <TakeerIcon
                        iconType="Entypo"
                        iconName="emoji-happy"
                        iconSize={28}
                        iconColor={Colors.primaryAccent}/>

                        <View style={{flex:1, paddingLeft:6}}>
                            <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Ask me something.."
                            placeholderTextColor={Colors.textSecondary}
                            multiline
                            style={{
                                fontSize:Fonts.size.h6,
                                color: Colors.textSecondary
                            }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.primaryAccent,
                        height:50,
                        width:50,
                        borderRadius:25,
                        alignItems:'center',
                        justifyContent:'center',
                        opacity:0.5
                    }}>
                        <TakeerIcon
                        iconType="Feather"
                        iconName="corner-right-up"
                        iconSize={20}
                        iconColor={Colors.textPrimary}/>
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
        );
    }
}

export default Chat;