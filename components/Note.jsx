import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRef } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { deleteNote } from "../service/API/notes";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoadgin } from "../redux/slices";
import { storageGetToken } from "../service/storage/token";

export const Note = ({ noteInfo, setNotes }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const dispatch = useDispatch();

  const openMenu = () => {
    ref.current?.open();
  };

  const onDelete = async () => {
    dispatch(enableLoading());
    try {
      await deleteNote(noteInfo.id, storageGetToken());
      setNotes((prev) => [...prev].filter((item) => item.id !== noteInfo.id));
    } catch (err) {
      console.log(err);
    }
    dispatch(disableLoadgin());
  };

  return (
    <Menu ref={ref}>
      <MenuTrigger customStyles={{ TriggerTouchableComponent: View }}>
        <TouchableOpacity
          onPress={openMenu}
          style={{ ...styles.block, borderColor: theme.colors.border }}
        >
          <Text style={{ ...styles.text, color: theme.colors.text }}>
            {noteInfo.text}
          </Text>
        </TouchableOpacity>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: "#333",

            borderRadius: 8,
            marginTop: 20,
          },
          optionWrapper: {
            padding: 15,
          },
          optionText: {
            color: theme.colors.text,
            fontSize: 16,
          },
        }}
      >
        <MenuOption onSelect={() => {}} text="Редагувати"></MenuOption>
        <MenuOption onSelect={onDelete} text="Видалити"></MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  block: { marginTop: 20, borderWidth: 1, padding: 20, borderRadius: 10 },
  text: { fontSize: 16 },
});
