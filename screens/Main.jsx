import AntDesign from "@expo/vector-icons/AntDesign";
import { Outlet } from "../components/Outlet";
import { View, StyleSheet } from "react-native";

export const MainScreen = ({ navigation }) => {
  return (
    <Outlet navigation={navigation}>
      <View style={styles.aboluteViev}>
        <AntDesign name="pluscircleo" size={50} color="black" />
      </View>
    </Outlet>
  );
};

const styles = StyleSheet.create({
  aboluteViev: {
    position: "absolute",
    bottom: 60,
    right: 10,
  },
});
