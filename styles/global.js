import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  input: {
    width: "100%",
    fontFamily: "Georgia",
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 30,
  },
});

export const buttonBase = {
  height: 30,
  minWidth: 30,

  justifyContent: "center",
  alignItems: "center",
  borderRadius: 15,
  boxShadow: "0px 4px 4px rgba(0,0,0,0.41)",
};
