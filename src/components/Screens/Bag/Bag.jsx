import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
  Alert,
  SafeAreaView,
} from "react-native";
// import {
//   CodeField,
//   Cursor,
//   useBlurOnFulfill,
//   useClearByFocusCell,
// } from "react-native-confirmation-code-field";
import { Block, Text, theme, Button as GaButton, Input } from "galio-framework";
import { Component } from "react";
import { axios } from "../../../Config/Axios";
import { Header } from "react-native-elements/dist/header/Header";
import { scale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
// import { Button, Menu, Divider, Provider, TextInput } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import BagItem from "./BagItem";
import { RefreshControl } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import {
  Modal,
  SlideAnimation,
  ModalContent,
  BottomModal,
  ModalTitle,
} from "react-native-modals";
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

// import { Promo } from "./Promo";
import ThemedListItem from "react-native-elements/dist/list/ListItem";

// const Code = () => {
//   const [value, setValue] = useState("");
//   const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
//   const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//     value,
//     setValue,
//   });

//   return (
//     <SafeAreaView style={{ flex: 1, padding: 20 }}>
//       <Text style={{ textAlign: "center", fontSize: 30, color: "#fff" }}>
//         Verification
//       </Text>
//       <CodeField
//         ref={ref}
//         {...props}
//         // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
//         value={value}
//         onChangeText={setValue}
//         cellCount={CELL_COUNT}
//         rootStyle={{ marginTop: 20 }}
//         keyboardType="number-pad"
//         textContentType="oneTimeCode"
//         renderCell={({ index, symbol, isFocused }) => (
//           <Text
//             key={index}
//             style={[
//               {
//                 width: 40,
//                 height: 40,
//                 lineHeight: 38,
//                 fontSize: 24,
//                 borderWidth: 2,
//                 borderColor: "#00000030",
//                 textAlign: "center",
//               },
//               isFocused && { borderColor: "#000" },
//             ]}
//             onLayout={getCellOnLayoutHandler(index)}
//           >
//             {symbol || (isFocused ? <Cursor /> : null)}
//           </Text>
//         )}
//       />
//     </SafeAreaView>
//   );
// };

class Bag extends Component {
  state = {
    products: [],
    quantity: 0,
    total_price: 0,
    refresh: false,
    buttonDisable: false,
    quanErr: "",
    visible: false,
    value: "",
    ref: {},
    cellCount: 6,
    promo: "",
    show: false,
    showApply: false,
    err: "",
    showErr: false,
  };

  onRefresh = () => {
    this.setState({
      refresh: true,
    });
    axios
      .get("cart")
      .then(res => {
        // console.log(res.data.response.data);
        this.setState({
          products: res.data.response.data.products,
          quantity: res.data.response.data.quantity,
          total_price: res.data.response.data.total_price,
          refresh: false,
        });
      })
      .catch(err => {
        this.setState({
          refresh: false,
        });
      });
  };
  async componentDidMount() {
    // this.setState({
    //   ref: useBlurOnFulfill({
    //     value: this.state.value,
    //     cellCount: this.state.cellCount,
    //   }),
    // });
    axios
      .get("cart")
      .then(res => {
        // console.log(res.data.response.data);
        this.setState({
          products: res.data.response.data.products,
          quantity: res.data.response.data.quantity,
          total_price: res.data.response.data.total_price,
        });
      })
      .catch(err => {});
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.onRefresh();
    });
  }
  // PromoCode = props => {
  //   const CELL_COUNT = 7;
  //   // const refs = useBlurOnFulfill({
  //   //   value: this.state.value,
  //   //   cellCount: CELL_COUNT,
  //   // });

  //   return (
  //     <Promo
  //       {...props}
  //       refs={refs}
  //       products={this.state.products}
  //       closeModal={this.closePromoModal}
  //     />
  //   );
  // };
  deleteItem = (productId, sizeId) => {
    axios
      .post("/deleteItem", {
        product_id: productId,
        size_id: sizeId,
      })
      .then(res => {
        this.onRefresh();
      })
      .catch(err => {
        this.onRefresh();
      });
  };
  addQuantity = (productId, sizeId, quantity) => {
    if (quantity >= 1) {
      this.setState({
        buttonDisable: true,
      });
      axios
        .post("/updateCart", {
          product_id: productId,
          size_id: sizeId,
          quantity: quantity + 1,
        })
        .then(res => {
          this.onRefresh();
          this.setState({
            buttonDisable: false,
          });
        })
        .catch(err => {
          this.onRefresh();

          // console.log();

          this.setState({
            buttonDisable: false,
            quanErr: err.response.data.errors.quantity,
          });

          if (err.response.data.errors.quantity) {
            Alert.alert(
              `${this.state.quanErr}`,
              "",
              [
                {
                  text: "OK",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                // {
                //   text: "Go To Cart",
                //   onPress: () => {
                //     this.props.navigation.push("Home", { screen: "Cart" });
                //   },
                // },
              ],
              { cancelable: false },
            );
          }
        });
    }
  };

  closePromoModal = val => {
    this.setState({ visible: val });
  };
  checkPromo = () => {
    axios
      .post("/checkPromo", { promo: this.state.promo })
      .then(res => {
        // console.log(res.data.response.data);
        this.setState({ show: true, showApply: true });
      })
      .catch(err => {
        if (err.response.data.status == 404) {
          this.setState({
            err: "Promo Code Do not Exist",
            showErr: true,
          });
        }
        if (err.response.data.status == 403) {
          this.setState({
            err: "Promo Code Is Used Before",
            showErr: true,
          });
        }
        // console.log(err.response.data.status);
      });
  };
  applyPromo = () => {
    axios
      .post("/usePromo", { promo: this.state.promo })
      .then(res => {
        this.setState({ show: false, showApply: false, promo: "" });
        this.onRefresh();
      })
      .catch(err => {
        if (err.response.data.status == 404) {
          this.setState({
            err: "Promo Code Do not Exist",
            showErr: true,
          });
        }
        if (err.response.data.status == 403) {
          this.setState({
            err: "Promo Code Is Used Before",
            showErr: true,
          });
        }
        // console.log(err.response.data.status);
      });
  };
  minusQuantity = (productId, sizeId, quantity) => {
    if (quantity > 1) {
      this.setState({
        buttonDisable: true,
      });
      axios
        .post("/updateCart", {
          product_id: productId,
          size_id: sizeId,
          quantity: quantity - 1,
        })
        .then(res => {
          this.onRefresh();
          this.setState({
            buttonDisable: false,
          });
        })
        .catch(err => {
          this.onRefresh();
          this.setState({
            buttonDisable: false,
            quanErr: err.response.data.errors,
          });
          // if (condition) {

          // } else if() {

          // }
          this.setState({
            buttonDisable: false,
            quanErr: err.response.data.errors.quantity,
          });
          if (err.response.data.errors.quantity) {
            Alert.alert(
              `${this.state.quanErr}`,
              "",
              [
                {
                  text: "OK",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                // {
                //   text: "Go To Cart",
                //   onPress: () => {
                //     this.props.navigation.push("Home", { screen: "Cart" });
                //   },
                // },
              ],
              { cancelable: false },
            );
          }
          // else if (err.response.data.errors) {
          //   this.setState({
          //     buttonDisable: false,
          //     quanErr: err.response.data.errors,
          //   });
          //   Alert.alert(
          //     `${this.state.quanErr}`,
          //     "",
          //     [
          //       {
          //         text: "OK",
          //         onPress: () => console.log("Cancel Pressed"),
          //         style: "cancel",
          //       },
          //       // {
          //       //   text: "Go To Cart",
          //       //   onPress: () => {
          //       //     this.props.navigation.push("Home", { screen: "Cart" });
          //       //   },
          //       // },
          //     ],
          //     { cancelable: false },
          //   );
          // }
        });
    }
  };

  render() {
    console.log(this.state.promo);
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
            text: "My Cart",
            style: { color: "#fff", fontSize: scale(20) },
          }}
          // rightComponent={{
          //   icon: "search",
          //   color: "#fff",
          //   size: scale(30),
          //   onPress: () => {
          //     this.props.navigation.goBack();
          //   },
          // }}
        />

        {/* <ScrollView> */}

        <ScrollView
          contentContainerStyle={{
            // height: "70%",
            width: "97%",
            alignSelf: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              tintColor="white"
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {this.state.products.length !== 0 ? (
            this.state.products.map((e, i) => {
              return (
                <BagItem
                  key={i}
                  image={e.images[0].image}
                  name={e.name}
                  price={e.price}
                  quantity={e.quantity}
                  size={e.size}
                  buttonDisable={this.state.buttonDisable}
                  addButton={() => {
                    this.addQuantity(e.id, e.size.id, e.quantity);
                  }}
                  subButton={() => {
                    this.minusQuantity(e.id, e.size.id, e.quantity);
                  }}
                  deleteOnPress={() => {
                    this.deleteItem(e.id, e.size.id);
                  }}
                />
              );
            })
          ) : (
            <View
              style={{
                marginTop: 130,
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../assets/images/cart.png")}
                style={
                  {
                    // marginVertical: 10,
                  }
                }
              />
              <Text style={{ color: "white", marginTop: 20 }}>
                Your Cart Is Empty{" "}
              </Text>
            </View>
          )}
        </ScrollView>

        {this.state.products.length !== 0 ? (
          <KeyboardAvoidingView
            // style={styles.container}
            behavior="padding"
          >
            <View style={{ alignItems: "center", marginBottom: scale(15) }}>
              {/* <View style={{ marginTop: 30, width: "95%" }}></View> */}
              <View
                style={{
                  flexDirection: "row",
                  width: "95%",
                }}
              >
                <View style={{ flex: 4 }}>
                  <Input
                    placeholder="Enter Your Promo Code"
                    value={this.state.promo}
                    onChangeText={e => {
                      this.setState({ promo: e });
                    }}
                    rounded
                  />
                </View>

                {this.state.showApply == false ? (
                  <GaButton
                    color="#28AE7B"
                    style={{ flex: 1 }}
                    onPress={this.checkPromo}
                    round
                    disabled={this.state.promo == "" ? true : false}
                  >
                    Check
                  </GaButton>
                ) : (
                  <GaButton
                    color="#28AE7B"
                    style={{ flex: 1 }}
                    onPress={this.applyPromo}
                    round
                  >
                    Apply
                  </GaButton>
                )}
              </View>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: "#28AE7B",
                  borderRadius: 50,
                  // height: 40,
                  width: "85%",
                  paddingVertical: 15,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.setState({
                    visible: true,
                  });
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    textTransform: "uppercase",
                  }}
                >
                  Add Promo Code
                </Text>
              </TouchableOpacity> */}
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  alignSelf: "flex-start",
                  marginLeft: scale(14),
                }}
              >
                <Text
                  style={{
                    color: "#ABB4BD",
                    fontSize: 18,
                    // marginLeft: 20,
                    marginTop: 10,
                    textAlign: "left",
                    // alignItems: "flex-start",
                    // alignSelf: "flex-start",
                    // alignContent: "flex-start",
                    // justifyContent: "flex-start",
                  }}
                >
                  Cart Price:{" "}
                  {this.state.total_price
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                  EGP
                </Text>
                <Text
                  style={{
                    color: "#ABB4BD",
                    fontSize: 18,
                    // marginLeft: 20,
                    marginTop: 10,
                    textAlign: "left",

                    // alignItems: "flex-end",
                    // alignSelf: "flex-end",
                    // alignContent: "flex-end",
                    // justifyContent: "flex-end",
                  }}
                >
                  Count: {this.state.quantity}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#28AE7B",
                  borderRadius: 50,
                  // height: 40,
                  width: "85%",
                  paddingVertical: 15,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.props.navigation.push("Checkout", {
                    price: this.state.total_price,
                    products: this.state.products,
                  });
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    textTransform: "uppercase",
                  }}
                >
                  Check out
                </Text>
              </TouchableOpacity>
            </View>
            <BottomModal
              visible={this.state.visible}
              onTouchOutside={() => this.setState({ visible: false })}
              height={scale(400)}
              width={1}
              onSwipeOut={() => this.setState({ visibleAddToCart: false })}
              // modalTitle={<ModalTitle title="Bottom Modal" hasTitleBar />}
            >
              <ModalContent
                style={{
                  flex: 1,
                  backgroundColor: "#1E1F28",
                  // flexDirection: "row",
                }}
              >
                {/* <this.PromoCode close={() => this.closePromoModal} /> */}
                {/* <Code /> */}
                {/* <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      /> */}
              </ModalContent>
            </BottomModal>
          </KeyboardAvoidingView>
        ) : (
          <Text></Text>
          // <TouchableOpacity
          //   style={{
          //     backgroundColor: "#28AE7B",
          //     borderRadius: 50,
          //     // height: 40,
          //     width: "90%",
          //     paddingVertical: 15,
          //     marginTop: 20,
          //     justifyContent: "center",
          //     alignItems: "center",
          //   }}
          // >
          //   <Text
          //     style={{
          //       color: "#fff",
          //       fontSize: 18,
          //       textTransform: "uppercase",
          //     }}
          //   >
          //     Check outULNU-MGPT
          //   </Text>
          // </TouchableOpacity>
        )}
        <SCLAlert
          theme="success"
          show={this.state.show}
          title="Promo Code is Valid"
          onRequestClose={() => this.setState({ show: false })}
          slideAnimationDuration={150}

          // subtitle="Lorem ipsum dolor"
        >
          <SCLAlertButton theme="success" onPress={this.applyPromo}>
            Apply
          </SCLAlertButton>
        </SCLAlert>
        <SCLAlert
          theme="danger"
          show={this.state.showErr}
          title={""}
          onRequestClose={() => this.setState({ showErr: false })}
          slideAnimationDuration={150}
          subtitle={this.state.err}
        >
          <SCLAlertButton
            theme="danger"
            onPress={() => this.setState({ showErr: false })}
          >
            Ok
          </SCLAlertButton>
        </SCLAlert>
        {/* </ScrollView> */}
      </>
    );
  }
}

export default Bag;
