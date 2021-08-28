import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Input } from "galio-framework";
import { Button } from "galio-framework";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../../Config/Axios";
import { Header } from "react-native-elements/dist/header/Header";
import { scale } from "react-native-size-matters";
import DropDownPicker from "react-native-dropdown-picker";

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
    citiesList: [
      { label: "Alexandria", value: "Alexandria" },
      { label: "Cairo", value: "Cairo" },
    ],
    city: "",
    cityErr: "",
    open: false,
  };

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
        // console.log(error.response.data);
        if (error.response) {
          if (error.response.data.errors.email) {
            this.setState({
              emailErr: error.response.data.errors.email,
              emailBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.password) {
            this.setState({
              passwordErr: error.response.data.errors.password,
              passwordBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.name) {
            this.setState({
              nameErr: error.response.data.errors.name,
              nameBorder: "red",
              loading: false,
            });
          }
        }
      });
  };

  render() {
    // "building_no": 1,
    // "floor": 2,
    // "appartment_no": 200,
    // "region":"roushdy",
    // "default": true
    console.log(this.state.city);
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
            text: "Shipping Addresses",
            style: { color: "#fff", fontSize: scale(20) },
          }}
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            size: scale(30),
            onPress: () => {
              this.props.navigation.goBack();
            },
          }}
        />
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
                  style={{
                    fontSize: 15,
                    color: "red",
                    alignSelf: "flex-start",
                  }}
                >
                  {this.state.nameErr}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Region</Text>
                <Input
                  placeholder="Region"
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
                  style={{
                    fontSize: 15,
                    color: "red",
                    alignSelf: "flex-start",
                  }}
                >
                  {this.state.nameErr}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Street Name</Text>
                <Input
                  placeholder="Street Name"
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
                  style={{
                    fontSize: 15,
                    color: "red",
                    alignSelf: "flex-start",
                  }}
                >
                  {this.state.nameErr}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>City</Text>
                {/* <DropDownPicker
                  open={this.state.open}
                  value={this.state.city}
                  items={this.state.citiesList}
                  setOpen={this.setOpen}
                  setValue={this.setValue}
                  style={{
                    backgroundColor: "#2A2C36",
                    borderRadius: 50,
                    borderWidth: 0,
                  }}
                  textStyle={{
                    color: this.state.open ? "#000" : "#F5F5F5",
                  }}
                  containerStyle={{
                    backgroundColor: "#2A2C36",
                    borderRadius: 50,
                    borderWidth: 0,
                  }}

                  // onChangeValue={value => {
                  //   this.setState({ open: false });
                  // }}
                  // setItems={setItems}
                /> */}

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
      </>
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
