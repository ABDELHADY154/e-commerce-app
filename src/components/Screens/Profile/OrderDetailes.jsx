import { Button } from "galio-framework";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../../Config/Axios";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import {
  Alert,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
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
  constructor(props) {
    super(props);
    this.props.navigation.addListener("didFocus", payload => {
      this.setState({ is_updated: true });
    });
  }

  state = {
    refresh: false,
    order: {},
    address: {},
    products: [],
    delivery: 0,
    total_price: 0,
  };
  async componentDidMount() {
    if (this.props.route.params.id) {
      await axios
        .get(`/order/${this.props.route.params.id}`)
        .then(res => {
          this.setState({
            order: res.data.response.data,
            products: res.data.response.data.products,
            address: res.data.response.data.address,
            delivery: res.data.response.data.delivery,
            total_price: res.data.response.data.total_price,
          });
        })
        .catch(err => {});
    }
  }

  onCancelOrder = async () => {
    // Alert.alert();
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel your order?",

      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Cancel Order",
          onPress: async () => {
            let data = {
              order_id: this.state.order.id,
            };
            await axios
              .post("cancelorder", data)
              .then(res => {
                this.props.navigation.goBack();
              })
              .catch(err => {});
            // this.props.navigation.push("Home", { screen: "Cart" });
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    console.log(this.state.products);
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
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              tintColor="white"
            />
          }
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
                Order No. {this.state.order.order_num}
              </Text>
              <Text style={{ color: "#ABB4BD", fontSize: 16 }}>
                {this.state.order.created_at}
              </Text>
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
                {this.state.order.status}
              </Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 16, marginVertical: 10 }}>
              {this.state.order.quantity}{" "}
              {this.state.order.quantity > 1 ? "items" : "item"}
            </Text>
            <View>
              <ScrollView>
                {this.state.products.map(e => {
                  return (
                    <View
                      key={e.id}
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
                        source={{ uri: e.images[0].image }}
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
                          {e.name}
                        </Text>
                        {/* <Text
                          style={{
                            color: "#ABB4BD",
                            fontSize: 15,
                            marginLeft: -4,
                            marginTop: 6,
                          }}
                        >
                          {e.brand}
                        </Text> */}

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            marginTop: 8,
                          }}
                        >
                          <Text
                            style={{
                              color: "#ABB4BD",
                              fontSize: 15,
                              marginRight: 10,
                            }}
                          >
                            Size: {e.size.size}
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
                              {e.quantity}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: "white",

                              fontSize: 18,
                            }}
                          >
                            {e.price
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                            EGP
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
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
                  {this.state.address
                    ? `${this.state.address.building_no} , ${this.state.address.street_name}, ${this.state.address.region}, ${this.state.address.city}`
                    : ""}
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
                    textTransform: "capitalize",
                  }}
                >
                  {this.state.order.payment_method}
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
                  Within Two Days,{" "}
                  {this.state.delivery
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                  EGP
                </Text>
              </View>
              {/* <View
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
              </View> */}
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
                  {this.state.total_price
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                  EGP
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
              {this.state.order.status == "ordered" ? (
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
                  onPress={this.onCancelOrder}
                  // onPress={() => {
                  //   this.props.navigation.push("OrderDetailes");
                  // }}
                >
                  <Text style={{ color: "#EB2020", fontSize: 16 }}>Cancel</Text>
                </Button>
              ) : (
                <Text></Text>
              )}
              <Button
                color="#28AE7B"
                style={{
                  width:
                    this.state.order.status == "ordered" ? scale(150) : "100%",
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
