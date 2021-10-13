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
import { axios } from "../../../../Config/Axios";
import { Avatar } from "react-native-elements";
import { ListItem } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native";
import { Header } from "react-native-elements/dist/header/Header";
import { scale } from "react-native-size-matters";
import { RefreshControl } from "react-native";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class Profile extends Component {
  state = {
    categories: [],
    refresh: true,
  };

  async componentDidMount() {
    if (this.props.route.params.id) {
      await axios
        .get(`/brand-categories/${this.props.route.params.id}`)
        .then(res => {
          this.setState({ categories: res.data.response.data, refresh: false });
        })
        .catch(err => {
          console.log(err);
        });
    }

    console.log(this.props.route.params.name);
  }

  onRefresh = async () => {
    this.setState({
      refresh: true,
    });
    if (this.props.route.params.id) {
      await axios
        .get(`/brand-categories/${this.props.route.params.id}`)
        .then(res => {
          this.setState({ categories: res.data.response.data, refresh: false });
        })
        .catch(err => {
          console.log(err);
        });
    }
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
            text: this.props.route.params.name,
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
              {this.state.categories.length !== 0 && (
                <ListItem
                  bottomDivider
                  containerStyle={{ backgroundColor: "transparent" }}
                  onPress={() => {
                    this.props.navigation.push("LandingProducts", {
                      name: this.props.route.params.name,
                      id: this.props.route.params.id,
                    });
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text style={{ color: "white" }} size={25}>
                        All
                      </Text>
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color="white" />
                </ListItem>
              )}
              {this.state.categories.length != 0 ? (
                this.state.categories.map(e => {
                  return (
                    <ListItem
                      bottomDivider
                      key={e.id}
                      containerStyle={{ backgroundColor: "transparent" }}
                      onPress={() => {
                        this.props.navigation.push("LandingProducts", {
                          name: this.props.route.params.name,
                          id: this.props.route.params.id,
                          catId: e.id,
                        });
                      }}
                    >
                      <ListItem.Content>
                        <ListItem.Title>
                          <Text style={{ color: "white" }} size={25}>
                            {e.category}
                          </Text>
                        </ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron color="white" />
                    </ListItem>
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
