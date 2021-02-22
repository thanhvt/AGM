import React, { Component } from 'react';
import { 
    View, 
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Colors, Styles, Images } from '../../Common';
import TakeerText from '../../components/TakeerText';
import Header from './Header';
import Instructors from './Instructors';
import Courses from './Courses';

class TabSearch extends Component {

    render() {
        const instructors = [
            {
                id:1,
                name:'James',
                category:'Economy',
                photo: require('./assets/596.jpg'),
                online:true
            },
            {
                id:2,
                name:'Marry',
                category:'Geology',
                photo: require('./assets/605.jpg'),
                online:false
            },
            {
                id:3,
                name:'Loki',
                category:'IT',
                photo: require('./assets/613.jpg'),
                online:false
            },
            {
                id:4,
                name:'Hellen',
                category:'Mathematics',
                photo: require('./assets/622.jpg'),
                online:true
            }
        ];

        var Categories = [
            {
                id:1,
                title:'Business',
                iconName:Images.icons.business
            },
            {
                id:2,
                title:'Design',
                iconName:Images.icons.design
            },
            {
                id:3,
                title:'Economy',
                iconName:Images.icons.economy
            },
            {
                id:4,
                title:'Literature',
                iconName:Images.icons.literature
            },
            {
                id:5,
                title:'Computing',
                iconName:Images.icons.database
            },
            {
                id:6,
                title:'Science',
                iconName:Images.icons.science
            }
        ];

        return (
            <SafeAreaView style={Styles.safeArea}>
            <View style={{flex:1, backgroundColor:Colors.secondary}}>
                <Header navigation={this.props.navigation}/>
                <View style={[Styles.containerAfterHeader,{backgroundColor:Colors.primary}]}>
                    <View style={Styles.searchSection}>
                        <View style={Styles.searchTC}>
                            <TakeerText style={Styles.headerTitle}>
                                Top Instructors
                            </TakeerText>
                        </View>
                        <ScrollView 
                            style={Styles.searchData}
                            horizontal
                        >
                            {instructors.map((item)=>(
                                <Instructors item={item} key={item.id} navigation={this.props.navigation}/>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={Styles.searchSection}>
                        <View style={Styles.searchTC}>
                            <TakeerText style={Styles.headerTitle}>
                                Recommended
                            </TakeerText>
                        </View>
                        <ScrollView 
                            style={Styles.searchData}
                            horizontal
                        >
                            {Categories.map((item)=>(
                                <Courses item={item} key={item.id} navigation={this.props.navigation}/>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ( state ) => ({
    settings: state.settings
})
export default connect(mapStateToProps,actions)(TabSearch);