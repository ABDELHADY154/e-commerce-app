import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import { Block, theme, Button as GaButton, Input } from "galio-framework";
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
import { Image } from "react-native-expo-image-cache";

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
            // source={{ uri: this.props.image }} //{require("../../../assets/images/image2.png")}
            {...{ preview: "", uri: this.props.image }}
            style={{
              height: "100%",
              width: scale(110),
              borderRadius: 5,
              marginBottom: 0,
            }}
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignSelf: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "65%",

                // alignItems: "center",

                // width: "68%",
                // justifyContent: "space-between",
                // width: "100%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginLeft: 20,
                  marginTop: 10,
                  flexWrap: "wrap",
                  // width: "50%",
                }}
              >
                {this.props.name}
              </Text>
              <Icon
                style={{
                  color: "white",
                  fontSize: 20,
                  marginTop: "40%",
                  alignSelf: "flex-end",
                  // marginLeft: 20,

                  // width: "50%",
                }}
                color="#EB2020"
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
                    backgroundColor: "#000",
                    borderRadius: 50,
                    height: 34,
                    width: 34,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  disabled={this.props.buttonDisable}
                  onPress={this.props.subButton}
                >
                  <AntDesign name="minus" size={20} color="#fff" />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    marginHorizontal: 8,
                  }}
                >
                  {this.props.quantity}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#000",
                    borderRadius: 50,
                    height: 34,
                    width: 34,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  disabled={this.props.buttonDisable}
                  onPress={this.props.addButton}
                >
                  <AntDesign name="plus" size={20} color="#fff" />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",

                    fontSize: 18,
                    marginLeft: 12,
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
