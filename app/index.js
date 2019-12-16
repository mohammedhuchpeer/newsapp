import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from "react-native";
import GoogleSignInButton from "../GoogleSignInButton";

const { width, height } = Dimensions.get('window');
class SignIn extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white", justifyContent: 'flex-end' }}>
                <View style={{ ...StyleSheet.absoluteFill }}>
                    <Image
                        source={require('../assets/bg.png')}
                        style={{ flex: 1, height: null, width: null }}
                    />
                </View>
                <View style={{ height: height / 3, justifyContent: 'center' }}>
                    <View style={styles.container}>
                        <GoogleSignInButton onPress={this.props.onPress} />
                    </View>
                </View>
            </View>
        );
    }
}
export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    }
});