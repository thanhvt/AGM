import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import {
    Styles, Colors, Images, Fonts
} from '../../Common';
import TakeerText from '../../components/TakeerText';
class Congrats extends Component {
    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
            <View style={{backgroundColor: Colors.secondary,flex:1}}>
                <View style={{flex:1,flexDirection:'column'}}>
                    <View style={{height:'50%'}}>
                        <ImageBackground 
                            source={Images.confetti}
                            style={{alignItems:'center', justifyContent:'center', width:null, height:null, flex:1}}>
                            <Image source={Images.badges.pro} style={{width:80, height:80}}/>
                        </ImageBackground>
                    </View>
                    <View style={{height:'50%', alignItems:'center'}}>
                        <TakeerText style={{fontSize: 50, color: Colors.textPrimary}}>
                            Congrats
                        </TakeerText>
                        <TakeerText style={{color: Colors.textSecondary, paddingVertical:6, fontSize:Fonts.size.h6}}>
                            You have unlocked a new badge!
                        </TakeerText>

                        <TouchableOpacity style={{backgroundColor:Colors.primaryAccent, paddingVertical:8, paddingHorizontal:20, borderRadius:30, marginTop:20}}>
                            <TakeerText style={{fontSize:18, color: Colors.textPrimary}}>
                                Awesome
                            </TakeerText>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    position:'absolute',
                    bottom:0,
                    left:0, right:0
                }}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between'
                    }}>
                        <TouchableOpacity style={{padding:15}}>
                            <Image source={Images.icons.sharegray}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{padding:15}}>
                            <Image source={Images.icons.achievegray}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </SafeAreaView>
        );
    }
}

export default Congrats;