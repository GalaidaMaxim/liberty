import { Outlet } from "../components/Outlet";
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import { AddDictionaryModal } from "../components/AddDictionaryMoad.";
import { useState } from "react";
import { DictionaryCard } from "../components/DictionaryCard";
import { useDictionareis } from "../redux/selectors";
import { useTheme } from "@react-navigation/native";
import penTool from "../assets/penTool.png";

export const MainScreen = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dictionareis = useDictionareis();
  const theme = useTheme();

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
        style={{ ...styles.aboluteViev, backgroundColor: theme.colors.border }}
      >
        <Image source={penTool} />
      </TouchableHighlight>
    </Outlet>
  );
};

const styles = StyleSheet.create({
  aboluteViev: {
    position: "absolute",
    bottom: 60,
    right: 10,
    padding: 16,
    borderRadius: "50%",
  },
  mainScroll: {
    paddingTop: 20,
    paddingLeft: 11,
    paddingRight: 11,
    alignItems: "center",
  },
});
