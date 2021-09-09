import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Block, Text, theme, Button as GaButton, Input } from "galio-framework";
import { Component } from "react";
import { axios } from "../../../Config/Axios";
import { Header } from "react-native-elements/dist/header/Header";
import { scale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
// import { Button, Menu, Divider, Provider, TextInput } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import BagItem from "./BagItem";
import { RefreshControl } from "react-native";
import { KeyboardAvoidingView } from "react-native";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class Bag extends Component {
  state = {
    products: [],
    quantity: 0,
    total_price: 0,
    refresh: false,
    buttonDisable: false,
    quanErr: "",
  };

  onRefresh = () => {
    this.setState({
      refresh: true,
    });
    axios
      .get("cart")
      .then(res => {
        // console.log(res.data.response.data);
        this.setState({
          products: res.data.response.data.products,
          quantity: res.data.response.data.quantity,
          total_price: res.data.response.data.total_price,
          refresh: false,
        });
      })
      .catch(err => {});
  };
  async componentDidMount() {
    axios
      .get("cart")
      .then(res => {
        // console.log(res.data.response.data);
        this.setState({
          products: res.data.response.data.products,
          quantity: res.data.response.data.quantity,
          total_price: res.data.response.data.total_price,
        });
      })
      .catch(err => {});
  }

  deleteItem = (productId, sizeId) => {
    axios
      .post("/deleteItem", {
        product_id: productId,
        size_id: sizeId,
      })
      .then(res => {
        this.onRefresh();
      })
      .catch(err => {
        this.onRefresh();
      });
  };
  addQuantity = (productId, sizeId, quantity) => {
    if (quantity >= 1) {
      this.setState({
        buttonDisable: true,
      });
      axios
        .post("/updateCart", {
          product_id: productId,
          size_id: sizeId,
          quantity: quantity + 1,
        })
        .then(res => {
          this.onRefresh();
          this.setState({
            buttonDisable: false,
          });
        })
        .catch(err => {
          this.onRefresh();

          // console.log();

          this.setState({
            buttonDisable: false,
            quanErr: err.response.data.errors.quantity,
          });

          if (err.response.data.errors.quantity) {
            Alert.alert(
              `${this.state.quanErr}`,
              "",
              [
                {
                  text: "OK",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                // {
                //   text: "Go To Cart",
                //   onPress: () => {
                //     this.props.navigation.push("Home", { screen: "Cart" });
                //   },
                // },
              ],
              { cancelable: false },
            );
          }
        });
    }
  };
  minusQuantity = (productId, sizeId, quantity) => {
    if (quantity > 1) {
      this.setState({
        buttonDisable: true,
      });
      axios
        .post("/updateCart", {
          product_id: productId,
          size_id: sizeId,
          quantity: quantity - 1,
        })
        .then(res => {
          this.onRefresh();
          this.setState({
            buttonDisable: false,
          });
        })
        .catch(err => {
          this.onRefresh();
          this.setState({
            buttonDisable: false,
            quanErr: err.response.data.errors,
          });
          // if (condition) {

          // } else if() {

          // }
          this.setState({
            buttonDisable: false,
            quanErr: err.response.data.errors.quantity,
          });
          if (err.response.data.errors.quantity) {
            Alert.alert(
              `${this.state.quanErr}`,
              "",
              [
                {
                  text: "OK",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                // {
                //   text: "Go To Cart",
                //   onPress: () => {
                //     this.props.navigation.push("Home", { screen: "Cart" });
                //   },
                // },
              ],
              { cancelable: false },
            );
          }
          // else if (err.response.data.errors) {
          //   this.setState({
          //     buttonDisable: false,
          //     quanErr: err.response.data.errors,
          //   });
          //   Alert.alert(
          //     `${this.state.quanErr}`,
          //     "",
          //     [
          //       {
          //         text: "OK",
          //         onPress: () => console.log("Cancel Pressed"),
          //         style: "cancel",
          //       },
          //       // {
          //       //   text: "Go To Cart",
          //       //   onPress: () => {
          //       //     this.props.navigation.push("Home", { screen: "Cart" });
          //       //   },
          //       // },
          //     ],
          //     { cancelable: false },
          //   );
          // }
        });
    }
  };

  render() {
    console.log(this.state);
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
            text: "My Cart",
            style: { color: "#fff", fontSize: scale(20) },
          }}
          // rightComponent={{
          //   icon: "search",
          //   color: "#fff",
          //   size: scale(30),
          //   onPress: () => {
          //     this.props.navigation.goBack();
          //   },
          // }}
        />

        {/* <ScrollView> */}

        <ScrollView
          contentContainerStyle={{
            // height: "70%",
            width: "97%",
            alignSelf: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              tintColor="white"
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {this.state.products.length !== 0 ? (
            this.state.products.map((e, i) => {
              return (
                <BagItem
                  key={i}
                  image={e.images[0].image}
                  name={e.name}
                  price={e.price}
                  quantity={e.quantity}
                  size={e.size}
                  buttonDisable={this.state.buttonDisable}
                  addButton={() => {
                    this.addQuantity(e.id, e.size.id, e.quantity);
                  }}
                  subButton={() => {
                    this.minusQuantity(e.id, e.size.id, e.quantity);
                  }}
                  deleteOnPress={() => {
                    this.deleteItem(e.id, e.size.id);
                  }}
                />
              );
            })
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginTop: "50%",
              }}
            >
              <Text color="white">Your Cart Is Empty</Text>
            </View>
          )}
        </ScrollView>
        <KeyboardAvoidingView
          // style={styles.container}
          behavior="padding"
        >
          <View style={{ alignItems: "center", marginBottom: scale(15) }}>
            <View style={{ marginTop: 30, width: "95%" }}>
              {/* <Input
                placeholder="Enter Your Promo Code"
                placeholderTextColor="#ABB4BD"
                right
                icon="chevron-right"
                family="Entypo"
                iconSize={26}
                iconColor="#ABB4BD"
                style={{ backgroundColor: "#1E1F28", borderWidth: 0 }}
              /> */}
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                alignSelf: "flex-start",
                marginLeft: scale(14),
              }}
            >
              <Text
                style={{
                  color: "#ABB4BD",
                  fontSize: 18,
                  // marginLeft: 20,
                  marginTop: 10,
                  textAlign: "left",
                  // alignItems: "flex-start",
                  // alignSelf: "flex-start",
                  // alignContent: "flex-start",
                  // justifyContent: "flex-start",
                }}
              >
                Cart Price:{" "}
                {this.state.total_price
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                EGP
              </Text>
              <Text
                style={{
                  color: "#ABB4BD",
                  fontSize: 18,
                  // marginLeft: 20,
                  marginTop: 10,
                  textAlign: "left",

                  // alignItems: "flex-end",
                  // alignSelf: "flex-end",
                  // alignContent: "flex-end",
                  // justifyContent: "flex-end",
                }}
              >
                Count: {this.state.quantity}
              </Text>
            </View>

            {this.state.products.length !== 0 ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#28AE7B",
                  borderRadius: 50,
                  // height: 40,
                  width: "90%",
                  paddingVertical: 15,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.props.navigation.push("Checkout", {
                    price: this.state.total_price,
                    products: this.state.products,
                  });
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    textTransform: "uppercase",
                  }}
                >
                  Check out
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "#28AE7B",
                  borderRadius: 50,
                  // height: 40,
                  width: "90%",
                  paddingVertical: 15,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    textTransform: "uppercase",
                  }}
                >
                  Check out
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>

        {/* </ScrollView> */}
      </>
    );
  }
}

export default Bag;
