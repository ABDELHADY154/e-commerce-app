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
class Success extends Component {
  state = {
    addresses: [],
    // refresh: true,
    products: [],
    quantity: 0,
    total_price: 0,
  };

  async componentDidMount() {
    console.log(this.props.route.params.refresh);
    await axios
      .get("/clientAddress")
      .then((res) => {
        this.setState({
          addresses: res.data.response.data.addresses,
          refresh: false,
        });
      })
      .get("cart")
      .then((res) => {
        // console.log(res.data.response.data);
        this.setState({
          products: res.data.response.data.products,
          quantity: res.data.response.data.quantity,
          total_price: res.data.response.data.total_price,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        {/* <ScrollView> */}

        {/* <ScrollView
          contentContainerStyle={
            {
              // height: "70%",
              // width: "97%",
              // alignSelf: "center",
              // justifyContent: "center",
              // flexDirection: "column",
              // alignItems: "center",
            }
          }
          showsVerticalScrollIndicator={false}
        > */}
        <View
          style={{
            // flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/Success.png")}
            style={{
              height: 300,
              width: 300,
              // marginRight: "24%",
              // marginBottom: -100,
            }}
          />
          <View
            style={{
              marginTop: "10%",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 35,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Success!
            </Text>
            <Text style={{ color: "#fff", fontSize: 16, marginBottom: 5 }}>
              Your order will be delivered soon.
            </Text>
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Thank you for choosing our app!
            </Text>
          </View>
        </View>
        {/* </ScrollView> */}

        <KeyboardAvoidingView
          // style={styles.container}
          behavior="padding"
        >
          <View style={{ alignItems: "center", marginBottom: scale(15) }}>
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
                  this.props.navigation.push("Home");
                }}
              >
                CONTINUE SHOPPING
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {/* </ScrollView> */}
      </>
    );
  }
}

export default Success;
