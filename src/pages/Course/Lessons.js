import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
import Card from './Card';
import TakeerIcon from '../../components/TakeerIcon';
import TakeerText from '../../components/TakeerText';
import { Images } from '../../Common';
class Lessons extends Component {

    goCourseDetail=()=>{
        this.props.nav.navigate('CourseDetail');
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Card>
                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', paddingVertical:30}}>
                        <ImageBackground source={Images.coursebg} style={{width:null, height:null, flex:1}} resizeMode="center">
                            <View style={{alignItems:'center', margin:15}}>
                                <Image source={Images.icons.course}/>
                                <TakeerText style={{
                                    fontSize:20,
                                    color:'#FFF',
                                    paddingTop:20,
                                    fontWeight:'bold'
                                }}>
                                    Introduction
                                </TakeerText>
                            </View>
                        </ImageBackground>
                        <View style={{flex:1, margin:15, marginTop:20}}>
                            <View>
                                <TakeerText style={{color:'#eee', fontSize:16, textAlign:'center'}}>
                                    Lorem Ipsum is lasdk sldk fkasf kals jfkskdf do other means of coming to lorem ipsum just sample txts to kep koin...
                                </TakeerText>
                            </View>
                            <View style={{alignSelf:'center', marginTop:20}}>
                                <TouchableOpacity style={{
                                    backgroundColor: 'rgb(112, 127, 247)',
                                    padding:8,
                                    width:140,
                                    borderRadius:20
                                    }} onPress={this.goCourseDetail}>
                                    <TakeerText style={{color:'#FFF', fontSize:20, textAlign:'center'}}>
                                        Start
                                    </TakeerText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Card>
            </View>
        );
    }
}
export default Lessons;