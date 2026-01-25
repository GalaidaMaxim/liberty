import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { logout } from "../service/API/auth";
import * as SecureStore from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";
import { useUser } from "../redux/selectors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import personIcon from "../assets/personIcon.png";
import burger from "../assets/burger.png";
import { useNavigation } from "@react-navigation/native";
import backIcon from "../assets/backIcon.png";

export const Outlet = ({ children, navigation }) => {
  const user = useUser();
  const route = useRoute();
  const theme = useTheme();
  const nav = useNavigation();

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
        <View
          style={{ ...styles.header, backgroundColor: theme.colors.header }}
        >
          {nav.canGoBack() ? (
            <Pressable
              onPress={() => {
                nav.goBack();
              }}
            >
              <Image source={backIcon} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                nav.goBack();
              }}
            >
              <Image source={personIcon} />
            </Pressable>
          )}
          <Text style={{ ...styles.logo, fontFamily: theme.fontFamily }}>
            Lexigo
          </Text>
          <Pressable onPress={() => nav.openDrawer()}>
            <Image source={burger} />
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 11,
    paddingBottom: 11,
  },

  name: {
    fontSize: 24,
  },
  logo: {
    color: "#fefae3",
    fontSize: 32,
  },
  personIcon: {},
});
