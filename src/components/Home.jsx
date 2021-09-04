import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "galio-framework";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import HomeScreen from "./Screens/Home/Home";
import ProfileScreen from "./Screens/Profile/Profile";
import BagScreen from "./Screens/Bag/Bag";
import { useNavigation, useRoute } from "@react-navigation/native";
import ShopScreen from "./Screens/Shop/Shop";
import Favorite from "./Screens/Favorite/Favorite";
const Tabs = AnimatedTabBarNavigator();
export default class Home extends Component {
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
  Shop = props => {
    const navigation = useNavigation();
    return (
      <ShopScreen
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
  Bag = props => {
    const navigation = useNavigation();
    return (
      <BagScreen
        {...props}
        navigation={navigation}
        logout={() => {
          this.storeToken();
          this.props.logout();
        }}
      />
    );
  };
  FavoriteScreen = props => {
    const navigation = useNavigation();
    return (
      <Favorite
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
          activeBackgroundColor: "#28AE7B",
          tabStyle: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          },
        }}
        appearance={{
          tabBarBackground: "#2A2C36",
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
                size={26}
                color="white"
                // focused={focused}
                // color={color}
              />
            ),
            unmountOnBlur: true,
          }}
          listeners={({ navigation }) => ({
            blur: () => navigation.setParams({ screen: undefined }),
          })}
        />
        <Tabs.Screen
          name="Shop"
          component={this.Shop}
          options={{
            tabBarIcon: () => (
              <Icon
                name="shop"
                family="Entypo"
                size={26}
                color="white"
                // color={focused ? color : "#222222"}
                // focused={focused}
                // color={color}
              />
            ),
            unmountOnBlur: true,
          }}
          listeners={({ navigation }) => ({
            blur: () => navigation.setParams({ screen: undefined }),
          })}
        />
        <Tabs.Screen
          name="Cart"
          component={this.Bag}
          options={{
            tabBarIcon: () => (
              <Icon
                name="shopping-bag"
                family="Feather"
                size={26}
                color="white"
              />
            ),
            unmountOnBlur: true,
          }}
          listeners={({ navigation }) => ({
            blur: () => navigation.setParams({ screen: undefined }),
          })}
        />
        <Tabs.Screen
          name="Favorites"
          component={this.FavoriteScreen}
          options={{
            tabBarIcon: () => (
              <Icon
                name="hearto"
                family="AntDesign"
                size={26}
                color="white"
                // color={focused ? color : "#222222"}
                // focused={focused}
                // color={color}
              />
            ),
            unmountOnBlur: true,
          }}
          listeners={({ navigation }) => ({
            blur: () => navigation.setParams({ screen: undefined }),
          })}
        />
        <Tabs.Screen
          name="Profile"
          component={this.Profile}
          options={{
            tabBarIcon: () => (
              <Icon name="user" family="AntDesign" size={26} color="white" />
            ),
            unmountOnBlur: true,
          }}
          listeners={({ navigation }) => ({
            blur: () => navigation.setParams({ screen: undefined }),
          })}
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
