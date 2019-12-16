import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import {Icon} from "native-base";

class SettingScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Settings',
            headerStyle: { backgroundColor: "#B3E5C8" },
            headerLeft: (
                <Icon name="menu" style={{ flex: 1, marginLeft: 10, alignSelf: 'center',}} size={25} onPress={() => navigation.openDrawer()} />
            ),
            headerRight: <View style={{ padding: 6 }}></View>,
            headerTitleStyle: {
                fontSize: 25
            }
        };
    };
    render() {
        return (
            <View style={styles.container}>
                <Text>SettingScreen</Text>
            </View>
        );
    }
}
export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});