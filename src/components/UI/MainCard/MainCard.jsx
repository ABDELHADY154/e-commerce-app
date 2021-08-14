import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import Icon from "react-native-vector-icons/FontAwesome";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

export default class CardEcomOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: "0.0",
      icon: "star",
      nbStar: 0,
      iconColor: "#000000",
      selectColor: "#000000",
      colorList: [],
      image: "",
      color: this.props.selectColor,
    };
  }
  colorSelect = color => {
    this.props.getSelectColor(color);
    this.setState({ color: color });
  };
  render() {
    const {
      title,
      price,
      image,
      icon,
      nbStar,
      iconColor,
      sale,
      brand,
      selectColor,
      colorList,
    } = this.props;
    const { color } = this.state;
    return (
      <View
        style={{
          backgroundColor: "transparent",
          alignSelf: "center",
          margin: 10,
          flexDirection: "column",
          width: screenWidth - screenWidth * 0.35,
          borderWidth: 0,
          borderRadius: 12,
          elevation: 2,
          shadowColor: "#777",
          shadowOpacity: 0.16,
          shadowRadius: 3,
          shadowOffset: {
            height: 1,
            width: 0,
          },
        }}
      >
        <View
          style={{
            borderTopLeftRadius: scale(12),
            borderTopRightRadius: scale(12),
            backgroundColor: "transparent",
            height: "100%",
          }}
        >
          <Image
            borderTopRightRadius={12}
            borderTopLeftRadius={12}
            source={image}
            style={{
              width: screenWidth - screenWidth * 0.35,
              height: "95%",
              resizeMode: "cover",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            zIndex: 1,
            flex: 1,
            marginTop: -scale(135),
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.onClicked1()}
            style={[
              {
                justifyContent: "center",
                zIndex: 3,
                alignItems: "center",
                alignSelf: "flex-end",
                width: scale(50),
                height: scale(50),
                margin: 10,
                shadowRadius: 5,
                borderRadius: scale(40),
                backgroundColor: this.props.iconBackground1,
              },
            ]}
          >
            <Icon
              name={this.props.icon1}
              color={this.props.iconColor1}
              size={scale(20)}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            height: "30%",
            marginTop: scale(-12),
            borderBottomLeftRadius: scale(12),
            borderBottomRightRadius: scale(12),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View
              style={{
                backgroundColor: "transparent",
                flex: 3,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: scale(18),
                  marginLeft: scale(12),
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: scale(14),
                  marginLeft: scale(12),
                }}
              >
                {brand}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: scale(12),
                  marginTop: scale(5),
                }}
              >
                {/* {colorList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.colorSelect(item)}
                      key={index}
                      style={{
                        backgroundColor: "#fff",
                        height: 20,
                        width: 20,
                        marginRight: 5,
                        borderRadius: scale(50),
                        borderWidth: color == item ? 6 : 10,
                        borderColor: item,
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    />
                  );
                })} */}
              </View>
              <View
                style={{
                  justifyContent: "space-evenly",
                  alignSelf: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    // marginTop: "5%",
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: scale(16),
                      // margin: scale(12),
                      textDecorationLine: "line-through",
                    }}
                  >
                    {price}
                  </Text>
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: scale(16),
                      margin: scale(12),
                      marginLeft: "4%",
                    }}
                  >
                    {sale}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#fff",
                    // flex: 1,
                    // position: "absolute",
                    // bottom: scale(26),
                    // right: 10,
                    flexDirection: "row",
                    borderBottomRightRadius: scale(12),
                    justifyContent: "center",
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
                      size={scale(15)}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
