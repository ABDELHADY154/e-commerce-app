import { Button } from "galio-framework";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../../Config/Axios";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { Alert, View, Image, TouchableOpacity } from "react-native";
import { CardEcomOne } from "react-native-card-ui";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "react-native-elements/dist/header/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DeliveredTab from "./Delivered";
import ProcessingTab from "./Processing";
import OrderedTab from "./Ordered";
import { useNavigation, useRoute } from "@react-navigation/native";
import { scale } from "react-native-size-matters";

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
            text: "Order Details",
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
        <ScrollView
          contentContainerStyle={{ height: "100%" }}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refresh}
          //     onRefresh={this.onRefresh}
          //     tintColor="white"
          //   />
          // }
        >
          <View style={{ marginHorizontal: "5%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
                Order No. 1312587
              </Text>
              <Text style={{ color: "#ABB4BD", fontSize: 16 }}>05-6-2021</Text>
            </View>
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 6,
                // marginHorizontal: "5%",
              }}
            >
              {/* <Text style={{ color: "#fff", fontSize: 16 }}>
                Tracking Number
              </Text>
              <Text style={{ color: "#ABB4BD", fontSize: 16 }}>052021</Text> */}
              <Text
                style={{
                  color: "#2AA952",
                  fontSize: 16,
                  // justifyContent: "flex-end",
                  // alignItems: "flex-end",
                }}
              >
                Delivered
              </Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 16, marginVertical: 10 }}>
              3 Items
            </Text>
            <View>
              <View
                style={{
                  backgroundColor: "#2A2C36",
                  width: "100%",
                  height: 130,
                  borderRadius: 5,
                  marginTop: scale(5),
                  marginBottom: scale(5),
                  // flex: 1,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={require("../../../assets/images/image2.png")}
                  style={{
                    height: "100%",
                    width: scale(110),
                    borderRadius: 5,
                    marginBottom: 0,
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: scale(220),
                      // width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        marginLeft: 20,
                        marginTop: 10,
                        // width: "50%",
                      }}
                    >
                      {/* {this.props.name} */}
                      name
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "#ABB4BD",
                        fontSize: 15,
                        marginLeft: 20,
                        marginTop: 10,
                      }}
                    >
                      Size:
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 15,
                        marginLeft: 10,
                        marginTop: 10,
                      }}
                    >
                      {/* {this.props.size.size} */}L
                    </Text>
                  </View>
                  <View
                    style={{
                      // flex: 1,
                      flexDirection: "row",
                      marginLeft: 20,
                      // marginBottom: 15,
                      // alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "#ABB4BD",
                          fontSize: 15,
                          // marginLeft: 20,
                          // marginTop: 10,
                        }}
                      >
                        Units:
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 15,
                          marginLeft: 10,
                          // marginTop: 10,
                        }}
                      >
                        {/* {this.props.size.size} */}L
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "white",

                        fontSize: 18,
                        // marginLeft: 12,
                      }}
                    >
                      54
                      {/* {this.props.price
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "} */}
                      EGP
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
