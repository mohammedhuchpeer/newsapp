import React from 'react';
import { View, SafeAreaView, ScrollView, Image, Dimensions, Alert } from 'react-native';
import { Icon } from "native-base";
import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";
import AboutScreen from "./screens/AboutScreen";
import SignoutCard from './screens/SignoutCard';

const { width } = Dimensions.get('window');
export default function App() {
  return <AppContainer />
}

const HomeStackNavigator = createStackNavigator({
  Home: HomeScreen
}, { headerLayoutPreset: 'center' })

const SettingStackNavigator = createStackNavigator({
  Setting: SettingScreen
}, { headerLayoutPreset: 'center' })

const customDrawerComponents = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 225, backgroundColor: '#76DCA1', justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require("./assets/user-icon.png")}
        style={{ height: 120, width: 120, borderRadius: 60 }}
      />
    </View>
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <DrawerItems {...props} />
      <SignoutCard onPress={() =>
        Alert.alert(
          'Log out',
          'Do you want to logout?',
          [
            { text: 'Cancel', onPress: () => { return null } },
            {
              text: 'Confirm', onPress: () => {
                props.navigation.navigate('Login')
              }
            },
          ],
          { cancelable: false }
        )} />
    </ScrollView>
  </SafeAreaView>
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        drawerIcon: (<Icon style={{ flex: 1, height: 24, width: 24, marginTop: 12 }} name="home" size={20} />),
      }
    },
    Setting: {
      screen: SettingStackNavigator,
      navigationOptions: {
        drawerIcon: (<Icon style={{ flex: 1, height: 24, width: 24, marginTop: 12 }} name="settings" size={20} />)
      }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        drawerIcon: (<Icon style={{ flex: 1, height: 24, width: 24, marginTop: 12 }} name="information-circle" size={20} />)
      }
    }
  },
  {
    contentComponent: customDrawerComponents,
    drawerWidth: width / 1.5,
    contentOptions: {
      activeTintColor: 'orange'
    }
  });

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Home: DrawerNavigator
});

const AppContainer = createAppContainer(AppNavigator);

