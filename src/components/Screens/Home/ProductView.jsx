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
import { Pages } from "react-native-pages";
import ParallaxHeader from "@fabfit/react-native-parallax-header";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class ProductView extends Component {
  state = {
    product: {},
  };
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
  render() {
    // console.log(this.state.product);
    return (
      <>
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
                      <Image
                        key={i}
                        source={{ uri: e.image }}
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      />
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
          // heroImage={require("../../../assets/images/image.png")}
        >
          <SafeAreaView>
            <View>
              {/* <ScrollView contentContainerStyle={{ height: "100%" }}> */}
              <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                <Button
                  style={{
                    borderColor: "red",
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    height: 50,
                    width: 150,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      marginLeft: 10,
                    }}
                  >
                    size
                    <Entypo
                      name="chevron-small-down"
                      size={24}
                      color="#D6D6D7"
                      style={{}}
                    />
                  </Text>
                </Button>
                <Button
                  style={{
                    borderColor: "#D6D6D7",
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    height: 50,
                    width: 150,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      marginLeft: 10,
                    }}
                  >
                    Color
                    <Entypo
                      name="chevron-small-down"
                      size={24}
                      color="#D6D6D7"
                      style={{}}
                    />
                  </Text>
                </Button>
                <TouchableOpacity
                  // onPress={() => this.props.onClicked1()}
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      width: 44,
                      height: 44,
                      marginLeft: 6,
                      marginTop: 10,
                      shadowRadius: 5,
                      borderRadius: 40,
                      backgroundColor: "#000",
                    },
                  ]}
                >
                  <Text>
                    <Icon name="heart-o" color="#D6D6D7" size={scale(18)} />
                  </Text>
                </TouchableOpacity>
              </View>
              {/* </View> */}
              <View
                style={{
                  marginLeft: scale(10),
                  flex: 1,
                  flexDirection: "row",
                  marginTop: scale(10),
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 23,
                      fontWeight: "bold",
                      justifyContent: "flex-start",
                    }}
                  >
                    {this.state.product.brand}
                  </Text>
                  <Text
                    style={{
                      color: "#D6D6D7",
                      fontSize: 14,
                      marginTop: scale(5),
                    }}
                  >
                    {this.state.product.name}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 23,
                    fontWeight: "bold",
                    marginRight: scale(10),
                  }}
                >
                  {this.state.product.price} EGP
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    marginLeft: scale(10),
                    marginTop: scale(10),
                  }}
                >
                  Short dress in soft cotton jersey with decorative buttons down
                  the front and a wide, frill-trimmed square neckline with
                  concealed elastication. Elasticated seam under the bust and
                  short puff sleeves with a small frill trim.
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ParallaxHeader>
        {/* </SafeAreaView> */}
      </>
    );
  }
}

export default ProductView;
