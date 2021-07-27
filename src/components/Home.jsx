import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "galio-framework";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Home extends Component {
  async storeToken() {
    try {
      await AsyncStorage.removeItem("userToken");
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // console.log(axios.defaults.headers.common);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  render() {
    return (
      <View>
        <Button
          onPress={() => {
            this.storeToken();
            this.props.logout();
          }}
        >
          Logout
        </Button>
      </View>
    );
  }
}
