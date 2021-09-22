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
import {
  Block,
  Text,
  theme,
  Button as GaButton,
  Input,
  Radio,
  Toast,
} from "galio-framework";
import { Component } from "react";
import { axios } from "../../../Config/Axios";
import { Header } from "react-native-elements/dist/header/Header";
import { scale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import BagItem from "./BagItem";
import { RefreshControl } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  RadioButton,
} from "react-native-paper";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.addListener("didFocus", payload => {
      this.setState({ is_updated: true });
    });
  }

  state = {
    address: null,
    refresh: false,
    products: [],
    quantity: 0,
    delivery: 0,
    price: 0,
    total_price: 0,
    addressErr: "",
  };

  async componentDidMount() {
    await axios
      .get("/defaultAddress")
      .then(res => {
        if (res.data.response.data.address) {
          this.setState({
            address: res.data.response.data.address,
            delivery:
              res.data.response.data.address.city == "Alexandria" ? 50 : 70,
          });
        }
      })
      .catch(err => {});
    if (this.props.route.params) {
      this.setState({
        products: this.props.route.params.products,
        price: this.props.route.params.price,
        total_price: this.props.route.params.price + this.state.delivery,
      });
    }

    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.onRefresh();

      //Put your Data loading function here instead of my this.loadData()
    });
  }
  onRefresh = async () => {
    this.setState({
      refresh: true,
      addressErr: "",
      address: null,
      delivery: 0,
    });
    await axios
      .get("/defaultAddress")
      .then(res => {
        if (res.data.response.data.address) {
          this.setState({
            address: res.data.response.data.address,
            delivery:
              res.data.response.data.address.city == "Alexandria" ? 50 : 70,
          });
        } else {
        }
      })
      .catch(err => {});
    if (this.props.route.params) {
      this.setState({
        products: this.props.route.params.products,
        price: this.props.route.params.price,
        total_price: this.props.route.params.price + this.state.delivery,
        refresh: false,
      });
    }
  };

  submitOrder = async () => {
    var products = [];
    this.state.products.map(e => {
      products.push({
        product_id: e.id,
        size_id: e.size.id,
        quantity: e.quantity,
      });
    });
    var data = {
      address_id: this.state.address ? this.state.address.id : "",
      price: this.state.price,
      delivery: this.state.delivery,
      products: products,
    };
    await axios
      .post("/checkoutorder", data)
      .then(res => {
        this.props.navigation.push("Success");
      })
      .catch(err => {
        // console.log(err.response.data.errors);
        if (err.response.data.errors) {
          if (err.response.data.errors.address_id) {
            this.setState({
              addressErr: "Please Choose An Address",
            });
          }
          if (err.response.data.errors.product) {
            Alert.alert(
              "This Product Is not availble any more and it will be removed from your cart!",
              "",
              [
                {
                  text: "Ok",
                  onPress: () => {
                    this.props.navigation.goBack();
                  },
                  style: "cancel",
                },
              ],
              { cancelable: false },
            );
          }
        }
      });
  };

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
            text: "Checkout",
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
          <Text
            style={{
              color: "white",
              fontSize: 18,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              alignSelf: "flex-start",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            Shipping Address
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "red",
              alignSelf: "flex-start",
              marginLeft: 10,
            }}
          >
            {this.state.addressErr}
          </Text>
          {this.state.address ? (
            <Card
              // key={e.id}
              style={{
                width: "96%",
                alignSelf: "center",
                backgroundColor: "#2A2C36",
                marginTop: "3%",
              }}
            >
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title style={{ color: "#fff", fontSize: 16 }}>
                    {this.state.address.name}
                  </Title>
                  <Button
                    // icon="camera"
                    mode="text"
                    color="#28AE7B"
                    onPress={() => {
                      this.props.navigation.push("clientAddresses");
                    }}
                  >
                    Change
                  </Button>
                </View>

                <Paragraph
                  style={{ color: "#fff", fontSize: 16, lineHeight: 25 }}
                >
                  {this.state.address.city}, {this.state.address.region},{" "}
                  {this.state.address.street_name},{" "}
                  {this.state.address.building_no}, {this.state.address.floor}{" "}
                  floor, Appartment Number {this.state.address.appartment_no}
                </Paragraph>
              </Card.Content>
            </Card>
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
              onPress={() => {
                this.props.navigation.push("clientAddresses");
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  textTransform: "uppercase",
                }}
              >
                Add Address
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              alignSelf: "flex-start",
              marginTop: 40,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                alignSelf: "flex-start",
                marginLeft: 10,
                marginBottom: 10,
              }}
            >
              Payment
            </Text>
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
              }}
            >
              <RadioButton.IOS
                value="first"
                color="#28AE7B"
                style={{ marginBottom: -5 }}
                status="checked"
                // onPress={() => setChecked("first")}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 16,

                  marginLeft: 10,
                  marginTop: 5,
                }}
              >
                Cash On Delivery
              </Text>
            </View>
            <View style={{ marginTop: 8, flexDirection: "row" }}>
              <RadioButton.IOS
                value="second"
                uncheckedColor="#ABB4BD"
                style={{ marginBottom: -5 }}
                status="unchecked"
              />

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#ABB4BD",
                    fontSize: 16,

                    marginLeft: 10,
                    marginTop: 5,
                  }}
                >
                  Online Payment
                </Text>
                <Text
                  style={{
                    color: "#ABB4BD",
                    fontSize: 14,
                    marginRight: 10,
                    // marginLeft: 10,
                    marginTop: 5,
                  }}
                >
                  SOON
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          // style={styles.container}
          behavior="padding"
        >
          <View style={{ alignItems: "center", marginBottom: scale(15) }}>
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
                Order:{" "}
                {this.state.price
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
                }}
              >
                Delivery:{" "}
                {this.state.delivery
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
                }}
              >
                Summary:{" "}
                {this.state.total_price
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                EGP
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#28AE7B",
                borderRadius: 50,
                // height: 40,
                width: "90%",
                paddingVertical: 15,
                marginTop: 20,
                marginBottom: "10%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={this.submitOrder}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  // textTransform: "uppercase",
                }}
                // onPress={() => {
                //   this.props.navigation.push("Success");
                // }}
              >
                Submit Order
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {/* </ScrollView> */}
      </>
    );
  }
}

export default Checkout;
