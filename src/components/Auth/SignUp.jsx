import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Input } from "galio-framework";
import { Button } from "galio-framework";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../Config/Axios";
export default class SignUp extends Component {
  state = {
    nameBorder: "",
    emailBorder: "",
    passwordBorder: "",
    name: "",
    email: "",
    password: "",
    nameErr: "",
    emailErr: "",
    passwordErr: "",
    userData: {},
    loading: false,
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
      nameErr: "",
      loading: true,
      passwordBorder: "",
      emailBorder: "",
      nameBorder: "",
    });
    var body = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/clientRegister", body)
      .then(response => {
        this.setState({
          userData: response.data.response.data,
          emailErr: "",
          passwordErr: "",
          nameErr: "",
          loading: false,
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
        console.log(error.response);
        // if (error.response) {
        //   if (error.response.data.errors.email) {
        //     this.setState({
        //       emailErr: error.response.data.errors.email,
        //       emailBorder: "red",
        //       loading: false,
        //     });
        //   }
        //   if (error.response.data.errors.password) {
        //     this.setState({
        //       passwordErr: error.response.data.errors.password,
        //       passwordBorder: "red",
        //       loading: false,
        //     });
        //   }
        //   if (error.response.data.errors.name) {
        //     this.setState({
        //       nameErr: error.response.data.errors.name,
        //       nameBorder: "red",
        //       loading: false,
        //     });
        //   }
        // }
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
              <Text style={styles.headerText}>Sign Up</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <Input
                placeholder="Name"
                placeholderTextColor="#ABB4BD"
                bgColor="#2A2C36"
                color="#F5F5F5"
                style={{ borderColor: this.state.nameBorder }}
                rounded
                onChangeText={value => {
                  this.setState({ name: value });
                }}
              />
              <Text
                style={{ fontSize: 15, color: "red", alignSelf: "flex-start" }}
              >
                {this.state.nameErr}
              </Text>
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
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <Input
                placeholder="Password"
                placeholderTextColor="#ABB4BD"
                bgColor="#2A2C36"
                color="#F5F5F5"
                rounded
                password
                style={{ borderColor: this.state.passwordBorder }}
                viewPass
                iconColor="#f5f5f5f5"
                onChangeText={value => {
                  this.setState({ password: value });
                }}
              />
              <Text
                style={{ fontSize: 15, color: "red", alignSelf: "flex-start" }}
              >
                {this.state.passwordErr}
              </Text>
            </View>
            <Button
              round
              // uppercase
              style={{
                alignSelf: "center",
                marginTop: "15%",
              }}
              color="#28AE7B"
              size="large"
              loading={this.state.loading}
              loadingSize="small"
              onPress={this.submit}
            >
              Sign Up
            </Button>
            <Button
              round
              style={{
                alignSelf: "center",
                // marginTop: "15%",
              }}
              color="transparent"
              size="large"
              // loading={true}
              loadingSize="small"
              onPress={() => {
                this.props.navigation.navigate("SignIn");
              }}
            >
              Already Have an account
            </Button>
          </View>

          {/* <View
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
              Or Sign Up With Social Account
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
          </View> */}
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
