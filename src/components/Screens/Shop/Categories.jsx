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
import { Avatar } from "react-native-elements";
import { ListItem } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native";
import { Header } from "react-native-elements/dist/header/Header";
import { scale } from "react-native-size-matters";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class Profile extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    if (this.props.route.params.id) {
      await axios
        .get(`/brand-categories/${this.props.route.params.id}`)
        .then(res => {
          this.setState({ categories: res.data.response.data });
        })
        .catch(err => {
          console.log(err);
        });
    }

    console.log(this.props.route.params.name);
  }

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
            style: { color: "#fff", fontSize: 36 },
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
          <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View
              style={{ flex: 1, justifyContent: "flex-start", marginTop: "2%" }}
            >
              {this.state.categories.length != 0 ? (
                this.state.categories.map(e => {
                  return (
                    <ListItem
                      bottomDivider
                      key={e.id}
                      containerStyle={{ backgroundColor: "transparent" }}
                    >
                      <ListItem.Content>
                        <ListItem.Title>
                          <Text style={{ color: "white" }} size={30}>
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
