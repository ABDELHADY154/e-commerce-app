import { Button } from "galio-framework";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../../Config/Axios";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { Alert, View } from "react-native";
import Card from "../../UI/MainCard/MainCard";
import { ScrollView } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
export default class HomeScreen extends Component {
  async componentDidMount() {
    var userToken = await AsyncStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    await axios
      .get(`/clientProfile`)
      .then(res => {})
      .catch(err => {
        if (err.response.data.status == 401) {
          AsyncStorage.removeItem("userData");
          AsyncStorage.removeItem("userToken");
          AsyncStorage.removeItem("config");
          axios.defaults.headers.common["Authorization"] = ``;
          this.props.logout();
        }
      });
  }
  render() {
    return (
      <SafeAreaView
      // style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        <ParallaxHeader
          maxHeight={300}
          minHeight={100}
          heroImage={require("../../../assets/images/image.png")}
          //refactor header
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: "4%",
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "flex-start",
                fontSize: 34,
              }}
            >
              Sale
            </Text>
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                height: scale(400),
              }}
            >
              {/* <View style={{ flexDirection: "row", height: 400 }}> */}
              <Card
                title={"Porsche Rubber"}
                subTitle={
                  "Zermatt is famed as a mounering and ski destome banmdo liono"
                }
                nbStar={3}
                sale={"$200"}
                price={"$100"}
                brand={"Hollister"}
                image={require("../../../assets/images/image.png")}
                buttonText={"VIEW DETAILS"}
                icon1={"heart-o"}
                iconColor1={"#fff"}
                iconBackground1={"#2A2C36"}
                onClicked1={() => {
                  alert("Hello!");
                }}
                buttonColor={"#4383FF"}
                onClickButton={() => Alert("Has clicked")}
              />
              <Card
                title={"Porsche Rubber"}
                subTitle={
                  "Zermatt is famed as a mounering and ski destome banmdo liono"
                }
                nbStar={3}
                sale={"$200"}
                price={"$100"}
                brand={"Hollister"}
                image={require("../../../assets/images/image.png")}
                buttonText={"VIEW DETAILS"}
                icon1={"heart-o"}
                iconColor1={"#fff"}
                iconBackground1={"#2A2C36"}
                onClicked1={() => {
                  alert("Hello!");
                }}
                buttonColor={"#4383FF"}
                onClickButton={() => Alert("Has clicked")}
              />
              <Card
                title={"Porsche Rubber"}
                subTitle={
                  "Zermatt is famed as a mounering and ski destome banmdo liono"
                }
                nbStar={3}
                sale={"$200"}
                price={"$100"}
                brand={"Hollister"}
                image={require("../../../assets/images/image.png")}
                buttonText={"VIEW DETAILS"}
                icon1={"heart-o"}
                iconColor1={"#fff"}
                iconBackground1={"#2A2C36"}
                onClicked1={() => {
                  alert("Hello!");
                }}
                buttonColor={"#4383FF"}
                onClickButton={() => Alert("Has clicked")}
              />
              {/* </View> */}
            </ScrollView>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // flex: 1,
              // width: "90%",
              marginHorizontal: "4%",
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "flex-start",
                fontSize: 34,
                // marginHorizontal: "4%",
              }}
            >
              New
            </Text>
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                height: scale(400),
              }}
            >
              {/* <View style={{ flexDirection: "row", height: 400 }}> */}
              <Card
                title={"Porsche Rubber"}
                subTitle={
                  "Zermatt is famed as a mounering and ski destome banmdo liono"
                }
                nbStar={3}
                sale={"$200"}
                price={"$100"}
                brand={"Hollister"}
                image={require("../../../assets/images/image.png")}
                buttonText={"VIEW DETAILS"}
                icon1={"heart-o"}
                iconColor1={"#fff"}
                iconBackground1={"#2A2C36"}
                onClicked1={() => {
                  alert("Hello!");
                }}
                buttonColor={"#4383FF"}
                onClickButton={() => Alert("Has clicked")}
              />
              <Card
                title={"Porsche Rubber"}
                subTitle={
                  "Zermatt is famed as a mounering and ski destome banmdo liono"
                }
                nbStar={3}
                sale={"$200"}
                price={"$100"}
                brand={"Hollister"}
                image={require("../../../assets/images/image.png")}
                buttonText={"VIEW DETAILS"}
                icon1={"heart-o"}
                iconColor1={"#fff"}
                iconBackground1={"#2A2C36"}
                onClicked1={() => {
                  alert("Hello!");
                }}
                buttonColor={"#4383FF"}
                onClickButton={() => Alert("Has clicked")}
              />
              <Card
                title={"Porsche Rubber"}
                subTitle={
                  "Zermatt is famed as a mounering and ski destome banmdo liono"
                }
                nbStar={3}
                sale={"$200"}
                price={"$100"}
                brand={"Hollister"}
                image={require("../../../assets/images/image.png")}
                buttonText={"VIEW DETAILS"}
                icon1={"heart-o"}
                iconColor1={"#fff"}
                iconBackground1={"#2A2C36"}
                onClicked1={() => {
                  alert("Hello!");
                }}
                buttonColor={"#4383FF"}
                onClickButton={() => Alert("Has clicked")}
              />
              {/* </View> */}
            </ScrollView>
          </View>
        </ParallaxHeader>
      </SafeAreaView>
    );
  }
}
