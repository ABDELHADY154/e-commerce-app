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
          {/*  <View 
           style={
              {
                // flex: 1,
                // justifyContent: "center",
                // alignItems: "center",
              }
            }
          >
          {/* <Image
              source={require("../../../assets/images/image2.png")}
              style={{
                height: "80%",
              }}
            /> */}
          <Pages containerStyle={{}}>
            <Image
              source={require("../../../assets/images/image2.png")}
              style={{
                // height: 700,
                width: "100%",
              }}
            />
            <Image
              source={require("../../../assets/images/image.png")}
              style={{
                // height: "100%",
                width: "100%",
              }}
            />
            <Image
              source={require("../../../assets/images/image2.png")}
              style={{
                // height: "100%",
                width: "100%",
              }}
            />
          </Pages>

          {/* <View style={{ marginLeft: 10, flex: 1 }}> */}
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
              marginLeft: 10,
              flex: 1,
              flexDirection: "row",
              marginTop: 50,
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
                Brand Name
              </Text>
              <Text
                style={{
                  color: "#D6D6D7",
                  fontSize: 14,
                }}
              >
                Short black dress
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 23,
                  fontWeight: "bold",
                }}
              >
                250 E.P
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                marginLeft: 10,
                // fontWeight: "bold",
                // justifyContent: "center",
              }}
            >
              Short dress in soft cotton jersey with decorative buttons down the
              front and a wide, frill-trimmed square neckline with concealed
              elastication. Elasticated seam under the bust and short puff
              sleeves with a small frill trim.
            </Text>
          </View>
          {/* </View> */}
        </ScrollView>
        {/* </SafeAreaView> */}
      </>
    );
  }
}

export default ProductView;
