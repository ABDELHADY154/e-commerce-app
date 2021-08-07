import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { Block, Text, theme, Button as GaButton } from "galio-framework";
import { Button } from "galio-framework";
import { Component } from "react";
import { axios } from "../../../Config/Axios";
const { width, height } = Dimensions.get("screen");
import { Avatar } from "react-native-elements";

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends Component {
  state = {
    name: "",
    email: "",
    image: "",
  };

  async componentDidMount() {
    await axios
      .get("/clientProfile")
      .then(res => {
        this.setState({
          name: res.data.response.data.name,
          email: res.data.response.data.email,
          image: res.data.response.data.image,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <Block
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <ImageBackground
          // source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block
              style={{
                width: width,
              }}
            >
              <Block middle style={{ top: height * 0.15 }}>
                {/* <Image
                  source={
                    this.state.image !== "" ? { uri: this.state.image } : ""
                  }
                  style={styles.avatar}
                /> */}
                <Avatar
                  size="xlarge"
                  rounded
                  source={
                    this.state.image !== "" ? { uri: this.state.image } : ""
                  }
                >
                  <Avatar.Accessory
                    size={40}
                    onPress={() => console.log("pressed")}
                  />
                </Avatar>
              </Block>
              <Block style={{ top: height * 0.2 }}>
                <Block middle>
                  <Text
                    style={{
                      // marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: "900",
                      fontSize: 26,
                      // marginTop: -30,
                      alignSelf: "center",
                    }}
                    color="#ffffff"
                  >
                    {this.state.name}
                  </Text>

                  <Text
                    size={16}
                    color="white"
                    style={{
                      marginTop: 5,

                      lineHeight: 20,
                      fontWeight: "bold",
                      fontSize: 18,
                      opacity: 0.8,
                    }}
                  >
                    {this.state.email}
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    width: "100%",
    height: 400,
    padding: 0,
    backgroundColor: "#1E1F28",
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
