/**
 * Created by gongchao on 16/9/5.
 */
import React, {Component} from 'react';
import {
    Navigator,
    ToastAndroid,
    BackAndroid,
    Platform,
    Alert
} from 'react-native';

import Tab from './tab';
import Welcome from '../Welcome';

// 热更新
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';
import _updateConfig from '../../../update.json';
const { appKey } = _updateConfig[Platform.OS];

// 极光推送
import JPush , {JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush';

import Post from '../Post';

class Main extends Component {


    constructor(props) {
        super(props);
        this._onBackAndroid = this._onBackAndroid.bind(this);
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid);

        // 热更新
        checkUpdate(appKey)
            .then(info => {
                console.log(info);
                if (info.expired) {
                    Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本');
                } else if (info.update) {
                    this._doUpdate(info);
                }
            });

        if (isFirstTime) {
            markSuccess();
        }
    }

    componentDidMount() {
        JPush.requestPermissions();
        this.pushlisteners = [
            JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
            JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
        ]
    }

    onReceiveMessage(message) {
        // console.log(message._data);
    }

    onOpenMessage(message) {
        let navigator = this.refs.navigator;

        if (message._data['cn.jpush.android.EXTRA'] && JSON.parse(message._data['cn.jpush.android.EXTRA']).url) {
            let url = JSON.parse(message._data['cn.jpush.android.EXTRA']).url;
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
    }

    _doUpdate = info => {
        downloadUpdate(info).then(hash => {
            switchVersionLater(hash)
        })
            .catch(err => console.log('更新失败'))
    };

    _onBackAndroid() {
        let navigator = this.refs.navigator;
        let routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            navigator.pop();
            return true;
        } else {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                initialRoute={{name: 'Welcome', component: Welcome}}
                configureScene={route => Navigator.SceneConfigs.FloatFromBottomAndroid}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator}/>;
                }}
            />
        )
    }
}

export default Main;