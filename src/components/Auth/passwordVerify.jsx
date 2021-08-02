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
import { Modal, Portal, Provider } from "react-native-paper";

export default class SignUp extends Component {
  state = {
    emailBorder: "",
    name: "",
    email: "",
    emailErr: "",
    token: "",
    visible: false,
    // token
    loading: false,
  };

  async UNSAFE_componentWillMount() {
    let email = await AsyncStorage.getItem("userEmail");
    this.setState({
      email: email,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
    this.props.verified();
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  submit = () => {
    this.setState({
      emailErr: "",
      loading: true,
      emailBorder: "",
    });
    var body = {
      email: this.state.email,
      token: this.state.token,
    };

    axios
      .post("/resetVerify", body)
      .then(response => {
        this.setState({
          emailErr: "",
          loading: false,
        });
        this.showModal();
        // this.storeToken(this.state.email);
      })
      .catch(error => {
        // console.log(error.response.data);
        if (error.response) {
          console.log(error.response.data.errors);
          if (error.response.data.errors.token) {
            this.setState({
              emailErr: "The Verification Code Is Required",
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
              <Text style={styles.headerText}>Verify Your Email</Text>
              <Text style={styles.headerText2}>
                A verification Code Has been sent to {this.state.email}
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Enter Your Verification Code
              </Text>
              <Input
                placeholder="Code"
                placeholderTextColor="#ABB4BD"
                type="email-address"
                bgColor="#2A2C36"
                color="#F5F5F5"
                style={{ borderColor: this.state.emailBorder }}
                rounded
                onChangeText={value => {
                  this.setState({ token: value });
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
              Verify
            </Button>
          </View>
        </View>
        <Provider>
          <Portal>
            <Modal
              visible={this.state.visible}
              onDismiss={this.hideModal}
              contentContainerStyle={{
                backgroundColor: "#F6F6F6",
                padding: 20,
                height: "30%",
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                A new password has been sent to your email
              </Text>
            </Modal>
          </Portal>
          {/* <Button style={{ marginTop: 30 }} onPress={this.showModal}>
              Show
            </Button> */}
        </Provider>
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
  headerText2: {
    color: "#F6F6F6",
    fontSize: 20,
    marginTop: "3%",
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
