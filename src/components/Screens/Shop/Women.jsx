import { Button } from "galio-framework";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, RefreshControl, View } from "react-native";
import CircularCard from "react-native-circular-card-view";

import { axios } from "../../../Config/Axios";
import { ScrollView } from "react-native-gesture-handler";

export default class ShopScreen extends Component {
  state = {
    brands: [],
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
      .get("/women-brands")
      .then(res => {
        this.setState({ brands: res.data.response.data });
      })
      .catch(err => {
        console.log(err.data);
      });
  }
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
            // refreshControl={() => {
            //   <RefreshControl  />;
            // }}
          >
            {this.state.brands.map(e => {
              return (
                <View style={{ marginBottom: "3%" }}>
                  <CircularCard
                    key={e.id}
                    title={e.brand}
                    titleStyle={{
                      fontSize: 34,
                      alignSelf: "center",
                      justifyContent: "center",
                      marginTop: "15%",
                    }}
                    color={"white"}
                    source={{ uri: e.brand_image }}
                    priceText={""}
                    description={""}
                    onPress={() => alert(e.brand)}
                    // rippleColor={rippleColor}
                    // style={{ alignSelf: "center" }}
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
