/**
 * Created by gongchao on 16/9/5.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class HeaderMixin extends Component {
    render() {
        return (
            <View style={styles.header}>
                <View style={{backgroundColor: '#E07A38', paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5, marginRight: 5}}>
                    <Text style={{color: '#fff'}}>制造圈</Text>
                </View>
                <Text>关注最新制造业资讯</Text>
            </View>
        )
    }
}

class HeaderPostMixin extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _onPress() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.pop()
        }
    }

    render() {
        return (
            <View style={{
                height: 50,
                borderBottomWidth: 1,
                borderColor: '#E07A38',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={this._onPress.bind(this)}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center' , paddingLeft: 10, paddingRight: 10,height: 50}}>
                        <Icon
                            name="ios-arrow-dropleft"
                            size={18}
                            color="#888"
                        />
                        <Text style={{color: '#888', fontSize: 16}}> 返回</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    header: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#E07A38',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HeaderMixin;
export { HeaderPostMixin };