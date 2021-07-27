import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Input } from "galio-framework";
import { Button } from "galio-framework";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../Config/Axios";

export default class SignIn extends Component {
  state = {
    emailInput: "",
    passwordInput: "",
    emailErr: "",
    passwordErr: "",
    userData: {},
  };
  async storeConfig(config) {
    try {
      const jsonValue = JSON.stringify(config);
      await AsyncStorage.setItem("config", jsonValue);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async storeToken(token) {
    try {
      await AsyncStorage.setItem("userToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // console.log(axios.defaults.headers.common);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  submit = () => {
    this.setState({
      emailErr: "",
      passwordErr: "",
    });
    var body = {
      email: this.state.emailInput,
      password: this.state.passwordInput,
    };

    axios
      .post("/clientLogin", body)
      .then(response => {
        this.setState({
          userData: response.data.response.data,
          emailErr: "",
          passwordErr: "",
        });
        let config = {
          headers: {
            Authorization: "Bearer " + this.state.userData.token,
          },
        };
        this.storeConfig(config);
        this.storeToken(this.state.userData.token);
        this.props.userLogin(this.state.emailInput, this.state.passwordInput);
      })

      .catch(error => {
        if (error.response.data.errors.email) {
          this.setState({
            emailErr: error.response.data.errors.email,
          });
        }
        if (error.response.data.errors.password) {
          this.setState({
            passwordErr: error.response.data.errors.password,
          });
        }
      });
  };

  render() {
    console.log(this.state);
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
              <Text style={styles.headerText}>Sign In</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <Input
                placeholder="Email"
                placeholderTextColor="#ABB4BD"
                type="email-address"
                bgColor="#2A2C36"
                color="#F5F5F5"
                rounded
                onChangeText={e => {
                  this.setState({ emailInput: e });
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <Input
                placeholder="Password"
                placeholderTextColor="#ABB4BD"
                bgColor="#2A2C36"
                color="#F5F5F5"
                rounded
                password
                viewPass
                iconColor="#f5f5f5f5"
                onChangeText={e => {
                  this.setState({ passwordInput: e });
                }}
              />
            </View>
            <Button
              round
              uppercase
              style={{
                alignSelf: "center",
                marginTop: "15%",
              }}
              color="#28AE7B"
              size="large"
              // loading={true}
              loadingSize="small"
              onPress={this.submit}
            >
              Sign In
            </Button>
            <Button
              round
              // uppercase
              style={{
                alignSelf: "center",
                // marginTop: "15%",
              }}
              color="#F83F2D"
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

          <View
            style={{
              // flex: 1,
              flexDirection: "column",
              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5%",
              // justifySelf: "flex-end",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                color: "#F5F5F5",
                marginBottom: "4%",
              }}
            >
              Or Sign In With Social Account
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                raised
                name="google"
                type="font-awesome"
                color="#EA4335"
                onPress={() => console.log("hello")}
              />
              <Icon
                raised
                name="facebook"
                type="font-awesome"
                color="#3B5998"
                onPress={() => console.log("hello")}
              />
            </View>
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
    // marginBottom: "10%",
  },
  headerText: {
    color: "#F6F6F6",
    fontSize: 34,
    alignSelf: "center",
  },
  inputContainer: {
    marginTop: "5%",
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
