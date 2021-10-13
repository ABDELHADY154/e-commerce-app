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
import Card from "../../../UI/MainCard/MainCard";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class Profile extends Component {
  state = {
    products: [],
    refresh: true,
    message: "",
  };

  async componentDidMount() {
    if (this.props.route.params.catId) {
      await axios
        .get(`/categoryProducts/${this.props.route.params.catId}`)
        .then(res => {
          this.setState({
            products: res.data.response.data,
            refresh: false,
            message: res.data.response.data.length == 0 ? "No Results !" : "",
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (this.props.route.params.id) {
        await axios
          .get(`/allProduct/${this.props.route.params.id}`)
          .then(res => {
            // console.log(res.data.response.data[0].images[0].image);
            this.setState({
              products: res.data.response.data,
              refresh: false,
              message: res.data.response.data.length == 0 ? "No Results !" : "",
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    // console.log(this.props.route.params.name);
  }

  onRefresh = async () => {
    this.setState({
      refresh: true,
    });
    if (this.props.route.params.catId) {
      await axios
        .get(`/categoryProducts/${this.props.route.params.catId}`)
        .then(res => {
          this.setState({
            products: res.data.response.data,
            refresh: false,
            message: res.data.response.data.length == 0 ? "No Results !" : "",
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (this.props.route.params.id) {
        await axios
          .get(`/allProduct/${this.props.route.params.id}`)
          .then(res => {
            // console.log(res.data.response.data[0].images[0].image);
            this.setState({
              products: res.data.response.data,
              refresh: false,
              message: res.data.response.data.length == 0 ? "No Results !" : "",
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
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
    // console.log()
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
            style: { color: "#fff", fontSize: scale(25) },
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
        {/* <SafeAreaView> */}
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              tintColor="white"
            />
          }
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              flex: 1,
              alignItems: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              marginBottom: "15%",
            }}
          >
            {this.state.products.length != 0 ? (
              this.state.products.map(e => {
                return (
                  <View
                    style={{
                      height: scale(350),
                      width: "50%",
                    }}
                  >
                    <Card
                      key={e.id}
                      id={e.id}
                      title={e.name}
                      nbStar={3}
                      saleStatus={e.sale}
                      onPress={() => {
                        this.props.navigation.push("LandingProductView", {
                          id: e.id,
                        });
                      }}
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
                        this.props.navigation.push("LandingProductView", {
                          id: e.id,
                        });
                      }}
                      discount={e.discount}
                      icon2={"cart-plus"}
                      iconColor2={"white"}
                      iconBackground2={"#28AE7B"}
                      onClicked2={() => {
                        this.props.navigation.push("LandingProductView", {
                          id: e.id,
                        });
                      }}
                      buttonColor={"#4383FF"}
                      onClickButton={() => Alert("Has clicked")}
                    />
                  </View>
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
                  {this.state.message}
                </Text>
              </View>
            )}
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
