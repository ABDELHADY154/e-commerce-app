import { Button, Input } from "galio-framework";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import {
  Modal,
  SlideAnimation,
  ModalContent,
  BottomModal,
  ModalTitle,
} from "react-native-modals";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../../Config/Axios";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { Alert, View, TouchableOpacity } from "react-native";
import { CardEcomOne } from "react-native-card-ui";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "react-native-elements/dist/header/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DeliveredTab from "./Delivered";
import ProcessingTab from "./Processing";
import OrderedTab from "./Ordered";
import { useNavigation, useRoute } from "@react-navigation/native";
import { scale } from "react-native-size-matters";

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

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
            text: "Settings",
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
        <View style={{ marginHorizontal: 20 }}>
          {/* <Text
            style={{ fontSize: scale(26), color: "#fff", marginBottom: "2%" }}
          >
            Settings
          </Text> */}
          {/* <Text style={{ fontSize: scale(16), color: "#fff", marginTop: 10 }}>
            Personal Information
          </Text> */}

          <View>
            <Text
              style={{ fontSize: 20, color: "#F5F5F5", marginBottom: "2%" }}
            >
              Personal Information
            </Text>
            <Input
              placeholder="Full Name"
              placeholderTextColor="#ABB4BD"
              type="email-address"
              bgColor="#2A2C36"
              color="#F5F5F5"
              // style={{ borderColor: this.state.emailBorder }}
              rounded
              // onChangeText={value => {
              //   this.setState({ email: value });
              // }}
            />
            <Text
              style={{ fontSize: 15, color: "red", alignSelf: "flex-start" }}
            >
              {/* {this.state.emailErr}email */}
            </Text>
            <Input
              placeholder="Date Of Birth"
              placeholderTextColor="#ABB4BD"
              type="email-address"
              bgColor="#2A2C36"
              color="#F5F5F5"
              // style={{ borderColor: this.state.emailBorder }}
              rounded
              // onChangeText={value => {
              //   this.setState({ email: value });
              // }}
            />
            <Text
              style={{ fontSize: 15, color: "red", alignSelf: "flex-start" }}
            >
              {/* {this.state.emailErr}email */}
            </Text>
          </View>

          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontSize: 20, color: "#F5F5F5", marginBottom: "2%" }}
              >
                Password
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ visible: true });
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "#F5F5F5", marginBottom: "2%" }}
                >
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <Input
              placeholder="Password"
              placeholderTextColor="#ABB4BD"
              type="email-address"
              bgColor="#2A2C36"
              color="#F5F5F5"
              // style={{ borderColor: this.state.emailBorder }}
              rounded
              // onChangeText={value => {
              //   this.setState({ email: value });
              // }}
            />
            <Text
              style={{ fontSize: 15, color: "red", alignSelf: "flex-start" }}
            >
              {/* {this.state.emailErr}email */}
            </Text>
          </View>
        </View>

        <BottomModal
          visible={this.state.visible}
          onTouchOutside={() => this.setState({ visible: false })}
          height={scale(400)}
          width={1}
          onSwipeOut={() => this.setState({ visible: false })}
          // modalTitle={<ModalTitle title="Bottom Modal" hasTitleBar />}
        >
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: "#1E1F28",
              // flexDirection: "row",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: scale(10),
              }}
            >
              <Text style={{ color: "#fff", fontSize: 25 }}>
                Password Change
              </Text>
            </View>
            <View>
              <Input
                placeholder="Current Password"
                placeholderTextColor="#ABB4BD"
                type="email-address"
                bgColor="#2A2C36"
                color="#F5F5F5"
                // style={{ borderColor: this.state.emailBorder }}
                rounded
                // onChangeText={value => {
                //   this.setState({ email: value });
                // }}
              />
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                {/* <Text
                style={{ fontSize: 20, color: "#F5F5F5", marginBottom: "2%" }}
              >
                Password
              </Text> */}
                <TouchableOpacity
                  style={{ marginBottom: "4%", marginTop: "4%" }}
                  onPress={() => {
                    this.setState({ visible: true });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#F5F5F5",
                    }}
                  >
                    Foeget Password
                  </Text>
                </TouchableOpacity>
              </View>
              <Input
                placeholder="New Password"
                placeholderTextColor="#ABB4BD"
                type="email-address"
                bgColor="#2A2C36"
                color="#F5F5F5"
                // style={{ borderColor: this.state.emailBorder }}
                rounded
                // onChangeText={value => {
                //   this.setState({ email: value });
                // }}
              />
              <Input
                placeholder="Repeat New Password"
                placeholderTextColor="#ABB4BD"
                type="email-address"
                bgColor="#2A2C36"
                color="#F5F5F5"
                // style={{ borderColor: this.state.emailBorder }}
                rounded
                // onChangeText={value => {
                //   this.setState({ email: value });
                // }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: scale(10),
              }}
            >
              <Button
                color="#28AE7B"
                style={{ width: "90%" }}
                size="large"
                onPress={this.addToCartAlert}
                round
              >
                Save Password
              </Button>
            </View>
          </ModalContent>
        </BottomModal>
      </>
    );
  }
}
