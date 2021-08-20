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
import StickyParallaxHeader from "react-native-sticky-parallax-header";
import { Header } from "react-native-elements";
export default class HomeScreen extends Component {
  async componentDidMount() {
    var userToken = await AsyncStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    await axios
      .get(`/clientProfile`)
      .then((res) => {})
      .catch((err) => {
        console.log(err.response.data.status);
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
          maxHeight={400}
          minHeight={80}
          renderHeader={() => {
            return (
              <Header
                containerStyle={{ height: 510 }}
                backgroundColor={"#2A2C36"}
                backgroundImage={require("../../../assets/images/image.png")}
                // leftContainerStyle={{
                //   flexDirection: "column",
                //   justifyContent: "flex-end",
                //   alignSelf: "flex-end",
                //   height: "100%",
                // }}
                // leftComponent={() => {
                //   return (
                //     <View>
                //       {/* <Text
                //         style={{ fontSize: 34, color: "white", width: "100%" }}
                //       >
                //         Fashion Sale
                //       </Text> */}
                //       {/* <Button color="#28AE7B" round>
                //         Check Sales
                //       </Button> */}
                //     </View>
                //   );
                // }}
              />
            );
          }}
          // heroImage={require("../../../assets/images/image.png")}
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
            <Button
              color="#28AE7B"
              round
              onPress={() => this.props.navigation.push("ProductView")}
            >
              Check Sales
            </Button>
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                height: scale(300),
              }}
              horizontal={true}
            >
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
                icon2={"cart-plus"}
                iconColor2={"white"}
                iconBackground2={"#28AE7B"}
                onClicked2={() => {
                  alert("Hello!");
                }}
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
                icon2={"cart-plus"}
                iconColor2={"white"}
                iconBackground2={"#28AE7B"}
                onClicked2={() => {
                  alert("Hello!");
                }}
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
                icon2={"cart-plus"}
                iconColor2={"white"}
                iconBackground2={"#28AE7B"}
                onClicked2={() => {
                  alert("Hello!");
                }}
                onClickButton={() => Alert("Has clicked")}
              />
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
                height: scale(300),
              }}
              horizontal={true}
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
                icon2={"cart-plus"}
                iconColor2={"white"}
                iconBackground2={"#28AE7B"}
                onClicked2={() => {
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
                icon2={"cart-plus"}
                iconColor2={"white"}
                iconBackground2={"#28AE7B"}
                onClicked2={() => {
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
                icon2={"cart-plus"}
                iconColor2={"white"}
                iconBackground2={"#28AE7B"}
                onClicked2={() => {
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
