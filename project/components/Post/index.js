/**
 * Created by gongchao on 16/9/5.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    TouchableNativeFeedback,
    WebView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import GiftedListView from 'react-native-gifted-listview';

import { HeaderPostMixin } from '../../mixins/header';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.flex}>
                <HeaderPostMixin navigator={this.props.navigator}/>
                <WebView
                    style={styles.flex}
                    source={{uri: this.props.url}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    }
});

export default Post;