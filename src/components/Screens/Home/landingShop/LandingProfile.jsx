import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
  Platform,
  Alert,
} from "react-native";
import { Block, Text, theme, Button as GaButton } from "galio-framework";
import { Button } from "galio-framework";
import { Component } from "react";
import { axios } from "../../../../Config/Axios";
import { Avatar } from "react-native-elements";
import { ListItem } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class Profile extends Component {
  state = {
    name: "",
    email: "",
    image: "",
    pickedImage: "",
    orders: 0,
    addresses: 0,
  };

  render() {
    return (
      <>
        {/* <ScrollView> */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            // marginTop: "2%",

            alignItems: "center",
          }}
        >
          <Button
            round
            // uppercase
            style={{
              alignSelf: "center",
              marginTop: "15%",
            }}
            color="#28AE7B"
            size="large"
            // loading={this.state.loading}
            loadingSize="small"
            onPress={() => {
              this.props.navigation.navigate("SignIn");
            }}
          >
            Sign In
          </Button>
          <Button
            round
            // uppercase
            style={{
              alignSelf: "center",
              // borderWidth: 0,

              // marginTop: "15%",
            }}
            // color="#F83F2D"
            color="transparent"
            size="large"
            // loading={true}
            loadingSize="small"
            onPress={() => {
              this.props.navigation.navigate("SignUp");
            }}
          >
            Create New Account
          </Button>
        </View>
        {/* </ScrollView> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    width: "100%",
    height: 325,
    padding: 0,
    backgroundColor: "#2F7C6E",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profileBackground: {
    width: "100%",
    height: 120,
  },

  info: {
    marginTop: 30,
    // paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },

  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    justifyContent: "center",
    zIndex: 99,
    marginHorizontal: 5,
  },
});

export default Profile;
