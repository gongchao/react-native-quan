/**
 * Created by gongchao on 16/9/5.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    StatusBar
} from 'react-native';

import Dimensions from 'Dimensions';

import Tab from '../Main/tab';

class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {navigator} = this.props;
        if (navigator) {
            setTimeout(() => {
                navigator.replace({
                    name: 'Home',
                    component: Tab
                })
            }, 1000)
        }
    }

    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <Image
                    style={{width: width, height: height}}
                    source={require('../../img/welcome.png')}
                    resizeMode="stretch"
                />
            </View>
        )
    }
}

export default Welcome;