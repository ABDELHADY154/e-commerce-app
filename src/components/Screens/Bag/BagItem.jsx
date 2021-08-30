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
import { Block, Text, theme, Button as GaButton, Input } from "galio-framework";
import { Component } from "react";
import { axios } from "../../../Config/Axios";
import { Header } from "react-native-elements/dist/header/Header";
import { scale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
// import { Button, Menu, Divider, Provider, TextInput } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Icon } from "react-native-elements/dist/icons/Icon";
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class Bag extends Component {
  state = {};

  async componentDidMount() {}

  render() {
    return (
      <>
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
            source={{ uri: this.props.image }} //{require("../../../assets/images/image2.png")}
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
                {this.props.name}
              </Text>
              <Icon
                style={{
                  color: "white",
                  fontSize: 20,
                  marginLeft: 20,
                  marginTop: 10,
                  // width: "50%",
                }}
                color="red"
                name="delete"
                onPress={this.props.deleteOnPress}
              />
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
                {this.props.size.size}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: 20,
                marginBottom: 15,

                // justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  // flex: 1,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2A2C36",
                    borderRadius: 50,
                    height: 40,
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  disabled={this.props.buttonDisable}
                  onPress={this.props.subButton}
                >
                  <AntDesign name="minus" size={24} color="#fff" />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    // marginHorizontal: 0,
                  }}
                >
                  {this.props.quantity}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2A2C36",
                    borderRadius: 50,
                    height: 40,
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  disabled={this.props.buttonDisable}
                  onPress={this.props.addButton}
                >
                  <AntDesign name="plus" size={24} color="#fff" />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    width: "50%",
                    fontSize: 20,
                    marginLeft: 10,

                    // marginTop: 10,
                  }}
                >
                  {this.props.price
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                  EGP
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default Bag;
