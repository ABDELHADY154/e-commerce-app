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
import { RefreshControl } from "react-native";
export default class HomeScreen extends Component {
  state = {
    saleProducts: [],
    newProducts: [],
  };

  async componentDidMount() {
    var userToken = await AsyncStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    await axios
      .get(`/clientProfile`)
      .then(res => {})
      .catch(err => {
        console.log(err.response.data.status);
        if (err.response.data.status == 401) {
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
  }
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

            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                height: scale(320),
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {this.state.saleProducts.length != 0 ? (
                this.state.saleProducts.map(e => {
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
                      image={e.images[0] ? { uri: e.images[0].image } : ""}
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
                        alert("Hello!");
                      }}
                      buttonColor={"#4383FF"}
                      onClickButton={() => Alert("Has clicked")}
                    />
                  );
                })
              ) : (
                <Text style={{ color: "white", alignSelf: "center" }}>
                  No Results !
                </Text>
              )}
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
                height: scale(320),
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {/* <View style={{ flexDirection: "row", height: 400 }}> */}
              {this.state.newProducts.length != 0 ? (
                this.state.newProducts.map(e => {
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
                      image={e.images[0] ? { uri: e.images[0].image } : ""}
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
                        alert("Hello!");
                      }}
                      buttonColor={"#4383FF"}
                      onClickButton={() => Alert("Has clicked")}
                    />
                  );
                })
              ) : (
                <Text style={{ color: "white", alignSelf: "center" }}>
                  No Results !
                </Text>
              )}
            </ScrollView>
          </View>
        </ParallaxHeader>
      </SafeAreaView>
    );
  }
}
