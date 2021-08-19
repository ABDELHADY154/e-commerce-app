import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
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
import { Entypo } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class ProductView extends Component {
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
            // text: this.props.route.params.name,
            text: "product name",

            style: { color: "#fff", fontSize: 25 },
          }}
          leftComponent={{
            icon: "chevron-left",
            color: "#fff",
            size: scale(30),
            onPress: () => {
              this.props.navigation.goBack();
            },
          }}
          rightComponent={{ icon: "share", color: "#fff" }}
        />
        {/* <SafeAreaView> */}
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View
            style={
              {
                // flex: 1,
                // justifyContent: "center",
                // alignItems: "center",
              }
            }
          >
            <Image
              borderTopRightRadius={12}
              borderTopLeftRadius={12}
              source={require("../../../assets/images/image2.png")}
              style={{
                height: "70%",
                // resizeMode: "cover",
              }}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                <Button
                  style={{
                    borderColor: "red",
                    borderWidth: 1,
                    // borderRadius: 8,
                    backgroundColor: "transparent",
                    height: 50,
                    width: 150,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 22 }}>
                    size
                    <Entypo
                      name="chevron-small-down"
                      size={30}
                      color="#fff"
                      // style={{ marginRight: 15 }}
                    />
                  </Text>
                </Button>
                <Button
                  style={{
                    borderColor: "#000",
                    borderWidth: 1,
                    // borderRadius: 8,
                    backgroundColor: "transparent",
                    height: 50,
                    width: 150,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 22 }}>
                    size
                    <Entypo
                      name="chevron-small-down"
                      size={30}
                      color="#fff"
                      // style={{ marginRight: 15 }}
                    />
                  </Text>
                </Button>
                <TouchableOpacity
                  onPress={() => this.props.onClicked1()}
                  style={[
                    {
                      justifyContent: "center",
                      zIndex: 3,
                      alignItems: "center",
                      alignSelf: "flex-end",
                      width: scale(50),
                      height: scale(50),
                      margin: 10,
                      shadowRadius: 5,
                      borderRadius: scale(40),
                      backgroundColor: "#000",
                    },
                  ]}
                >
                  <Text>
                    <Icon name="heart-o" color="#fff" size={scale(20)} />
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 25,
                    fontWeight: "bold",
                    // marginTop: 10,
                    marginLeft: 10,
                  }}
                >
                  Brand Name
                </Text>
              </View>
            </View>
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

export default ProductView;
