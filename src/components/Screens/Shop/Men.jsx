import { Button } from "galio-framework";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../../Config/Axios";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { Alert, View } from "react-native";
import { CardEcomOne } from "react-native-card-ui";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "react-native-elements/dist/header/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import CircularCard from "react-native-circular-card-view";
import Card from "../../UI/CategoryCard/CategoryCard";
import { scale } from "react-native-size-matters";
import { RefreshControl } from "react-native";
const Tab = createMaterialTopTabNavigator();

export default class ShopScreen extends Component {
  state = {
    brands: [],
    refresh: true,
  };

  async componentDidMount() {
    var userToken = await AsyncStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    await axios
      .get(`/clientProfile`)
      .then(res => {})
      .catch(err => {
        if (err.response.data.status == 401) {
          AsyncStorage.removeItem("userData");
          AsyncStorage.removeItem("userToken");
          AsyncStorage.removeItem("config");
          axios.defaults.headers.common["Authorization"] = ``;
          this.props.logout();
        }
      });
    await axios
      .get("/men-brands")
      .then(res => {
        this.setState({ brands: res.data.response.data, refresh: false });
      })
      .catch(err => {
        console.log(err.data);
      });
  }
  onRefresh = async () => {
    this.setState({
      refresh: true,
    });
    await axios
      .get("/men-brands")
      .then(res => {
        this.setState({ brands: res.data.response.data, refresh: false });
      })
      .catch(err => {
        console.log(err.data);
      });
  };
  render() {
    return (
      <>
        <SafeAreaView
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        >
          <ScrollView
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={this.onRefresh}
                tintColor="white"
              />
            }
          >
            {this.state.brands.map(e => {
              return (
                <View
                  style={{
                    marginBottom: "3%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={e.id}
                >
                  <Card
                    key={e.id}
                    titleText={e.brand}
                    width={scale(300)}
                    height={scale(80)}
                    imageSource={{ uri: e.brand_image }}
                    onPress={() =>
                      this.props.navigation.push("category", {
                        id: e.id,
                        name: e.brand,
                      })
                    }
                  />
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
