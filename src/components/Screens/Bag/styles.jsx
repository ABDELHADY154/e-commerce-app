import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: "center", fontSize: 30, color: "#fff" },
  codeFieldRoot: {
    marginTop: 20,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#fff",
  },
  cellRoot: {
    width: 41,
    height: 41,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    color: "#fff",
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
    color: "#fff",
  },
  focusCell: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2,
  },
});
