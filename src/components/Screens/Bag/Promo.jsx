import React, { useState } from "react";
import { Component } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { axios } from "../../../Config/Axios";

import styles from "./styles";
// const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

export class Promo extends Component {
  state = {
    value: "",
    err: "",
  };

  checkPromo = () => {
    axios
      .post("/checkPromo", { promo: this.state.value })
      .then(res => {
        console.log(res.data.response.data);
        this.props.closeModal(false);
      })
      .catch(err => {
        if (err.response.data.status == 404) {
          this.setState({
            err: "Promo Code Do not Exist",
          });
        }
        // console.log(err.response.data.status);
      });
  };

  render() {
    console.log(this.state.value);
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Enter Your Promo Code</Text>
        <CodeField
          ref={this.props.refs}
          {...this.props}
          value={this.state.value}
          onChangeText={e => {
            this.setState({ value: e });
          }}
          cellCount={7}
          rootStyle={styles.codeFieldRoot}
          keyboardType="default"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              // onLayout={this.props.getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <Text
          style={{
            fontSize: 15,
            color: "red",
            alignSelf: "center",
            marginTop: "5%",
          }}
        >
          {this.state.err}
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#28AE7B",
              borderRadius: 50,
              // height: 40,
              width: "85%",
              paddingVertical: 15,
              marginTop: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            disabled={this.state.value == "" ? true : false}
            onPress={this.checkPromo}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                textTransform: "uppercase",
              }}
            >
              check
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
// export const Promo = () => {
//   const [value, setValue] = useState("");
//   const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
//   const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//     value,
//     setValue,
//   });

//   return (
//     <SafeAreaView style={styles.root}>
//       <Text style={styles.title}>Enter Your Promo Code</Text>
//       <CodeField
//         ref={ref}
//         {...props}
//         value={value}
//         onChangeText={setValue}
//         cellCount={CELL_COUNT}
//         rootStyle={styles.codeFieldRoot}
//         keyboardType="default"
//         textContentType="oneTimeCode"
//         renderCell={({ index, symbol, isFocused }) => (
//           <View
//             // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
//             onLayout={getCellOnLayoutHandler(index)}
//             key={index}
//             style={[styles.cellRoot, isFocused && styles.focusCell]}
//           >
//             <Text style={styles.cellText}>
//               {symbol || (isFocused ? <Cursor /> : null)}
//             </Text>
//           </View>
//         )}
//       />
//       <View style={{ justifyContent: "center", alignItems: "center" }}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: "#28AE7B",
//             borderRadius: 50,
//             // height: 40,
//             width: "85%",
//             paddingVertical: 15,
//             marginTop: 50,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           // onPress={props.onPressOut(props.close(false))}
//         >
//           <Text
//             style={{
//               color: "#fff",
//               fontSize: 18,
//               textTransform: "uppercase",
//             }}
//           >
//             check
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };
