import Axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// async function token() {
//   try {
//     var token = await AsyncStorage.getItem("userToken");
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// }

// var getToken = token();
// console.log(getToken);
export const axios = Axios.create({
  baseURL: "https://admin.beamstore.net/api",
});

// console.log(getToken);

// const token = async () => {
//   try {

//   fdgthdfghdfgdfg  var userToken = await AsyncStorage.getItem("userToken");

//     return (axios.defaults.headers.common["Authorization"] =
//       "Bearer " + userToken);
//   } catch (e) {
//     console.log(e);
//   }
// };
// token();
// axios.defaults.headers.common["Authorization"] = "";
