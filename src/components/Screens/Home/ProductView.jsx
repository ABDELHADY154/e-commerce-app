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
  Share,
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
import { Pages } from "react-native-pages";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { RefreshControl } from "react-native";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "star",
      nbStar: 0,
      product: {},
    };
  }

  async componentDidMount() {
    if (this.props.route.params.id) {
      await axios
        .get(`/product/${this.props.route.params.id}`)
        .then(res => {
          this.setState({
            product: res.data.response.data,
          });
        })
        .catch(err => {});
    }
  }
  onRefresh = async () => {
    if (this.props.route.params.id) {
      await axios
        .get(`/product/${this.props.route.params.id}`)
        .then(res => {
          this.setState({
            product: res.data.response.data,
          });
        })
        .catch(err => {});
    }
  };
  favoriteProduct = async id => {
    await axios
      .post("/favorite", { product_id: id })
      .then(res => {
        this.onRefresh();
      })
      .catch(err => {});
  };
  unfavoriteProduct = async id => {
    await axios
      .post("/unfavorite", { product_id: id })
      .then(res => {
        this.onRefresh();
      })
      .catch(err => {});
  };
  render() {
    const { nbStar } = this.props;
    const onShare = async () => {
      try {
        const result = await Share.share({
          message: "BEAM Store APP",
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
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
            text: this.state.product.brand,
            style: { color: "#fff", fontSize: scale(20) },
          }}
          leftComponent={{
            icon: "chevron-left",
            color: "#fff",
            size: scale(30),
            onPress: () => {
              this.props.navigation.goBack();
            },
          }}
          leftComponent={{
            icon: "chevron-left",
            color: "#fff",
            size: scale(30),
            onPress: () => {
              this.props.navigation.goBack();
            },
          }}
          rightComponent={{
            icon: "share",
            color: "#fff",
            onPress: () => {
              onShare();
            },
          }}
        />
        <ScrollView>
          <ParallaxHeader
            maxHeight={500}
            minHeight={80}
            renderHeader={() => {
              return (
                <Pages containerStyle={{}}>
                  {this.state.product.images ? (
                    this.state.product.images.map((e, i) => {
                      console.log(e);
                      return (
                        <>
                          <Image
                            key={i}
                            source={{ uri: e.image }}
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                          />
                        </>
                      );
                    })
                  ) : (
                    <Image
                      source={require("../../../assets/images/image2.png")}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  )}
                </Pages>
              );
            }}
          >
            <>
              <View>
                <View
                  style={{
                    marginLeft: scale(10),
                    flex: 1,
                    flexDirection: "row",
                    marginTop: scale(20),
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "bold",
                        justifyContent: "flex-start",
                      }}
                    >
                      {this.state.product.name}
                    </Text>
                    <Text
                      style={{
                        color: "#D6D6D7",
                        fontSize: 14,
                        marginTop: scale(5),
                      }}
                    >
                      {this.state.product.brand}
                    </Text>
                  </View>
                  <View
                    style={{ justifyContent: "flex-end", flexDirection: "row" }}
                  >
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginRight: scale(10),
                        alignSelf: "flex-start",
                        width: 50,
                        height: 50,
                        shadowRadius: 5,
                        borderRadius: 40,
                        backgroundColor: "#28AE7B",
                      }}
                      onPress={() => {
                        alert("Hello!");
                      }}
                    >
                      <Icon
                        name="cart-plus"
                        color="#fff"
                        size={scale(18)}
                        onPress={() => {
                          alert("Hello!");
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginRight: scale(10),
                        alignSelf: "flex-start",
                        width: 50,
                        height: 50,
                        shadowRadius: 5,
                        borderRadius: 40,
                        backgroundColor:
                          this.state.product.favourited == true
                            ? "red"
                            : "black",
                      }}
                      onPress={() => {
                        this.state.product.favourited == false
                          ? this.favoriteProduct(this.state.product.id)
                          : this.unfavoriteProduct(this.state.product.id);
                      }}
                    >
                      <Icon
                        name="heart"
                        color={
                          this.state.product.favourited == true
                            ? "white"
                            : "#fff"
                        }
                        size={scale(18)}
                        onPress={() => {
                          this.state.product.favourited == false
                            ? this.favoriteProduct(this.state.product.id)
                            : this.unfavoriteProduct(this.state.product.id);
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {this.state.product.sale == true ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginLeft: scale(10),
                      // alignSelf: "flex-start",
                      // marginTop: "5%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "bold",
                        marginRight: scale(10),
                        textDecorationLine: "line-through",
                      }}
                    >
                      {this.state.product.price} EGP
                    </Text>

                    <Text
                      style={{
                        color: "red",
                        fontSize: 20,
                        fontWeight: "bold",
                        marginRight: scale(10),
                        marginLeft: "4%",
                      }}
                    >
                      {this.state.product.total_price} EGP
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginLeft: scale(10),
                      // alignSelf: "flex-start",
                      // marginTop: "5%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "bold",
                        marginRight: scale(10),
                      }}
                    >
                      {this.state.product.price} EGP
                    </Text>
                  </View>
                )}
                {this.state.product.sale == true && (
                  <Text
                    style={{
                      color: "#D6D6D7",
                      fontSize: 14,
                      marginTop: scale(5),
                      marginLeft: scale(10),
                    }}
                  >
                    Discount: {this.state.product.discount}%
                  </Text>
                )}
                <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 25,
                      justifyContent: "flex-start",
                      marginLeft: 10,
                    }}
                  >
                    Sizes
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                >
                  {this.state.product.sizes ? (
                    this.state.product.sizes.map((e, i) => {
                      return (
                        <Button
                          key={i}
                          style={{
                            borderColor: "#D6D6D7",
                            borderWidth: 1,
                            borderRadius: 50,
                            backgroundColor: "transparent",
                            width: 42,
                            height: 42,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          disabled
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 15,
                              // marginLeft: 10,
                            }}
                          >
                            {e.size}
                          </Text>
                        </Button>
                      );
                    })
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <View
                  style={{
                    // backgroundColor: "#fff",
                    // flex: 1,
                    // position: "absolute",
                    // bottom: scale(26),
                    // right: 10,
                    marginTop: scale(4),
                    marginLeft: scale(10),
                    flexDirection: "row",
                    borderBottomRightRadius: scale(12),
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // alignSelf: "flex-end",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <Icon
                      key={index}
                      name={this.state.icon}
                      style={{ margin: 2 }}
                      color={nbStar >= index + 1 ? "gold" : "#bbb"}
                      size={scale(14)}
                    />
                  ))}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      marginLeft: scale(10),
                      marginTop: scale(10),
                      lineHeight: scale(20),
                    }}
                  >
                    {this.state.product.desc}
                  </Text>
                </View>
              </View>
              <View>
                <ListItem
                  bottomDivider
                  containerStyle={{ backgroundColor: "transparent" }}
                >
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text style={{ color: "white", fontSize: 18 }}>
                        Shipping info
                      </Text>
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color="white" size={scale(20)} />
                </ListItem>
                <ListItem
                  bottomDivider
                  containerStyle={{ backgroundColor: "transparent" }}
                >
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text style={{ color: "white", fontSize: 18 }}>
                        Support
                      </Text>
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color="white" size={scale(20)} />
                </ListItem>
              </View>
              {/* <View>
            <Text style={{ color: "white", fontSize: 18 }}>
              You Can Also Like This
            </Text>
          </View> */}
            </>
          </ParallaxHeader>
          {/* </SafeAreaView> */}
        </ScrollView>
      </>
    );
  }
}

export default ProductView;
