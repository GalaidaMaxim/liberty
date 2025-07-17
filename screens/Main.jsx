import AntDesign from "@expo/vector-icons/AntDesign";
import { Outlet } from "../components/Outlet";
import { ScrollView, StyleSheet, TouchableHighlight } from "react-native";
import { AddDictionaryModal } from "../components/AddDictionaryMoad.";
import { useState } from "react";
import { DictionaryCard } from "../components/DictionaryCard";
import { useDictionareis } from "../redux/selectors";

export const MainScreen = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dictionareis = useDictionareis();

  return (
    <Outlet navigation={navigation}>
      <ScrollView contentContainerStyle={styles.mainScroll}>
        {dictionareis.map((item) => (
          <DictionaryCard dictionary={item} key={item.id} />
        ))}
      </ScrollView>
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
    backgroundColor: "white",
    borderRadius: "50%",
  },
  mainScroll: {
    paddingTop: 40,
    alignItems: "center",
  },
});
