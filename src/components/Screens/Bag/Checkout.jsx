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
  state = {
    addresses: [],
    // refresh: true,
    products: [],
    quantity: 0,
    total_price: 0,
  };

  async componentDidMount() {
    // console.log(this.props.route.params.refresh);
    // await axios
    //   .get("/clientAddress")
    //   .then(res => {
    //     this.setState({
    //       addresses: res.data.response.data.addresses,
    //       refresh: false,
    //     });
    //   })
    //   .get("cart")
    //   .then(res => {
    //     // console.log(res.data.response.data);
    //     this.setState({
    //       products: res.data.response.data.products,
    //       quantity: res.data.response.data.quantity,
    //       total_price: res.data.response.data.total_price,
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
                  address name
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
                address content
              </Paragraph>
            </Card.Content>
          </Card>
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
              <RadioButton
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
            <View style={{ marginTop: 8, flex: 1, flexDirection: "row" }}>
              <RadioButton
                value="second"
                uncheckedColor="#ABB4BD"
                style={{ marginBottom: -5 }}
                status="unchecked"
                // onPress={() => setChecked("second")}
                // onPress={() => setShow(!isShow)}
              />
              {/* <Toast isShow={isShow} positionIndicator="bottom" color="warning">
                This is a bottom positioned toast
              </Toast> */}

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
                  Unavilable
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
                }}
              >
                Delivery:{" "}
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
                }}
              >
                Summary: {this.state.quantity}
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
                onPress={() => {
                  this.props.navigation.push("Success");
                }}
              >
                Check out
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
