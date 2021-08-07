import { Button } from "galio-framework";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        <Button
          onPress={() => {
            this.props.logout();
          }}
          color="red"
        >
          Logout
        </Button>
      </SafeAreaView>
    );
  }
}
