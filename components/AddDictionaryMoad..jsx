import {
  Modal,
  Button,
  Text,
  TextInput,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { globalStyles } from "../styles/global";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDictionaryThunk } from "../redux/operations";
import * as SecureStore from "expo-secure-store";

export const AddDictionaryModal = ({ open = true, setOpen = () => {} }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const onAddPressed = async () => {
    dispatch(
      createDictionaryThunk({ name, token: SecureStore.getItem("authToken") })
    );
    setOpen(false);
  };

  return (
    <Modal animationType="fade" visible={open} transparent>
      <Pressable onPress={() => setOpen(false)} style={styles.backdrop}>
        <Pressable onPress={() => {}} style={styles.modal}>
          <View>
            <Text style={styles.title}>Додати словник</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Назва"
              style={styles.input}
            />
          </View>
          <Button onPress={onAddPressed} title="Додати" />
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
    backgroundColor: "rgb(255, 255, 255)",
    height: 200,
    width: "90%",
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
  },
  input: {
    ...globalStyles.input,
    marginTop: 10,
  },
});
