import AntDesign from "@expo/vector-icons/AntDesign";
import { Outlet } from "../components/Outlet";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { AddDictionaryModal } from "../components/AddDictionaryMoad.";
import { useState } from "react";
import { useDictionareis } from "../redux/selectors";
export const MainScreen = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dictionareis = useDictionareis();
  console.log(dictionareis);

  return (
    <Outlet navigation={navigation}>
      <AddDictionaryModal open={modalOpen} setOpen={setModalOpen} />
      <TouchableHighlight
        onPressIn={() => setModalOpen(true)}
        style={styles.aboluteViev}
      >
        <AntDesign name="pluscircleo" size={50} color="black" />
      </TouchableHighlight>
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
