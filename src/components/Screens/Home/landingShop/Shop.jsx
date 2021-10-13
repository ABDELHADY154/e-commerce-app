import { Button } from "galio-framework";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../../../Config/Axios";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { Alert, View } from "react-native";
import { CardEcomOne } from "react-native-card-ui";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "react-native-elements/dist/header/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MenTab from "./Men";
import WomenTab from "./Women";
import { useNavigation, useRoute } from "@react-navigation/native";
import { scale } from "react-native-size-matters";

const Tab = createMaterialTopTabNavigator();

const WomenScreenTab = props => {
  const navigation = useNavigation();
  return <WomenTab {...props} navigation={navigation} />;
};
const MenScreenTab = props => {
  const navigation = useNavigation();
  return <MenTab {...props} navigation={navigation} />;
};
export default class ShopScreen extends Component {
  render() {
    return (
      <>
        <Header
          containerStyle={{ borderBottomColor: "transparent" }}
          centerComponent={{
            text: "Brands",
            style: { color: "#fff", fontSize: scale(20) },
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
            component={WomenScreenTab}
            options={{
              tabBarLabel: "Women",
              tabBarIndicatorStyle: { backgroundColor: "#28AE7B" },
            }}
          />
          <Tab.Screen
            name="MenTab"
            component={MenScreenTab}
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
