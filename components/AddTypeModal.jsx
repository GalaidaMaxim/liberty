import {
  Modal,
  Button,
  Text,
  TextInput,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTypeThunk } from "../redux/operations";
import * as SecureStore from "expo-secure-store";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";

export const AddTypeModal = ({ open = true, setOpen = () => {} }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const route = useRoute();
  const theme = useTheme();

  const onAddPressed = async () => {
    dispatch(
      createTypeThunk({
        name,
        dictionaryID: route.params.dictionary.id,
        token: SecureStore.getItem("authToken"),
      })
    );
    setName("");
    setOpen(false);
  };

  return (
    <Modal animationType="fade" visible={open} transparent>
      <Pressable onPress={() => setOpen(false)} style={styles.backdrop}>
        <Pressable
          onPress={() => {}}
          style={{ ...styles.modal, backgroundColor: theme.colors.background }}
        >
          <View style={{ ...styles.mainView }}>
            <Text style={{ ...styles.title, color: theme.colors.text }}>
              Додати категорію
            </Text>
            <CustomInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Назва"
              style={{
                ...styles.input,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              placeholderTextColor={theme.colors.placeholder}
            />
            <CustomButton onPress={onAddPressed}>Додати</CustomButton>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  mainView: {
    gap: 20,
  },
  title: {
    fontSize: 30,
  },
  input: {},
  picker: {
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginTop: 10,
  },
});
