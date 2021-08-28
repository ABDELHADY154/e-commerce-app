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
import * as ImagePicker from "expo-image-picker";
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
    addresses: [],
    refresh: true,
  };

  async componentDidMount() {
    await axios
      .get("/clientAddress")
      .then(res => {
        this.setState({
          addresses: res.data.response.data.addresses,
          refresh: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
    // }
  }

  onRefresh = async () => {
    this.setState({
      refresh: true,
    });
    await axios
      .get("/clientAddress")
      .then(res => {
        this.setState({
          addresses: res.data.response.data.addresses,
          refresh: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
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
          rightComponent={{
            icon: "add",
            color: "#fff",
            size: scale(30),
            onPress: () => {
              this.props.navigation.push("createAddress");
            },
          }}
        />
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
            <View
              style={{ flex: 1, justifyContent: "flex-start", marginTop: "2%" }}
            >
              {this.state.addresses.length != 0 ? (
                this.state.addresses.map(e => {
                  return (
                    <Card
                      key={e.id}
                      style={{
                        width: "96%",
                        alignSelf: "center",
                        backgroundColor: "#2A2C36",
                      }}
                    >
                      <Card.Content>
                        <Title style={{ color: "#fff" }}>{e.name}</Title>
                        <Paragraph style={{ color: "#fff" }}>
                          {e.city}, {e.region}, {e.street_name}, {e.building_no}
                          , {e.floor} floor, Appartment Number {e.appartment_no}
                        </Paragraph>
                      </Card.Content>

                      <Card.Actions style={{ justifyContent: "space-between" }}>
                        <View>
                          <Checkbox
                            color="white"
                            checkboxStyle={{ marginLeft: scale(5) }}
                            iconFamily="font-awesome"
                            iconName="check"
                            iconColor="#2A2C36"
                            initialValue={e.default == true ? true : false}
                            label="Use as the shipping address"
                            labelStyle={{ color: "#fff" }}
                          />
                        </View>

                        <View style={{ flexDirection: "row" }}>
                          <Button
                            onlyIcon
                            icon="edit"
                            iconFamily="fontawsome"
                            iconSize={30}
                            color="#28AE7B"
                            iconColor="#fff"
                            style={{ width: 40, height: 40 }}
                          >
                            warning
                          </Button>

                          <Button
                            onlyIcon
                            icon="delete"
                            iconFamily="antdesign"
                            iconSize={30}
                            color="red"
                            iconColor="#fff"
                            style={{ width: 40, height: 40 }}
                          >
                            warning
                          </Button>
                        </View>
                      </Card.Actions>
                    </Card>
                  );
                })
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white" }} size={30}>
                    {"No Resluts !"}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
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
// <ListItem
//   bottomDivider
//   key={e.id}
//   containerStyle={{ backgroundColor: "transparent" }}
//   onPress={() => {
//     this.props.navigation.push("products", {
//       name: this.props.route.params.name,
//       id: this.props.route.params.id,
//       catId: e.id,
//     });
//   }}
// >
//   <ListItem.Content>
//     <ListItem.Title>
//       <Text style={{ color: "white" }} size={25}>
//         {e.category}
//       </Text>
//     </ListItem.Title>
//   </ListItem.Content>
//   <ListItem.Chevron color="white" />
// </ListItem>