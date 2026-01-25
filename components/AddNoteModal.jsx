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
import { createNote } from "../service/API/notes";
import { enableLoading, disableLoadgin } from "../redux/slices";
import { storageGetToken } from "../service/storage/token";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";

export const AddNoteModal = ({ open = true, setOpen = () => {}, addNote }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const route = useRoute();
  const theme = useTheme();

  const onAddPressed = async () => {
    dispatch(enableLoading());
    try {
      const result = await createNote(
        name,
        route.params.word.id,
        storageGetToken()
      );
      addNote((prev) => {
        return [...prev, result];
      });

      setName("");
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    dispatch(disableLoadgin());
  };

  return (
    <Modal animationType="fade" visible={open} transparent>
      <Pressable onPress={() => setOpen(false)} style={styles.backdrop}>
        <Pressable
          onPress={() => {}}
          style={{ ...styles.modal, backgroundColor: theme.colors.background }}
        >
          <View>
            <Text
              style={{
                ...styles.title,
                color: theme.colors.text,
                fontFamily: theme.fontFamily,
              }}
            >
              Додати нотатку
            </Text>
            <CustomInput
              placeholder={"Нотатка"}
              multiline={true}
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                ...styles.input,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              placeholderTextColor={theme.colors.placeholder}
            />
          </View>
          <CustomButton onPress={onAddPressed} title="Додати">
            Додати
          </CustomButton>
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
  title: {
    fontSize: 30,
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    height: 200,
    verticalAlign: "top",
  },
});
