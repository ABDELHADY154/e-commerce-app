import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Input } from "galio-framework";
import { Button, Icon } from "galio-framework";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../Config/Axios";
export default class SignUp extends Component {
  state = {
    emailBorder: "",
    name: "",
    email: "",
    emailErr: "",
    loading: false,
  };

  async storeEmail(email) {
    try {
      await AsyncStorage.setItem("userEmail", email);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // console.log(axios.defaults.headers.common);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  submit = () => {
    this.setState({
      emailErr: "",
      loading: true,
      emailBorder: "",
    });
    var body = {
      email: this.state.email,
    };

    axios
      .post("/resetPass", body)
      .then(response => {
        this.setState({
          emailErr: "",
          loading: false,
        });
        this.storeToken(this.state.email);
      })
      .catch(error => {
        // console.log(error.response.data);
        if (error.response) {
          if (error.response.data.errors.email) {
            this.setState({
              emailErr: error.response.data.errors.email,
              emailBorder: "red",
              loading: false,
            });
          }
        }
      });
  };
  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#1E1F28",
          flex: 1,
        }}
      >
        <View
          style={{
            width: "90%",
            flex: 1,
            alignSelf: "center",
            marginTop: "10%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Forget </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <Input
                placeholder="Email"
                placeholderTextColor="#ABB4BD"
                type="email-address"
                bgColor="#2A2C36"
                color="#F5F5F5"
                style={{ borderColor: this.state.emailBorder }}
                rounded
                onChangeText={value => {
                  this.setState({ email: value });
                }}
              />
              <Text
                style={{ fontSize: 15, color: "red", alignSelf: "flex-start" }}
              >
                {this.state.emailErr}
              </Text>
            </View>

            <Button
              round
              uppercase
              style={{
                alignSelf: "center",
              }}
              color="#28AE7B"
              size="large"
              loading={this.state.loading}
              loadingSize="small"
              onPress={this.submit}
            >
              Send
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: "10%",
  },
  headerText: {
    color: "#F6F6F6",
    fontSize: 34,
    alignSelf: "flex-start",
  },
  inputContainer: {
    // marginTop: "5%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  inputLabel: {
    fontSize: 20,
    color: "#F5F5F5",
    marginBottom: "2%",
  },
});
