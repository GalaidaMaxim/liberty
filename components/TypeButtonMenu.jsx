import { MenuView } from "@react-native-menu/menu";
import { useRef } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import { buttonBase } from "../styles/global";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { deleteTypeThunk } from "../redux/operations";
import { storageGetToken } from "../service/storage/token";

export const TypeButtonMenu = ({ type, openEditModal = () => {} }) => {
  const ref = useRef(null);
  const theme = useTheme();
  const dispatch = useDispatch();

  const openMenu = () => {
    ref.current?.open();
  };

  const onDelete = () => {
    dispatch(deleteTypeThunk({ id: type.id, token: storageGetToken() }));
  };
  return (
    <>
      <Menu ref={ref}>
        <MenuTrigger customStyles={{ TriggerTouchableComponent: View }}>
          <TouchableHighlight onLongPress={openMenu} style={styles.blueButton}>
            <Text style={styles.buttonText}>{type.name}</Text>
          </TouchableHighlight>
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: "#333",

              borderRadius: 8,
              marginTop: 50,
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
          <MenuOption
            text="Редагувати"
            onSelect={() => openEditModal(type)}
          ></MenuOption>
          <MenuOption text="Видалити" onSelect={onDelete}></MenuOption>
        </MenuOptions>
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  typeList: { padding: 10, flexDirection: "row", maxHeight: 60 },
  button: {
    ...buttonBase,
    borderBlockColor: "black",
    borderWidth: 1,
  },
  blueButton: {
    ...buttonBase,
    backgroundColor: "rgb(46, 129, 255)",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  wordsList: {
    flex: 1,
  },
});
