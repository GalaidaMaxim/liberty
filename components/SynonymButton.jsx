import { useRef } from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useTheme } from "@react-navigation/native";

import { buttonBase } from "../styles/global";
import { useRoute } from "@react-navigation/native";

export const SynonymButton = ({ synonym, onPress, onDelete }) => {
  const ref = useRef(null);
  const theme = useTheme();

  const openMenu = () => {
    ref.current?.open();
  };

  return (
    <>
      <Menu ref={ref}>
        <MenuTrigger customStyles={{ TriggerTouchableComponent: View }}>
          <TouchableHighlight
            onPress={() => onPress(synonym)}
            onLongPress={openMenu}
            style={{
              ...styles.addSynonymButton,
              borderColor: theme.colors.border,
            }}
          >
            <Text style={{ color: theme.colors.text }}>{synonym.word}</Text>
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
            text="Видалити"
            onSelect={() => onDelete(synonym.id)}
          ></MenuOption>
        </MenuOptions>
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  synonymTytle: {
    fontSize: 20,
  },
  addSynonymButton: {
    ...buttonBase,
    borderWidth: 1,
  },
});
