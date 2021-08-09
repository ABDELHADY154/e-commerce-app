import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "galio-framework";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import HomeScreen from "./Screens/Home/Home";
import ProfileScreen from "./Screens/Profile/Profile";
import { useNavigation, useRoute } from "@react-navigation/native";

const Tabs = AnimatedTabBarNavigator();
export default class Home extends Component {
  async storeToken() {
    try {
      await AsyncStorage.removeItem("userToken");
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // console.log(axios.defaults.headers.common);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  Home = props => {
    const navigation = useNavigation();
    return (
      <HomeScreen
        {...props}
        navigation={navigation}
        logout={() => {
          this.storeToken();
          this.props.logout();
        }}
      />
    );
  };
  Profile = props => {
    const navigation = useNavigation();
    return (
      <ProfileScreen
        {...props}
        navigation={navigation}
        logout={() => {
          this.storeToken();
          this.props.logout();
        }}
      />
    );
  };
  render() {
    return (
      // <View>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "white",
          activeBackgroundColor: "#2F7C6E",
          tabStyle: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          },
        }}
        appearance={{
          tabBarBackground: "#1E1F28",
          shadow: true,
        }}
      >
        <Tabs.Screen
          name="Home"
          component={this.Home}
          options={{
            tabBarIcon: () => (
              <Icon
                name="home"
                family="Feather"
                size={24}
                color="white"
                // focused={focused}
                // color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Shop"
          component={this.Profile}
          options={{
            tabBarIcon: () => (
              <Icon
                name="shop"
                family="Entypo"
                size={24}
                color="white"
                // color={focused ? color : "#222222"}
                // focused={focused}
                // color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Bag"
          component={this.Profile}
          options={{
            tabBarIcon: () => (
              <Icon
                name="shopping-bag"
                family="Feather"
                size={24}
                color="white"
                // color={focused ? color : "#222222"}
                // focused={focused}
                // color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Favorites"
          component={this.Profile}
          options={{
            tabBarIcon: () => (
              <Icon
                name="hearto"
                family="AntDesign"
                size={24}
                color="white"
                // color={focused ? color : "#222222"}
                // focused={focused}
                // color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={this.Profile}
          options={{
            tabBarIcon: () => (
              <Icon
                name="user"
                family="AntDesign"
                size={24}
                color="white"
                // color={focused ? color : "#222222"}
                // focused={focused}
                // color={color}
              />
            ),
          }}
        />
      </Tabs.Navigator>
      // </View>
    );
  }
}
{
  /* <Button<MaterialCommunityIcons name="account-circle-outline" size={24} color="black" />
          onPress={() => {
            this.storeToken();
            this.props.logout();
          }}
        >
          Logout
        </Button> */
}
