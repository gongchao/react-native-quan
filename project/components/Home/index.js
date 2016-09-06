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
    StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import GiftedListView from 'react-native-gifted-listview';

import HeaderMixin from '../../mixins/header';
import Post from '../Post';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _onFetch(page = 1, callback, options) {
        fetch('http://www.meng10000.com/api/news.php?act=newslist&page=' + page)
            .then(response => response.json())
            .then(data => callback(data));
    }

    _onPress(url) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push(
                {
                    name: 'Post',
                    component: Post,
                    params: {
                        url: url
                    }
                }
            )
        }
    }

    _renderRowView(row) {
        return (
            <TouchableOpacity
                onPress={this._onPress.bind(this, 'http://www.meng10000.com/weixin/news.php?act=show&id=' + row.id)}
            >
                <View style={styles.item}>
                    <StatusBar backgroundColor='#888'/>
                    <View style={styles.heading}>
                        <Text
                            style={{fontSize: 18, color: '#363636', lineHeight: 30}}
                            numberOfLines={2}
                        >{row.title}</Text>
                        <View
                            style={{flexDirection: 'row', alignItems: 'center'}}
                        >
                            <Icon
                                name={'ios-clock-outline'}
                                size={15}
                                color="#888"
                            />
                            <Text style={{color: '#888', paddingLeft: 5}}>{row.date}</Text>
                        </View>
                    </View>
                    {row.pic !== '' ?
                        <View style={styles.meta}>
                            <Image
                                style={{width: 80, height: 80}}
                                source={{uri: row.pic}}
                            />
                        </View>
                        : null }
                </View>
            </TouchableOpacity>

        )
    }

    _onEndReached() {
        this.refs.listView._onPaginate();
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <HeaderMixin/>
                <GiftedListView
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this._onFetch.bind(this)}
                    enableEmptySections={true}
                    refreshable={true}
                    paginationWaitingView={() => null}

                    ref='listView'
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={25}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff'
    },
    item: {
        borderBottomWidth: 1,
        borderColor: '#F0F0F0',
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    heading: {
        flex: 3,
    },
    meta: {
        flex: 1,
        flexDirection: 'row-reverse'
    }

});

export default Home;