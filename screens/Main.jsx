import { View, Text, Button } from "react-native";
import { logout } from "../service/API/auth";
import * as SecureStore from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";

export const MainScreen = ({ navigation }) => {
  const onLogout = async () => {
    const token = SecureStore.getItem("authToken");
    if (token) {
      try {
        await logout(token);
      } catch (err) {
        console.log(err);
      }
    }
    await SecureStore.deleteItemAsync("authToken");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Main screen</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};
