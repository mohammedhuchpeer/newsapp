import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";

const googleIcon = require('./assets/icon-google.png');

class GoogleSignInButton extends Component {
    static defaultProps = { onPress() { } };
    render() {
        const { ...props } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.6} style={styles.touchable}{...props}>
                <View style={styles.container}>
                    <Image source={googleIcon} style={styles.icon} />
                    <Text style={styles.text}>Sign in with Google</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
export default GoogleSignInButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchable: {
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowRadius: 1.5,
        shadowOffset: { width: 1, height: 1 },
        overflow: 'visible',
        backgroundColor: 'white',
        borderRadius: 7.5,
        borderWidth: 0.5,
        width: 225,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 30,
        aspectRatio: 1
    },
    text: {
        color: 'grey',
        marginLeft: 12,
        fontSize: 18,
        fontWeight: '600'
    }
});