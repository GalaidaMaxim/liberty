import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRef } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import corst from "../assets/cross.png";
import { deleteNote } from "../service/API/notes";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoadgin } from "../redux/slices";
import { storageGetToken } from "../service/storage/token";

export const Note = ({ noteInfo, setNotes, setNoteToEdit }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const dispatch = useDispatch();

  const openMenu = () => {
    ref.current?.open();
  };

  const onEdit = () => {
    setNoteToEdit(noteInfo);
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
          onLongPress={openMenu}
          style={{
            ...styles.block,
            borderColor: theme.colors.border,
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: theme.colors.text,
              fontFamily: theme.fontFamily,
            }}
          >
            {noteInfo.text}
          </Text>
          <Pressable onPress={onDelete} style={{ ...styles.crosButton }}>
            <Image source={corst} />
          </Pressable>
        </TouchableOpacity>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: theme.colors.background,
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
        <MenuOption onSelect={onEdit} text="Редагувати"></MenuOption>
        <MenuOption onSelect={onDelete} text="Видалити"></MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  block: {
    marginTop: 20,
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 25,
    paddingBottom: 10,
    borderRadius: 10,
    position: "relative",
  },
  text: { fontSize: 20, lineHeight: 20 },
  crosButton: {
    position: "absolute",
    width: 20,
    height: 20,
    right: 5,
    top: 10,
  },
});
