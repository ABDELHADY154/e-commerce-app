import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Input } from "galio-framework";
import { Button } from "galio-framework";
import { Icon } from "react-native-elements";

export default class SignUp extends Component {
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
                // style={{ borderColor: "red" }}
                rounded
              />
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
            >
              Sign Up
            </Button>
            <Button
              round
              style={{
                alignSelf: "center",
                // marginTop: "15%",
              }}
              color="#F83F2D"
              size="large"
              // loading={true}
              loadingSize="small"
            >
              Already Have an account
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
