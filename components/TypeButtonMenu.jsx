import { useRef } from "react";
import { TouchableHighlight, Text, View } from "react-native";
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

export const TypeButtonMenu = ({
  type,
  openEditModal = () => {},
  styles,
  selectedType,
  setSelectedType,
}) => {
  const ref = useRef(null);
  const theme = useTheme();
  const dispatch = useDispatch();

  const openMenu = () => {
    ref.current?.open();
  };

  const onDelete = () => {
    dispatch(deleteTypeThunk({ id: type.id, token: storageGetToken() }));
    setSelectedType(-1);
  };
  return (
    <>
      <Menu ref={ref}>
        <MenuTrigger customStyles={{ TriggerTouchableComponent: View }}>
          <TouchableHighlight
            onPress={() => setSelectedType(type.id)}
            onLongPress={openMenu}
            style={{
              ...styles.blueButton,
              ...(type.id !== selectedType ? {} : styles.highlited),
              backgroundColor: theme.colors.border,
            }}
          >
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
