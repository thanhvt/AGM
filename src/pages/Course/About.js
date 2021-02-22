import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import TakeerRatings from '../../components/TakeerRatings';
import TakeerText from '../../components/TakeerText';
import Student from './Student';
import Lecture from './Lecture';
const students=[
    {
        id:1,
        name:'James',
        photo:require('./assets/30.jpg'),
        online:false
    },
    {
        id:2,
        name:'John',
        photo:require('./assets/36.jpg'),
        online:true
    },
    {
        id:3,
        name:'Maria',
        photo:require('./assets/605.jpg'),
        online:false
    },
    {
        id:4,
        name:'Loki',
        photo:require('./assets/31.jpg'),
        online:true
    },
    {
        id:5,
        name:'Derylus',
        photo:require('./assets/627.jpg'),
        online:true
    },
    {
        id:6,
        name:'Zeyna',
        photo:require('./assets/33.jpg'),
        online:true
    },
    {
        id:7,
        name:'Mussa',
        photo:require('./assets/34.jpg'),
        online:false
    },
    {
        id:8,
        name:'Lorry',
        photo:require('./assets/38.jpg'),
        online:false
    },
    {
        id:9,
        name:'Fadhil',
        photo:require('./assets/39.jpg'),
        online:false
    },
    {
        id:10,
        name:'David',
        photo:require('./assets/37.jpg'),
        online:true
    },
    {
        id:11,
        name:'Elly',
        photo:require('./assets/31.jpg'),
        online:false
    },
    {
        id:12,
        name:'Jacob',
        photo:require('./assets/35.jpg'),
        online:false
    },
];

const lectures = [
    {
        id:1,
        title:'Introduction',
        description:'About this course and overview',
        type:'Video',
        time:'35 min'
    },
    {
        id:2,
        title:'Introduction',
        description:'About this course and overview',
        type:'Video',
        time:'24 min'
    },
    {
        id:3,
        title:'Introduction',
        description:'About this course and overview',
        type:'Video',
        time:'16 min'
    },
    {
        id:4,
        title:'Introduction',
        description:'About this course and overview',
        type:'Video',
        time:'20 min'
    },
    {
        id:5,
        title:'Introduction',
        description:'About this course and overview',
        type:'Video',
        time:'18 min'
    },
    {
        id:6,
        title:'Introduction',
        description:'About this course and overview',
        type:'Video',
        time:'20 min'
    },
    {
        id:7,
        title:'Introduction',
        description:'About this course and overview',
        type:'Video'
    },
    {
        id:8,
        title:'Introduction',
        description:'About this course and overview',
        type:'Video',
        time:'33 min'
    },
    {
        id:9,
        title:'Introduction',
        description:'About this course and overview',
        type:'Video',
        time:'41 min'
    },
    {
        id:10,
        title:'Introduction',
        description:'About this course and overview',
        type:'Video',
        time:'18 min'
    },
];

class About extends Component {

    renderRatings(i){
        var isize = 40;
        return (
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View>
                    <TakeerText style={{fontSize:isize, color:'rgb(244, 166, 59)'}}>
                        {i}.0
                    </TakeerText>
                </View>
                <View style={{paddingLeft:8}}>
                    <TakeerRatings
                        inactiveColor="rgb(80, 120, 118)"
                        activeColor="rgb(244, 166, 59)"
                        starSize={isize}
                        starCount={i}
                    />
                </View>
            </View>
        )
    }

    renderStudents(){
        return (
            <ScrollView horizontal>
                {students.map((item)=>(
                    <Student item={item} navigation={this.props.nav} key={item.id}/>
                ))}
            </ScrollView>
        )
    }

    renderLectures(){
        return (
            <ScrollView horizontal>
                {lectures.map((item)=>(
                    <Lecture item={item} navigation={this.props.nav} key={item.id}/>
                ))}
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={{flex:1, justifyContent:'space-around'}}>
                <View style={{marginVertical:10}}>
                    {this.renderRatings(4)}
                </View>
                <View>
                    <TakeerText style={{
                        color:'#FFF',
                        fontSize:20
                    }}>
                        About the Course
                    </TakeerText>
                    <TakeerText style={{color:'#fff', paddingVertical:8}}>
                        Lorem Ipsum kjal ks kjsld fjs jka djfkla sdjfkl sjdfk ajsdkl ajskd ajsdklf jasdkf jksld jfkals djflkas jdfklas djfkls djfalskd jfksd jfkla jflks djfkls dajkl jdfksl jd...
                    </TakeerText>
                </View>
                <View style={{}}>
                    <View style={{marginTop:20}}>
                        <TakeerText style={{color:'#FFF'}}>
                            2.8K STUDENTS
                        </TakeerText>
                    </View>
                    <View style={{marginTop:20}}>
                        {this.renderStudents()}
                    </View>
                </View>
                <View style={{marginTop:20}}>
                    <View style={{paddingVertical:8}}>
                        <TakeerText style={{color:'#FFF'}}>
                           36 LECTURES
                        </TakeerText>
                    </View>
                    <View>
                        {this.renderLectures()}
                    </View>
                </View>
            </View>
        );
    }
}
export default About;