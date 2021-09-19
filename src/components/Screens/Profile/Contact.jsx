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
  Linking,
} from "react-native";
import { CardEcomOne } from "react-native-card-ui";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "react-native-elements/dist/header/Header";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      message: "",
      messageBorder: "",
      messageErr: "",

      edited: false,
    };
  }

  submit = async () => {
    this.setState({
      loading: true,
      visible: false,
      message: "",
      messageBorder: "",
      messageErr: "",

      edited: false,
    });
    var data = {
      message: this.state.message,
    };
    await axios
      .post("/message", data)
      .then(res => {
        this.setState({
          loading: false,
        });
        Alert.alert(
          "Contact Us",
          "Your message has been sent successfully",
          [
            {
              text: "Go Back",
              onPress: () => this.props.navigation.goBack(),
              style: "cancel",
            },
            {
              text: "Ok",
            },
          ],
          { cancelable: false },
        );
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.errors.message) {
            this.setState({
              messageErr: error.response.data.errors.message,
              messageBorder: "red",
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
            text: "Contact Us",
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
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ marginHorizontal: 20 }}>
              <View>
                <Text
                  style={{ fontSize: 20, color: "#F5F5F5", marginBottom: "2%" }}
                >
                  Write your message
                </Text>
                <Input
                  numberOfLines={10}
                  multiline={true}
                  placeholder="Write your message"
                  placeholderTextColor="#ABB4BD"
                  // placeholderTextSize={20}
                  fontSize={18}
                  // marginTop={-50}
                  type="default"
                  bgColor="#2A2C36"
                  color="#F5F5F5"
                  value={this.state.message}
                  style={{
                    borderColor: this.state.messageBorder,
                    height: 100,
                    // fontSize: 20,
                  }}
                  rounded
                  onChangeText={value => {
                    this.setState({ message: value, edited: true });
                  }}
                />
                <Text
                  style={{
                    // fontSize: 20,
                    color: "red",
                    alignSelf: "flex-start",
                  }}
                >
                  {this.state.messageErr}
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
                  Send
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
                  Send
                </Button>
              )}

              <View
                style={{
                  // justifyContent: "center",
                  // alignItems: "center",
                  marginBottom: scale(10),
                }}
              >
                <Text style={{ color: "#fff", fontSize: 18 }}>
                  Contact us through social media
                </Text>
                <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
                  <AntDesign
                    name="facebook-square"
                    size={40}
                    color="#28AE7B"
                    style={{ marginRight: 20 }}
                    onPress={() => {
                      Linking.openURL("https://www.facebook.com/beamstoreapp/");
                    }}
                  />
                  <AntDesign
                    name="instagram"
                    size={40}
                    color="#28AE7B"
                    onPress={() => {
                      Linking.openURL(
                        "https://www.instagram.com/beamstoreapp/",
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}
