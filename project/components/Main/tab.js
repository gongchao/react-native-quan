/**
 * Created by gongchao on 16/9/5.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    ToastAndroid
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../Home';

class Tabbar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _renderTab(tab, i) {
        let color = this.props.activeTab == i ? "#E07A38" : "#888";
        return (
            <TouchableOpacity
                onPress={()=>this.props.goToPage(i)}
                style={styles.tab}
                key={i}
            >
                <View style={styles.tabItem}>
                    <Icon
                        name={this.props.tabIconNames[i]}
                        size={25}
                        color={color}
                    />
                    <Text style={{color: color}}>{tab}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this._renderTab(tab, i))}
            </View>
        )
    }
}

class Tab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['精选', '动态', '我的'],
            tabIconNames: ['ios-star-outline', 'md-information', 'ios-person-outline']
        }
    }

    render() {
        return (
            <ScrollableTabView
                style={{backgroundColor: '#FCFCFC'}}
                locked={false}
                scrollWithoutAnimation={false}
                tabBarPosition={'bottom'}
                renderTabBar={() => <Tabbar tabNames={this.state.tabNames} tabIconNames={this.state.tabIconNames}/>}
            >
                <Home tabLabel="精选" navigator={this.props.navigator}/>
                <About tabLabel="关于" navigator={this.props.navigator}/>
            </ScrollableTabView>
        )
    }
}

class About extends Component {
    //ToastAndroid.show('自动更新', ToastAndroid.SHORT);

    render() {
        return (
            <View
                  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            >
                <Text style={{textAlign: 'center', lineHeight: 25, color: '#888'}}>当前最新版</Text>
                <Text style={{textAlign: 'center', lineHeight: 25, color: '#888'}}>当前版本: 0.44 {'\r'} 版权所有: 中国奥盟网</Text>
                <Text style={{textAlign: 'center', lineHeight: 25, color: '#888'}}>最后一次更新时间: 20160905</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 55,
        borderTopWidth: 1,
        borderColor: '#ddd'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default Tab;