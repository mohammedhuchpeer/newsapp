import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    
} from "react-native";
import {Icon} from "native-base";

class SignoutCard extends Component {
    render() {
        return (
            <TouchableOpacity style={{flex:1}}
            onPress={this.props.onPress}
            >
                <View style={{flex:1,flexDirection:'row', marginTop:10 }}>
                    <Icon name="log-out" style={{height:26, width:26, marginLeft:17}}/>
                <Text style={{marginLeft:28, fontWeight:'bold', marginTop:3}}>Signout</Text>
                </View>
            </TouchableOpacity>
            
        );
    }
}
export default SignoutCard;

