import React, { useRef } from "react";
import {
  Modal,
  SlideAnimation,
  ModalContent,
  BottomModal,
  ModalTitle,
} from "react-native-modals";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
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
import { AntDesign } from "@expo/vector-icons";

import { Block, Text, theme, Button as GaButton } from "galio-framework";
import { Button } from "galio-framework";
import { Component } from "react";
import { axios } from "../../../Config/Axios";
import { Header } from "react-native-elements/dist/header/Header";
import { scale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome";
import { Pages } from "react-native-pages";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { Alert } from "react-native";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "star",
      nbStar: 0,
      product: {},
      visible: false,
      sizeId: 0,
      quantity: 1,
      sizeErr: "",
      expoPushToken: "",
      notification: false,
      notificationListener: {},
      responseListener: {},
      quanErr: "",
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
    this.getNotificationPerm();
  }
  addToCartAlert = () => {
    this.addToCart();
  };
  getNotificationPerm = async () => {
    this.registerForPushNotificationsAsync().then(token =>
      // setExpoPushToken(token),this.
      this.setState({
        expoPushToken: token,
      }),
    );

    this.state.notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        this.setState({
          notification: notification,
        });
      });

    this.state.responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    // return () => {
    //   Notifications.removeNotificationSubscription(
    //     notificationListener.current,
    //   );
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  };
  schedulePushNotification = async () => {
    // await Notifications.n
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Product Added To Cart Successfully 🎉",
        // body: "Here is the notification body",
        // data: {
        //   data: () => {
        //     console.log("hady");
        //   },
        // },
      },
      trigger: { seconds: 1 },
    });
  };
  registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
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

    return token;
  };
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
  addToCart = async () => {
    this.setState({
      sizeErr: "",
      quanErr: "",
    });
    let data = {
      product_id: this.state.product.id,
      size_id: this.state.sizeId,
      quantity: this.state.quantity,
    };
    await axios
      .post("/addtocart", data)
      .then(res => {
        console.log(res.data);
        this.setState({
          sizeId: 0,
          quantity: 1,
          visible: false,
        });
        Alert.alert(
          "Product Added To Cart Successfully",
          "",
          [
            {
              text: "Continue Shopping",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Go To Cart",
              onPress: () => {
                this.props.navigation.push("Home", { screen: "Cart" });
              },
            },
          ],
          { cancelable: false },
        );
        this.schedulePushNotification();
      })
      .catch(err => {
        console.log(err.response.data.errors);
        if (err.response) {
          if (err.response.data.errors.size_id) {
            this.setState({
              sizeErr: "Please Select A Size",
              sizeId: 0,
              quantity: 1,
            });
          }
          if (err.response.data.errors.quantity) {
            this.setState({
              quanErr: err.response.data.errors.quantity,
              // sizeId: 0,
              // quantity: 1,
            });
          }
        }
      });
  };

  render() {
    const { nbStar } = this.props;
    const onShare = async () => {
      try {
        const result = await Share.share({
          message: `Download Beam Store App And Shop The Latest Fashion Trends Of The Biggest Clothing Stores And All Your Favorite Brands. 
Download On Google Play:
https://play.google.com/store/apps/details?id=com.abdelhady154.beam 
Download On App Store:
https://apps.apple.com/gb/app/beam-store/id1582700851?ign-mpt=uo%3D2
Follow Us For Latest Fashion Trends On Social Media
Facebook:
https://www.facebook.com/beamstoreapp/ 
Instagram:
https://www.instagram.com/beamstoreapp/ `,
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

    console.log(this.state.product);
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
                              height: "120%",
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
                    {this.state.product.quantity <= 0 ? (
                      <Text
                        style={{
                          fontSize: 15,
                          color: "red",
                          alignSelf: "center",
                          marginRight: scale(5),
                        }}
                      >
                        Product Out Of Sale
                      </Text>
                    ) : (
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
                          this.setState({ visible: true });
                        }}
                      >
                        <Icon
                          name="cart-plus"
                          color="#fff"
                          size={scale(18)}
                          onPress={() => {
                            this.setState({ visible: true });
                          }}
                        />
                      </TouchableOpacity>
                    )}
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
                    flexWrap: "wrap",
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

                {/* <View
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
                </View> */}

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      marginLeft: scale(10),
                      marginTop: scale(10),
                      lineHeight: scale(20),
                      marginBottom: scale(30),
                    }}
                  >
                    {this.state.product.desc}
                  </Text>
                </View>
              </View>

              <BottomModal
                visible={this.state.visible}
                onTouchOutside={() => this.setState({ visible: false })}
                height={scale(400)}
                width={1}
                onSwipeOut={() => this.setState({ visible: false })}
                // modalTitle={<ModalTitle title="Bottom Modal" hasTitleBar />}
              >
                <ModalContent
                  style={{
                    flex: 1,
                    backgroundColor: "#1E1F28",
                    // flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: scale(10),
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 25 }}>
                      Select Size
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {this.state.product.sizes ? (
                      this.state.product.sizes.map(e => {
                        return (
                          <Button
                            key={e.id}
                            style={{
                              borderColor:
                                this.state.sizeId === e.id
                                  ? "#28AE7B"
                                  : "#D6D6D7",
                              borderWidth: 1,
                              borderRadius: 50,
                              backgroundColor: "transparent",
                              width: scale(50),
                              height: scale(50),
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onPress={() => {
                              this.setState({ sizeId: e.id });
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  this.state.sizeId === e.id
                                    ? "#28AE7B"
                                    : "#fff",
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
                  <Text
                    style={{ fontSize: 15, color: "red", alignSelf: "center" }}
                  >
                    {this.state.sizeErr}
                  </Text>
                  <View
                    style={{
                      borderBottomColor: "#ABB4BD",
                      borderBottomWidth: 1,
                      marginTop: scale(5),
                      width: "100%",
                      alignSelf: "center",
                      marginBottom: scale(5),
                    }}
                  />
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: scale(10),
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 25 }}>
                      Quantity
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      // flex: 1,
                      flexDirection: "row",
                      marginBottom: scale(5),
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#2A2C36",
                        borderRadius: 50,
                        height: 40,
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        if (this.state.quantity > 1) {
                          this.setState({
                            quantity: this.state.quantity - 1,
                          });
                        }
                      }}
                    >
                      <AntDesign name="minus" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        marginHorizontal: 20,
                      }}
                    >
                      {this.state.quantity}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#2A2C36",
                        borderRadius: 50,
                        height: 40,
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        this.setState({
                          quantity: this.state.quantity + 1,
                        });
                      }}
                    >
                      <AntDesign name="plus" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{ fontSize: 15, color: "red", alignSelf: "center" }}
                  >
                    {this.state.quanErr}
                  </Text>
                  <View
                    style={{
                      borderBottomColor: "#ABB4BD",
                      borderBottomWidth: 1,
                      marginTop: scale(5),
                      width: "100%",
                      alignSelf: "center",
                      marginBottom: scale(5),
                    }}
                  />
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: scale(10),
                    }}
                  >
                    <Button
                      color="#28AE7B"
                      style={{ width: "90%" }}
                      size="large"
                      onPress={this.addToCartAlert}
                      round
                    >
                      Add To Cart
                    </Button>
                  </View>
                </ModalContent>
              </BottomModal>

              {/* <View>
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
              </View> */}
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
