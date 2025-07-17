import { View, Pressable, Text, StyleSheet } from "react-native";
import { logout } from "../service/API/auth";
import * as SecureStore from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";
import { useUser } from "../redux/selectors";
import { SafeAreaView } from "react-native-safe-area-context";

export const Outlet = ({ children, navigation }) => {
  const user = useUser();

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
    <SafeAreaView style={{ flex: 1, outlineColor: "green", outlineWidth: 2 }}>
      {user && (
        <View style={styles.header}>
          <Text style={styles.name}>{user.name}</Text>
          <Pressable style={styles.logout} onPressIn={onLogout}>
            <Text>Logout</Text>
          </Pressable>
        </View>
      )}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  name: {
    fontSize: 24,
  },
  logout: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderWidth: 2,
  },
});
