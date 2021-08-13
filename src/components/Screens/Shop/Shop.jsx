import { Button } from "galio-framework";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../../Config/Axios";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { Alert, View } from "react-native";
import { CardEcomOne } from "react-native-card-ui";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "react-native-elements/dist/header/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MenTab from "./Men";
import WomenTab from "./Women";

const Tab = createMaterialTopTabNavigator();

export default class ShopScreen extends Component {
  async componentDidMount() {
    var userToken = await AsyncStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    await axios
      .get(`/clientProfile`)
      .then(res => {})
      .catch(err => {
        if (err.response.data.status == 401) {
          AsyncStorage.removeItem("userData");
          AsyncStorage.removeItem("userToken");
          AsyncStorage.removeItem("config");
          axios.defaults.headers.common["Authorization"] = ``;
          this.props.logout();
        }
      });
  }
  render() {
    return (
      <>
        <Header
          containerStyle={{ borderBottomColor: "transparent" }}
          centerComponent={{
            text: "Brands",
            style: { color: "#fff", fontSize: 36 },
          }}
        />
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 16 },
            // tabBarItemStyle: { borderColor: "red" },
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#ABB4BD",

            tabBarStyle: { backgroundColor: "transparent" },
          }}
        >
          <Tab.Screen
            name="WomenTab"
            component={WomenTab}
            options={{
              tabBarLabel: "Women",
              tabBarIndicatorStyle: { backgroundColor: "#28AE7B" },
            }}
          />
          <Tab.Screen
            name="MenTab"
            component={MenTab}
            options={{
              tabBarLabel: "Men",
              tabBarIndicatorStyle: { backgroundColor: "#28AE7B" },
            }}
          />
        </Tab.Navigator>
      </>
    );
  }
}
