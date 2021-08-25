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
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class Bag extends Component {
  state = {};

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
            text: "My Bag",
            style: { color: "#fff", fontSize: scale(20) },
          }}
          rightComponent={{
            icon: "search",
            color: "#fff",
            size: scale(30),
            onPress: () => {
              this.props.navigation.goBack();
            },
          }}
        />

        <ScrollView>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <View
              style={{
                backgroundColor: "#1E1F28",
                width: "95%",
                height: 130,
                borderRadius: 5,
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../../../assets/images/image2.png")}
                style={{
                  height: 130,
                  width: 120,
                  borderRadius: 5,
                  marginBottom: 0,
                }}
              />
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                >
                  T-Shirt
                </Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#ABB4BD",
                      fontSize: 15,
                      marginLeft: 20,
                      marginTop: 10,
                    }}
                  >
                    Size
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                      marginLeft: 20,
                      marginTop: 10,
                    }}
                  >
                    L
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginLeft: 20,
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
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
                    >
                      <AntDesign name="minus" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        marginHorizontal: 20,
                      }}
                    >
                      1
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
                    >
                      <AntDesign name="plus" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      alignSelf: "flex-end",
                      alignContent: "flex-end",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>50$</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 30, width: "95%" }}>
              <Input
                placeholder="Enter Your Promo Code"
                placeholderTextColor="#ABB4BD"
                right
                icon="chevron-right"
                family="Entypo"
                iconSize={26}
                iconColor="#ABB4BD"
                style={{ backgroundColor: "#1E1F28", borderWidth: 0 }}
              />
              {/* <TouchableOpacity
                style={{
                  backgroundColor: "#ABB4BD",
                  borderRadius: 50,
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </TouchableOpacity> */}
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  color: "#ABB4BD",
                  fontSize: 18,
                  marginLeft: 20,
                  marginTop: 10,
                  textAlign: "left",
                  // alignItems: "flex-start",
                  // alignSelf: "flex-start",
                  // alignContent: "flex-start",
                  // justifyContent: "flex-start",
                }}
              >
                Total amount
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 19,
                  // marginLeft: 20,
                  marginTop: 10,
                  textAlign: "right",
                  // alignItems: "flex-end",
                  // alignSelf: "flex-end",
                  // alignContent: "flex-end",
                  // justifyContent: "flex-end",
                }}
              >
                150
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
              >
                Check out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default Bag;
