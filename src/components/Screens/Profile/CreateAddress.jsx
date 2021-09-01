import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Input } from "galio-framework";
import { Button } from "galio-framework";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../../../Config/Axios";
import { Header } from "react-native-elements/dist/header/Header";
import { scale } from "react-native-size-matters";
import DropDownPicker from "react-native-dropdown-picker";
// import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native";
import { Checkbox } from "galio-framework";

export default class SignUp extends Component {
  state = {
    nameBorder: "",
    name: "",
    nameErr: "",
    regionBorder: "",
    region: "",
    regionErr: "",
    loading: false,
    citiesList: [
      { label: "Alexandria", value: "Alexandria" },
      { label: "Cairo", value: "Cairo" },
    ],
    city: "",
    cityErr: "",
    cityBorder: "",
    open: false,
    streetNameBorder: "",
    streetName: "",
    streetNameErr: "",
    buildingNumberBorder: "",
    buildingNumber: "",
    buildingNumberErr: "",
    floorBorder: "",
    floor: "",
    floorErr: "",
    appartmentNumberBorder: "",
    appartmentNumber: "",
    appartmentNumberErr: "",
    checkBox: false,
  };

  submit = () => {
    this.setState({
      nameErr: "",
      loading: true,
      nameBorder: "",
      cityErr: "",
      cityBorder: "",
      regionBorder: "",
      regionErr: "",
      streetNameBorder: "",
      streetNameErr: "",
      buildingNumberBorder: "",
      buildingNumberErr: "",
      floorBorder: "",
      floorErr: "",
      appartmentNumberBorder: "",
      appartmentNumberErr: "",
    });
    var body = {
      name: this.state.name,
      city: this.state.city,
      building_no: this.state.buildingNumber,
      floor: this.state.floor,
      appartment_no: this.state.appartmentNumber,
      region: this.state.region,
      street_name: this.state.streetName,
      default: this.state.checkBox,
    };

    axios
      .post("/clientAddress", body)
      .then(response => {
        this.setState({
          loading: false,
        });
        this.props.navigation.push("clientAddresses", { refresh: true });
      })

      .catch(error => {
        // console.log(error.response.data);
        if (error.response) {
          if (error.response.data.errors.name) {
            this.setState({
              nameErr: error.response.data.errors.name,
              nameBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.city) {
            this.setState({
              cityErr: error.response.data.errors.city,
              cityBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.region) {
            this.setState({
              regionErr: error.response.data.errors.region,
              regionBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.street_name) {
            this.setState({
              streetNameErr: error.response.data.errors.street_name,
              streetNameBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.building_no) {
            this.setState({
              buildingNumberErr: error.response.data.errors.building_no,
              buildingNumberBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.floor) {
            this.setState({
              floorErr: error.response.data.errors.floor,
              floorBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.appartment_no) {
            this.setState({
              appartmentNumberErr: error.response.data.errors.appartment_no,
              appartmentNumberBorder: "red",
              loading: false,
            });
          }
        }
      });
  };
  componentDidMount() {
    if (this.props.route.params.id) {
      axios
        .get(`clientAddress/${this.props.route.params.id}`)
        .then(res => {
          this.setState({
            name: res.data.response.data.address.name,
            region: res.data.response.data.address.region,
            city: res.data.response.data.address.city,
            streetName: res.data.response.data.address.street_name,
            buildingNumber: res.data.response.data.address.building_no,
            floor: res.data.response.data.address.floor,
            appartmentNumber: res.data.response.data.address.appartment_no,
            checkBox:
              res.data.response.data.address.default == 1 ? true : false,
          });
        })
        .catch(err => {});
    }
  }
  setOpen = open => {
    this.setState({
      open,
    });
  };

  setValue = callback => {
    this.setState(state => ({
      city: callback(state.value),
    }));
  };

  setItems = callback => {
    this.setState(state => ({
      items: callback(state.items),
    }));
  };

  onUpdateHandler = id => {
    this.setState({
      nameErr: "",
      loading: true,
      nameBorder: "",
      cityErr: "",
      cityBorder: "",
      regionBorder: "",
      regionErr: "",
      streetNameBorder: "",
      streetNameErr: "",
      buildingNumberBorder: "",
      buildingNumberErr: "",
      floorBorder: "",
      floorErr: "",
      appartmentNumberBorder: "",
      appartmentNumberErr: "",
    });
    var body = {
      name: this.state.name,
      city: this.state.city,
      building_no: this.state.buildingNumber,
      floor: this.state.floor,
      appartment_no: this.state.appartmentNumber,
      region: this.state.region,
      street_name: this.state.streetName,
      default: this.state.checkBox,
    };

    axios
      .put(`/clientAddress/${id}`, body)
      .then(response => {
        this.setState({
          loading: false,
        });
        this.props.navigation.push("clientAddresses", { refresh: true });
      })

      .catch(error => {
        // console.log(error.response.data);
        if (error.response) {
          if (error.response.data.errors.name) {
            this.setState({
              nameErr: error.response.data.errors.name,
              nameBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.city) {
            this.setState({
              cityErr: error.response.data.errors.city,
              cityBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.region) {
            this.setState({
              regionErr: error.response.data.errors.region,
              regionBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.street_name) {
            this.setState({
              streetNameErr: error.response.data.errors.street_name,
              streetNameBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.building_no) {
            this.setState({
              buildingNumberErr: error.response.data.errors.building_no,
              buildingNumberBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.floor) {
            this.setState({
              floorErr: error.response.data.errors.floor,
              floorBorder: "red",
              loading: false,
            });
          }
          if (error.response.data.errors.appartment_no) {
            this.setState({
              appartmentNumberErr: error.response.data.errors.appartment_no,
              appartmentNumberBorder: "red",
              loading: false,
            });
          }
        }
      });
  };

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
            text: "Shipping Address",
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
        />
        <SafeAreaView
          style={{
            backgroundColor: "#1E1F28",
            flex: 1,
          }}
        >
          <ScrollView>
            <View
              style={{
                width: "90%",
                flex: 1,
                alignSelf: "center",
                marginTop: "10%",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <Input
                    placeholder="Name"
                    placeholderTextColor="#ABB4BD"
                    bgColor="#2A2C36"
                    color="#F5F5F5"
                    style={{ borderColor: this.state.nameBorder }}
                    rounded
                    value={this.state.name}
                    onChangeText={value => {
                      this.setState({ name: value });
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: "red",
                      alignSelf: "flex-start",
                    }}
                  >
                    {this.state.nameErr}
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>City</Text>

                  <DropDownPicker
                    open={this.state.open}
                    value={this.state.city}
                    items={this.state.citiesList}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                    placeholderStyle={{
                      color: "#ABB4BD",
                    }}
                    style={{
                      backgroundColor: "#2A2C36",
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: this.state.cityBorder,
                    }}
                    listMode="MODAL"
                    modalContentContainerStyle={{
                      backgroundColor: "#2A2C36",
                    }}
                    modalProps={{
                      animationType: "slide",
                    }}
                    listItemLabelStyle={{
                      color: "#fff",
                      fontSize: scale(20),
                    }}
                    iconContainerStyle={{
                      backgroundColor: "#fff",
                    }}
                    theme="DARK"
                    textStyle={{
                      color: this.state.open ? "#000" : "#F5F5F5",
                    }}
                    containerStyle={{
                      backgroundColor: "#2A2C36",
                      borderRadius: 50,
                      borderWidth: 0,
                    }}
                    placeholder="Select City"
                  />

                  <Text
                    style={{
                      fontSize: 15,
                      color: "red",
                      alignSelf: "flex-start",
                    }}
                  >
                    {this.state.cityErr}
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Region</Text>
                  <Input
                    placeholder="Region"
                    placeholderTextColor="#ABB4BD"
                    bgColor="#2A2C36"
                    value={this.state.region}
                    color="#F5F5F5"
                    style={{ borderColor: this.state.regionBorder }}
                    rounded
                    onChangeText={value => {
                      this.setState({ region: value });
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: "red",
                      alignSelf: "flex-start",
                    }}
                  >
                    {this.state.regionErr}
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Street Name</Text>
                  <Input
                    placeholder="Street Name"
                    placeholderTextColor="#ABB4BD"
                    bgColor="#2A2C36"
                    value={this.state.streetName}
                    color="#F5F5F5"
                    style={{ borderColor: this.state.streetNameBorder }}
                    rounded
                    onChangeText={value => {
                      this.setState({ streetName: value });
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: "red",
                      alignSelf: "flex-start",
                    }}
                  >
                    {this.state.streetNameErr}
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Building Number</Text>
                  <Input
                    placeholder="Building Number"
                    placeholderTextColor="#ABB4BD"
                    bgColor="#2A2C36"
                    color="#F5F5F5"
                    value={this.state.buildingNumber}
                    style={{ borderColor: this.state.buildingNumberBorder }}
                    rounded
                    onChangeText={value => {
                      this.setState({ buildingNumber: value });
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: "red",
                      alignSelf: "flex-start",
                    }}
                  >
                    {this.state.buildingNumberErr}
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Floor</Text>
                  <Input
                    placeholder="Floor"
                    placeholderTextColor="#ABB4BD"
                    bgColor="#2A2C36"
                    value={this.state.floor}
                    color="#F5F5F5"
                    style={{ borderColor: this.state.floorBorder }}
                    rounded
                    onChangeText={value => {
                      this.setState({ floor: value });
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: "red",
                      alignSelf: "flex-start",
                    }}
                  >
                    {this.state.floorErr}
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Appartment Number</Text>
                  <Input
                    placeholder="Appartment Number"
                    placeholderTextColor="#ABB4BD"
                    bgColor="#2A2C36"
                    color="#F5F5F5"
                    value={this.state.appartmentNumber}
                    style={{ borderColor: this.state.appartmentNumberBorder }}
                    rounded
                    onChangeText={value => {
                      this.setState({ appartmentNumber: value });
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: "red",
                      alignSelf: "flex-start",
                      marginBottom: scale(10),
                    }}
                  >
                    {this.state.appartmentNumberErr}
                  </Text>
                </View>
                {!this.props.route.params.id ? (
                  <View style={styles.inputContainer}>
                    {/* <Text style={styles.inputLabel}>Appartment Number</Text> */}
                    <Checkbox
                      color="white"
                      checkboxStyle={{ marginLeft: scale(5) }}
                      iconFamily="font-awesome"
                      iconName="check"
                      iconColor="#2A2C36"
                      initialValue={this.state.checkBox}
                      value={this.state.checkBox}
                      label="Use as the default shipping address"
                      labelStyle={{ color: "#fff" }}
                      onChange={() => {
                        this.setState({
                          checkBox: !this.state.checkBox,
                        });
                      }}
                    />
                    {/* <Text
                    style={{
                      fontSize: 15,
                      color: "red",
                      alignSelf: "flex-start",
                    }}
                  >
                    {this.state.nameErr}
                  </Text> */}
                  </View>
                ) : (
                  <Text></Text>
                )}
                {this.props.route.params.id ? (
                  <Button
                    round
                    // uppercase
                    style={{
                      alignSelf: "center",
                      marginTop: "5%",
                      marginBottom: "10%",
                    }}
                    color="#28AE7B"
                    size="large"
                    loading={this.state.loading}
                    loadingSize="small"
                    onPress={() => {
                      this.onUpdateHandler(this.props.route.params.id);
                    }}
                  >
                    Save Adress
                  </Button>
                ) : (
                  <Button
                    round
                    // uppercase
                    style={{
                      alignSelf: "center",
                      marginTop: "5%",
                      marginBottom: "10%",
                    }}
                    color="#28AE7B"
                    size="large"
                    loading={this.state.loading}
                    loadingSize="small"
                    onPress={this.submit}
                  >
                    Add Adress
                  </Button>
                )}
              </View>

              {/* <View
            style={{
              // flex: 1,
              flexDirection: "column",
              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5%",
              // justifySelf: "flex-end",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                color: "#F5F5F5",
                marginBottom: "4%",
              }}
            >
              Or Sign Up With Social Account
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                raised
                name="google"
                type="font-awesome"
                color="#EA4335"
                onPress={() => console.log("hello")}
              />
              <Icon
                raised
                name="facebook"
                type="font-awesome"
                color="#3B5998"
                onPress={() => console.log("hello")}
              />
            </View>
          </View> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    // marginBottom: "10%",
  },
  headerText: {
    color: "#F6F6F6",
    fontSize: 34,
    alignSelf: "center",
  },
  inputContainer: {
    // marginTop: "5%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  inputLabel: {
    fontSize: 20,
    color: "#F5F5F5",
    marginBottom: "2%",
  },
});
