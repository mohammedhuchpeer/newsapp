import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import signIn from '../app/index';
import SignIn from "../app/index";


function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    async _loadAssetsAsync() {
        const imageAssets = cacheImages([require('../assets/bg.png')]);

        await Promise.all([...imageAssets]);
    }

    signIn = () => {
        this.setState({ isSignedIn: true });
        return this.props.navigation.navigate('Home');
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return <SignIn onPress={this.signIn}/>
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});