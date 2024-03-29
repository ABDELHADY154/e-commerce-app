import { Button } from "galio-framework";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../../Config/Axios";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { Alert, View } from "react-native";
import Card from "../../UI/MainCard/MainCard";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
import StickyParallaxHeader from "react-native-sticky-parallax-header";
import { Header } from "react-native-elements";
import { RefreshControl } from "react-native";
import Notification from "./Notification";
import ImageView from "react-native-image-viewing";
import { Image } from "react-native-expo-image-cache";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Pages } from "react-native-pages";
export default class HomeScreen extends Component {
  state = {
    saleProducts: [],
    newProducts: [],
    expoPushToken: "",
    images: [],
    imagesURI: [],
    visibile: false,
    imageIndex: 0,
  };

  async componentDidMount() {
    var userToken = await AsyncStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    var images = [];
    await axios
      .get(`/ads`)
      .then(res => {
        this.setState({
          images: res.data.response.data,
        });
      })
      .catch(err => {});
    this.state.images.forEach(el => {
      images.push({ uri: el.image });
    });
    this.setState({
      imagesURI: images,
    });
    await axios
      .get(`/clientProfile`)
      .then(res => {})
      .catch(err => {
        console.log(err.response.status);
        if (err.response.status == 401) {
          AsyncStorage.removeItem("userData");
          AsyncStorage.removeItem("userToken");
          AsyncStorage.removeItem("config");
          axios.defaults.headers.common["Authorization"] = ``;
          this.props.logout();
        }
      });
    await axios
      .get("/saleproduct")
      .then(res => {
        // console.log(res.data.response.data, "hady");
        this.setState({ saleProducts: res.data.response.data });
      })
      .catch(err => {});
    await axios
      .get("/newproduct")
      .then(res => {
        // console.log(res.data.response.data, "hady");
        this.setState({ newProducts: res.data.response.data });
      })
      .catch(err => {});
    this.notificiationPermission();
  }
  notificiationPermission = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    axios
      .post("/exponent/devices/subscribe", {
        expo_token: this.state.expoPushToken,
      })
      .then(res => {
        // console.log(res, "hady");
      })
      .catch(err => {
        // console.log(err, "test");
      });
  };
  onRefresh = async () => {
    await axios
      .get("/saleproduct")
      .then(res => {
        // console.log(res.data.response.data, "hady");
        this.setState({ saleProducts: res.data.response.data });
      })
      .catch(err => {});
    await axios
      .get("/newproduct")
      .then(res => {
        // console.log(res.data.response.data, "hady");
        this.setState({ newProducts: res.data.response.data });
      })
      .catch(err => {});
  };
  favoriteProduct = async id => {
    await axios
      .post("/favorite", { product_id: id })
      .then(res => {
        console.log(res.data);
        this.onRefresh();
      })
      .catch(err => {});
  };
  unfavoriteProduct = async id => {
    await axios
      .post("/unfavorite", { product_id: id })
      .then(res => {
        console.log(res.data);
        this.onRefresh();
      })
      .catch(err => {});
  };
  render() {
    // console.log(this.state.saleProducts);
    return (
      <SafeAreaView
      // style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        <ParallaxHeader
          maxHeight={450}
          minHeight={100}
          renderHeader={() => {
            return (
              <Pages>
                {this.state.images.length !== 0 ? (
                  this.state.images.map((e, i) => {
                    return (
                      // <>
                      <TouchableOpacity
                        key={e.id}
                        onPress={() =>
                          this.setState({ imageIndex: i, visible: true })
                        }
                      >
                        <Image
                          key={e.id}
                          // source={{ uri: e.image }}
                          // transitionDuration={50}
                          // tint="dark"
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                          {...{ preview: "", uri: e.image }}
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Image
                    source={require("../../../assets/images/image.png")}
                    transitionDuration={50}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                )}
              </Pages>
            );
          }}
          // heroImage={require("../../../assets/images/image.png")}
        >
          <ImageView
            images={this.state.imagesURI}
            imageIndex={this.state.imageIndex}
            visible={this.state.visible}
            onRequestClose={() => this.setState({ visible: false })}
          />
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
                fontSize: 28,
              }}
            >
              Sale
            </Text>
            {/* <Notification /> */}

            {this.state.saleProducts.length != 0 ? (
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  height: scale(320),
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {this.state.saleProducts.map(e => {
                  return (
                    <Card
                      key={e.id}
                      id={e.id}
                      title={e.name}
                      nbStar={3}
                      saleStatus={e.sale}
                      favourited={e.favourited}
                      sale={e.total_price}
                      price={e.price}
                      brand={e.brand}
                      onPress={() => {
                        this.props.navigation.push("ProductView", { id: e.id });
                      }}
                      image={e.images[0] ? e.images[0].image : ""}
                      buttonText={"VIEW DETAILS"}
                      icon1={"heart"}
                      iconColor1={e.favourited == true ? "white" : "#fff"}
                      iconBackground1={e.favourited == true ? "red" : "#2A2C36"}
                      onClicked1={() => {
                        e.favourited == false
                          ? this.favoriteProduct(e.id)
                          : this.unfavoriteProduct(e.id);
                      }}
                      discount={e.discount}
                      icon2={"cart-plus"}
                      iconColor2={"white"}
                      iconBackground2={"#28AE7B"}
                      onClicked2={() => {
                        this.props.navigation.push("ProductView", { id: e.id });
                      }}
                      buttonColor={"#4383FF"}
                      onClickButton={() => Alert("Has clicked")}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/images/sale.png")}
                  style={
                    {
                      // marginVertical: 10,
                    }
                  }
                />
                <Text style={{ color: "white", marginTop: -25 }}>
                  There is no sale for now!
                </Text>
              </View>
            )}
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
                fontSize: 28,
                // marginHorizontal: "4%",
              }}
            >
              New
            </Text>

            {/* <View style={{ flexDirection: "row", height: 400 }}> */}
            {this.state.newProducts.length != 0 ? (
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  height: scale(320),
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {this.state.newProducts.map(e => {
                  return (
                    <Card
                      key={e.id}
                      id={e.id}
                      onPress={() => {
                        this.props.navigation.push("ProductView", { id: e.id });
                      }}
                      title={e.name}
                      badgeStatus={"new"}
                      nbStar={3}
                      saleStatus={e.sale}
                      favourited={e.favourited}
                      sale={e.total_price}
                      price={e.price}
                      brand={e.brand}
                      image={e.images[0] ? e.images[0].image : ""}
                      buttonText={"VIEW DETAILS"}
                      icon1={"heart"}
                      iconColor1={e.favourited == true ? "white" : "#fff"}
                      iconBackground1={e.favourited == true ? "red" : "#2A2C36"}
                      onClicked1={() => {
                        e.favourited == false
                          ? this.favoriteProduct(e.id)
                          : this.unfavoriteProduct(e.id);
                      }}
                      discount={e.discount}
                      icon2={"cart-plus"}
                      iconColor2={"white"}
                      iconBackground2={"#28AE7B"}
                      onClicked2={() => {
                        this.props.navigation.push("ProductView", { id: e.id });
                      }}
                      buttonColor={"#4383FF"}
                      onClickButton={() => Alert("Has clicked")}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "3%",
                }}
              >
                <Image
                  source={require("../../../assets/images/new.png")}
                  style={
                    {
                      // marginVertical: 10,
                    }
                  }
                />
                <Text style={{ color: "white", marginTop: 20 }}>
                  There is no new items for now!
                </Text>
              </View>
            )}
          </View>
        </ParallaxHeader>
      </SafeAreaView>
    );
  }
}
// <Header
//   containerStyle={{ height: 510 }}
//   backgroundColor={"#2A2C36"}
//   backgroundImage={require("../../../assets/images/image.png")}
//   // leftContainerStyle={{
//   //   flexDirection: "column",
//   //   justifyContent: "flex-end",
//   //   alignSelf: "flex-end",
//   //   height: "100%",
//   // }}
//   // leftComponent={() => {
//   //   return (
//   //     <View>
//   //       {/* <Text
//   //         style={{ fontSize: 34, color: "white", width: "100%" }}
//   //       >
//   //         Fashion Sale
//   //       </Text> */}
//   //       {/* <Button color="#28AE7B" round>
//   //         Check Sales
//   //       </Button> */}
//   //     </View>
//   //   );
//   // }}
// />
