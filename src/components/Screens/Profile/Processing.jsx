import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
  Platform,
  Text,
} from "react-native";
import { Block, theme, Button as GaButton } from "galio-framework";
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
class Profile extends Component {
  state = {
    refresh: false,
    orders: [],
  };
  async componentDidMount() {
    await axios
      .get("/statusProcessed")
      .then(res => {
        this.setState({
          orders: res.data.response.data,
        });
      })
      .catch(err => {});
    this.focusListener = this.props.navigation.addListener("focus", () => {
      axios
        .get("/statusProcessed")
        .then(res => {
          this.setState({
            orders: res.data.response.data,
          });
        })
        .catch(err => {});
      //Put your Data loading function here instead of my this.loadData()
    });
  }
  onRefresh = async () => {
    this.setState({
      refresh: true,
    });

    await axios
      .get("/statusProcessed")
      .then(res => {
        this.setState({
          orders: res.data.response.data,
          refresh: false,
        });
      })
      .catch(err => {});
  };
  render() {
    return (
      <>
        {/* <SafeAreaView> */}
        <ScrollView
          style={{ flex: 1, marginBottom: scale(30) }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              tintColor="white"
            />
          }
        >
          <View style={{ justifyContent: "flex-start", marginTop: "2%" }}>
            {this.state.orders.map(e => {
              return (
                <Card
                  key={e.id}
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
                        Order No. {e.order_num}
                      </Title>
                      <Text style={{ color: "#ABB4BD", fontSize: 16 }}>
                        {e.created_at}
                      </Text>
                    </View>
                    <View
                      style={{
                        color: "#ABB4BD",

                        flexDirection: "column",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#ABB4BD", fontSize: 16 }}>
                          Quantity:{"  "}
                        </Text>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                          {e.quantity}
                        </Text>
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
                          {e.total_price} EGP
                        </Text>
                      </View>
                    </View>
                  </Card.Content>

                  <Card.Actions>
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
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
                        }}
                        onPress={() => {
                          this.props.navigation.push("OrderDetailes", {
                            id: e.id,
                          });
                        }}
                      >
                        Detalis
                      </Button>
                      <Text
                        style={{
                          color: "#2AA952",
                          fontSize: 16,
                          justifyContent: "flex-end",
                          marginRight: "3%",
                        }}
                      >
                        {e.status}
                      </Text>
                    </View>
                  </Card.Actions>
                </Card>
              );
            })}
          </View>
        </ScrollView>
        {/* </SafeAreaView> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    width: "100%",
    height: 350,
    padding: 0,
    backgroundColor: "#2F7C6E",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profileBackground: {
    width: "100%",
    height: 120,
  },

  info: {
    marginTop: 30,
    // paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },

  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    justifyContent: "center",
    zIndex: 99,
    marginHorizontal: 5,
  },
});

export default Profile;
