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
          contentContainerStyle={{}}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refresh}
          //     onRefresh={this.onRefresh}
          //     tintColor="white"
          //   />
          // }
        >
          <View style={{ marginHorizontal: "5%", marginTop: 10 }}>
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
                <View
                  style={{
                    justifyContent: "space-between",
                    width: scale(180),
                    marginLeft: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      marginTop: 8,
                    }}
                  >
                    {/* {this.props.name} */}
                    name
                  </Text>
                  <Text
                    style={{
                      color: "#ABB4BD",
                      fontSize: 15,
                      marginLeft: -4,
                      marginTop: 6,
                    }}
                  >
                    {/* {this.props.size.size} */} Brand name
                  </Text>

                  <View style={{ flex: 1, flexDirection: "row", marginTop: 8 }}>
                    <Text
                      style={{
                        color: "#ABB4BD",
                        fontSize: 15,
                        marginRight: 10,
                      }}
                    >
                      Size:
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 15,
                      }}
                    >
                      {/* {this.props.size.size} */}L
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",

                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "#ABB4BD",
                          fontSize: 15,
                          marginRight: 10,
                        }}
                      >
                        Units:
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 15,
                        }}
                      >
                        {/* {this.props.size.size} */}L
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "white",

                        fontSize: 18,
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
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 25 }}>
              Order Information
            </Text>
            <View style={{}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 25,
                }}
              >
                <Text
                  style={{
                    color: "#ABB4BD",
                    fontSize: 15,
                  }}
                >
                  Shipping Address:
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    lineHeight: 25,
                    width: scale(190),
                  }}
                >
                  3 Newbridge Court ,Chino Hills, CA 91709, United States
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 25,
                }}
              >
                <Text
                  style={{
                    color: "#ABB4BD",
                    fontSize: 15,
                  }}
                >
                  Payment Method:
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    width: scale(190),
                  }}
                >
                  Cash On Delivery
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 25,
                }}
              >
                <Text
                  style={{
                    color: "#ABB4BD",
                    fontSize: 15,
                  }}
                >
                  Delivery Method:
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    width: scale(190),
                  }}
                >
                  2 Days, 15EGP
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 25,
                }}
              >
                <Text
                  style={{
                    color: "#ABB4BD",
                    fontSize: 15,
                  }}
                >
                  Discount:
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    width: scale(190),
                  }}
                >
                  -
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 25,
                }}
              >
                <Text
                  style={{
                    color: "#ABB4BD",
                    fontSize: 15,
                  }}
                >
                  Total Amount:
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    width: scale(190),
                  }}
                >
                  300EGP
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <Button
                color="error"
                style={{
                  width: scale(150),
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 18,
                  backgroundColor: "transparent",
                  borderColor: "#EB2020",
                  color: "#EB2020",
                  // justifyContent: "flex-start",
                }}
                // onPress={() => {
                //   this.props.navigation.push("OrderDetailes");
                // }}
              >
                <Text style={{ color: "#EB2020", fontSize: 16 }}>Cancel</Text>
              </Button>
              <Button
                color="#28AE7B"
                style={{
                  width: scale(150),
                  height: 40,
                  // borderWidth: 1,
                  borderRadius: 18,
                  backgroundColor: "#28AE7B",
                  // borderColor: "#28AE7B",
                  // justifyContent: "flex-start",
                }}
                // onPress={() => {
                //   this.props.navigation.push("OrderDetailes");
                // }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  Leave Feedback
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
