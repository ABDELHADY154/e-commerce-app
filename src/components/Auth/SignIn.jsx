import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Input, Block } from "galio-framework";

export default class SignIn extends Component {
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
            alignSelf: "center",
            marginTop: "10%",
            flexDirection: "column",
          }}
        >
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
  },
  headerText: {
    color: "#F6F6F6",
    fontSize: 34,
  },
  inputContainer: {
    marginTop: "10%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  inputLabel: {
    fontSize: 24,
    color: "#F5F5F5",
    marginBottom: "2%",
  },
});
