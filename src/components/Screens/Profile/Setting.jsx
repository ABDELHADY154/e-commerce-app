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
import {
  Alert,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { CardEcomOne } from "react-native-card-ui";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "react-native-elements/dist/header/Header";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";

import { scale } from "react-native-size-matters";

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: "",
      nameBorder: "",
      nameErr: "",
      email: "",
      emailBorder: "",
      emailErr: "",
      phoneNumber: "",
      phoneNumberBorder: "",
      phoneNumberErr: "",
      loading: false,
      oldPassword: "",
      oldPasswordBorder: "",
      oldPasswordErr: "",
      newPassword: "",
      newPasswordBorder: "",
      newPasswordErr: "",
      confirmPassword: "",
      confirmPasswordBorder: "",
      confirmPasswordErr: "",
      edited: false,
    };
  }

  async componentDidMount() {
    await axios
      .get(`/clientProfile`)
      .then(res => {
        this.setState({
          name: res.data.response.data.name,
          email: res.data.response.data.email,
          phoneNumber: res.data.response.data.phone_number,
        });
      })
      .catch(err => {});
  }

  submit = async () => {
    this.setState({
      loading: true,
      nameErr: "",
      emailErr: "",
      phoneNumberErr: "",
    });
    var data = {
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phoneNumber,
    };
    await axios
      .put("/updateclientdata", data)
      .then(res => {
        this.setState({
          loading: false,
        });
        this.props.navigation.push("Home", { screen: "Profile" });
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.errors.email) {
            this.setState({
              emailErr: error.response.data.errors.email,
              emailBorder: "red",
              loading: false,
            });
          }
          // if (error.response.data.errors.password) {
          //   this.setState({
          //     passwordErr: error.response.data.errors.password,
          //     passwordBorder: "red",
          //     loading: false,
          //   });
          // }
          if (error.response.data.errors.name) {
            this.setState({
              nameErr: error.response.data.errors.name,
              nameBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.phone_number) {
            this.setState({
              phoneNumberErr: error.response.data.errors.phone_number,
              phoneNumberBorder: "red",
              loading: false,
            });
          }
        }
      });
  };
  updatePassword = async () => {
    this.setState({
      // loading: true,
      oldPasswordErr: "",
      newPasswordErr: "",
      confirmPasswordErr: "",
      oldPasswordBorder: "",
      newPasswordBorder: "",
    });
    var data = {
      old_password: this.state.oldPassword,
      password: this.state.newPassword,
      password_confirmation: this.state.confirmPassword,
    };
    await axios
      .put("/changePassword", data)
      .then(res => {
        this.setState({
          loading: false,
          visible: false,
        });
        this.props.navigation.push("Home", { screen: "Profile" });
      })
      .catch(error => {
        if (error.response) {
          // console.log(error.response.data.errors );

          if (error.response.data.errors.old_password) {
            this.setState({
              oldPasswordErr: "Current Password Is Required",
              oldPasswordBorder: "red",
              loading: false,
            });
          }

          if (error.response.data.errors.password) {
            this.setState({
              newPasswordErr: error.response.data.errors.password,
              newPasswordBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.status == 403) {
            this.setState({
              oldPasswordErr: "Password is not valid",
              oldPasswordBorder: "red",
              loading: false,
            });
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
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView>
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
                  Full Name
                </Text>
                <Input
                  placeholder="Full Name"
                  placeholderTextColor="#ABB4BD"
                  type="default"
                  bgColor="#2A2C36"
                  color="#F5F5F5"
                  value={this.state.name}
                  style={{ borderColor: this.state.nameBorder }}
                  rounded
                  onChangeText={value => {
                    this.setState({ name: value, edited: true });
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: "red",
                    alignSelf: "flex-start",
                  }}
                >
                  {this.state.nameErr}
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 20, color: "#F5F5F5", marginBottom: "2%" }}
                >
                  Email
                </Text>
                <Input
                  placeholder="Email"
                  placeholderTextColor="#ABB4BD"
                  type="email-address"
                  bgColor="#2A2C36"
                  color="#F5F5F5"
                  style={{ borderColor: this.state.emailBorder }}
                  rounded
                  onChangeText={value => {
                    this.setState({ email: value, edited: true });
                  }}
                  value={this.state.email}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: "red",
                    alignSelf: "flex-start",
                  }}
                >
                  {this.state.emailErr}
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 20, color: "#F5F5F5", marginBottom: "2%" }}
                >
                  Phone Number
                </Text>
                <Input
                  placeholder="Phone Number"
                  placeholderTextColor="#ABB4BD"
                  type="phone-pad"
                  bgColor="#2A2C36"
                  color="#F5F5F5"
                  style={{ borderColor: this.state.phoneNumberBorder }}
                  rounded
                  onChangeText={value => {
                    this.setState({ phoneNumber: value, edited: true });
                  }}
                  value={this.state.phoneNumber}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: "red",
                    alignSelf: "flex-start",
                  }}
                >
                  {this.state.phoneNumberErr}
                </Text>
              </View>
              {this.state.edited == false ? (
                <Button
                  round
                  style={{
                    alignSelf: "center",

                    marginBottom: "5%",
                  }}
                  color="#28AE7B"
                  size="large"
                  loading={this.state.loading}
                  loadingSize="small"
                >
                  Update
                </Button>
              ) : (
                <Button
                  round
                  style={{
                    alignSelf: "center",
                    marginBottom: "5%",
                  }}
                  color="#28AE7B"
                  size="large"
                  loading={this.state.loading}
                  loadingSize="small"
                  onPress={this.submit}
                >
                  Update
                </Button>
              )}

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: scale(10),
                }}
              >
                <Text style={{ color: "#fff", fontSize: 25 }}>
                  Change Password
                </Text>
              </View>
              <View>
                <Input
                  placeholder="Current Password"
                  placeholderTextColor="#ABB4BD"
                  type="visible-password"
                  bgColor="#2A2C36"
                  color="#F5F5F5"
                  style={{ borderColor: this.state.oldPasswordBorder }}
                  rounded
                  password
                  viewPass
                  onChangeText={value => {
                    this.setState({ oldPassword: value });
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: "red",
                    alignSelf: "flex-start",
                  }}
                >
                  {this.state.oldPasswordErr}
                </Text>
                {/* <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              ></View> */}
                <Input
                  placeholder="New Password"
                  placeholderTextColor="#ABB4BD"
                  type="visible-password"
                  bgColor="#2A2C36"
                  color="#F5F5F5"
                  password
                  viewPass
                  style={{ borderColor: this.state.newPasswordBorder }}
                  rounded
                  onChangeText={value => {
                    this.setState({ newPassword: value });
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: "red",
                    alignSelf: "flex-start",
                  }}
                >
                  {this.state.newPasswordErr}
                </Text>
                <Input
                  placeholder="Repeat New Password"
                  placeholderTextColor="#ABB4BD"
                  type="visible-password"
                  bgColor="#2A2C36"
                  color="#F5F5F5"
                  style={{ borderColor: this.state.confirmPasswordBorder }}
                  rounded
                  password
                  viewPass
                  onChangeText={value => {
                    this.setState({ confirmPassword: value });
                  }}
                />
              </View>
              {/* <Text
              style={{ fontSize: 15, color: "red", alignSelf: "flex-start" }}
            >
              {this.state.confirmPasswordErr}
            </Text> */}
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
                  onPress={this.updatePassword}
                  round
                >
                  Save Password
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {/* <Modal
          visible={this.state.visible}
          onTouchOutside={() => this.setState({ visible: false })}
          height={scale(300)}
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
          > */}

        {/* </ModalContent>
        </Modal> */}
      </>
    );
  }
}
