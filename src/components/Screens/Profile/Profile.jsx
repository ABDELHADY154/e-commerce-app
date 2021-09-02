import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
  Platform,
  Alert,
} from "react-native";
import { Block, Text, theme, Button as GaButton } from "galio-framework";
import { Button } from "galio-framework";
import { Component } from "react";
import { axios } from "../../../Config/Axios";
import { Avatar } from "react-native-elements";
import { ListItem } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
class Profile extends Component {
  state = {
    name: "",
    email: "",
    image: "",
    pickedImage: "",
  };

  afterImageUpload = async () => {
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
  grantAccess = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "Sorry, we need camera roll permissions to upload your profile image!",
        );
      }
      if (status == "granted") {
        this.pickImage();
      }
    }
  };
  getGalleryAccess = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status == "undetermined") {
      Alert.alert(
        "Gallery Access",
        "please allow us to access your gallery to upload your new profile image !",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              this.grantAccess();
            },
          },
        ],
        { cancelable: false },
      );
    } else {
      this.pickImage();
    }
  };
  uploadImage = async () => {
    var formData = new FormData();
    let uriParts = this.state.pickedImage.split(".");
    let fileType = uriParts[uriParts.length - 1];
    formData.append("image", {
      uri: this.state.pickedImage,
      name: `${this.state.name}.${fileType}`,
      type: `image/${fileType}`,
    });

    await axios({
      method: "post",
      url: "/clientUpdateImage",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(e => {
        // console.log(e);
        this.afterImageUpload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  pickImage = async () => {
    if (Platform.OS !== "web") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ pickedImage: result.uri });
        this.uploadImage();
      }
    }
  };

  render() {
    console.log(this.state.image);
    return (
      <>
        <View
          style={{
            // flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            shadowColor: "#1E1F28",
            shadowRadius: 20,
            // shadowOffset: 0.2,
            shadowOpacity: 0.7,
          }}
        >
          <ImageBackground
            // source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* <View> */}
              <View
                style={{
                  marginTop: "18%",
                  alignSelf: "center",
                }}
              >
                {this.state.image != "" ? (
                  <Avatar
                    size="xlarge"
                    color="#ABB4BD"
                    containerStyle={{ justifyContent: "flex-end" }}
                    rounded
                    source={
                      this.state.image !== "" ? { uri: this.state.image } : ""
                    }
                  >
                    <Avatar.Accessory
                      size={30}
                      color="#2A2C36"
                      onPress={this.getGalleryAccess}
                    />
                  </Avatar>
                ) : (
                  <Text></Text>
                )}
              </View>
              <View
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5%",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "900",
                      fontSize: 26,
                      alignSelf: "center",
                    }}
                    color="#fff"
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
                      opacity: 0.6,
                    }}
                  >
                    {this.state.email}
                  </Text>
                </View>
              </View>
              {/* </View> */}
            </View>
          </ImageBackground>
        </View>
        <ScrollView>
          <View
            style={{ flex: 1, justifyContent: "flex-start", marginTop: "2%" }}
          >
            <ListItem
              bottomDivider
              containerStyle={{ backgroundColor: "transparent" }}
              onPress={() => {
                this.props.navigation.push("Order");
              }}
            >
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={{ color: "white" }}>My Orders</Text>
                </ListItem.Title>
                <ListItem.Subtitle>
                  <Text style={{ color: "white" }}>already have 12 orders</Text>
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="white" />
            </ListItem>
            <ListItem
              bottomDivider
              containerStyle={{ backgroundColor: "transparent" }}
              onPress={() => {
                this.props.navigation.push("clientAddresses");
              }}
            >
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={{ color: "white" }}>My Addresses</Text>
                </ListItem.Title>
                <ListItem.Subtitle>
                  <Text style={{ color: "white" }}>
                    already have 3 addresses
                  </Text>
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="white" />
            </ListItem>
            <ListItem
              bottomDivider
              containerStyle={{ backgroundColor: "transparent" }}
            >
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={{ color: "white" }}>Settings</Text>
                </ListItem.Title>
                <ListItem.Subtitle>
                  <Text style={{ color: "white" }}>
                    Personal Information, Password
                  </Text>
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="white" />
            </ListItem>

            <Button
              onPress={() => {
                this.props.logout();
              }}
              color="red"
              round
              style={{ alignSelf: "center", marginTop: "7%" }}
            >
              Logout
            </Button>
          </View>
        </ScrollView>
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
