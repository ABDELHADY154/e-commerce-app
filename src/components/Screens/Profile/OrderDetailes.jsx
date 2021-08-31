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
import DeliveredTab from "./Delivered";
import ProcessingTab from "./Processing";
import OrderedTab from "./Ordered";
import { useNavigation, useRoute } from "@react-navigation/native";
import { scale } from "react-native-size-matters";

const Tab = createMaterialTopTabNavigator();

const DeliveredScreenTab = (props) => {
  const navigation = useNavigation();
  return <DeliveredTab {...props} navigation={navigation} />;
};
const ProcessingScreenTab = (props) => {
  const navigation = useNavigation();
  return <ProcessingTab {...props} navigation={navigation} />;
};
const OrderedScreenTab = (props) => {
  const navigation = useNavigation();
  return <OrderedTab {...props} navigation={navigation} />;
};

export default class Order extends Component {
  async componentDidMount() {
    var userToken = await AsyncStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    await axios
      .get(`/clientProfile`)
      .then((res) => {})
      .catch((err) => {
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
          containerStyle={{
            borderBottomColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            width: "98%",
          }}
          centerComponent={{
            text: "Order Detailes",
            style: { color: "#fff", fontSize: scale(20) },
          }}
          leftComponent={{
            icon: "chevron-left",
            color: "#fff",
            size: scale(30),
            onPress: () => {
              this.props.navigation.goBack();
            },
          }}
          // rightComponent={{
          //   icon: "search",
          //   color: "#fff",
          //   size: scale(30),
          //   onPress: () => {
          //     this.props.navigation.push("createAddress");
          //   },
          // }}
        />
      </>
    );
  }
}
