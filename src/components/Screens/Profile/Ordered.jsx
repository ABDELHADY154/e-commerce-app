import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
  Platform,
} from "react-native";
import { Block, Text, theme, Button as GaButton } from "galio-framework";
import { Button } from "galio-framework";
import { Component } from "react";
import { axios } from "../../../Config/Axios";
import { ListItem } from "react-native-elements";
// import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native";
import { Header } from "react-native-elements/dist/header/Header";
import { scale } from "react-native-size-matters";
import { RefreshControl } from "react-native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { Checkbox } from "galio-framework";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class Ordered extends Component {
  state = {};

  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={{ height: "100%" }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={this.onRefresh}
                tintColor="white"
              />
            }
          >
            <View style={{ justifyContent: "flex-start", marginTop: "2%" }}>
              <Card
                // key={e.id}
                style={{
                  width: "96%",
                  alignSelf: "center",
                  backgroundColor: "#2A2C36",
                  marginTop: "3%",
                }}
              >
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Title style={{ color: "#fff", fontSize: 16 }}>
                      Order No.
                    </Title>
                    <Text style={{ color: "#ABB4BD", fontSize: 16 }}>
                      05-6-2021
                    </Text>
                  </View>
                  <View
                    style={{
                      color: "#ABB4BD",
                      // fontSize: 16,
                      // lineHeight: 25,
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        // justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#ABB4BD", fontSize: 16 }}>
                        Quantity:{"  "}
                      </Text>
                      <Text style={{ color: "#fff", fontSize: 16 }}>3</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        // justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#ABB4BD", fontSize: 16 }}>
                        Total Amount:{"  "}
                      </Text>
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        300EGP
                      </Text>
                    </View>
                  </View>
                </Card.Content>

                <Card.Actions style={{}}>
                  <View
                    style={{
                      flexDirection: "row",
                      // flex: 1,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      iconSize={25}
                      color="#EB2020"
                      style={{
                        width: 100,
                        height: 40,
                        borderWidth: 1,
                        borderRadius: 18,
                        backgroundColor: "transparent",
                        borderColor: "#fff",
                        // justifyContent: "flex-start",
                      }}
                      onPress={() => {
                        this.props.navigation.push("OrderDetailes");
                      }}
                    >
                      Detalis
                    </Button>
                    <Text
                      style={{
                        color: "#2AA952",
                        fontSize: 16,
                        // justifyContent: "flex-end",
                      }}
                    >
                      Delivered
                    </Text>
                    {/* <Text
                      style={{
                        color: "#EB2020",
                        fontSize: 16,
                        // justifyContent: "flex-end",
                      }}
                    >
                      Cancelled
                    </Text> */}
                  </View>
                </Card.Actions>
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default Ordered;
