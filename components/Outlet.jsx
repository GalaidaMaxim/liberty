import { View, Pressable, Text, StyleSheet } from "react-native";
import { logout } from "../service/API/auth";
import * as SecureStore from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";
import { useUser } from "../redux/selectors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

export const Outlet = ({ children, navigation }) => {
  const user = useUser();
  const route = useRoute();
  const theme = useTheme();

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
    <SafeAreaView style={{ flex: 1 }}>
      {user && (
        <View style={styles.header}>
          <Text style={{ ...styles.name, color: theme.colors.text }}>
            {route.params?.dictionary
              ? route.params.dictionary.name
              : user.name}
          </Text>
          <Pressable
            style={{ ...styles.logout, borderColor: theme.colors.border }}
            onPressIn={onLogout}
          >
            <Text style={{ color: theme.colors.text }}>Logout</Text>
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
    paddingBottom: 5,
    boxShadow: "0px 10px 10px rgba(0, 0, 0,0.1)",
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
