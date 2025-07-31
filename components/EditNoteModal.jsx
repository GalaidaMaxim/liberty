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
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { storageGetToken } from "../service/storage/token";
import { enableLoading, disableLoadgin } from "../redux/slices";
import { editNote } from "../service/API/notes";

export const EditNoteModal = ({ open, setOpen = () => {}, setNotes }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (!open) {
      return;
    }
    setName(open.text);
  }, [open]);

  const onAddPressed = async () => {
    const { id } = open;
    dispatch(enableLoading());
    try {
      const result = await editNote(id, name, storageGetToken());
      setNotes((prev) => {
        const arr = [...prev];
        const index = arr.findIndex((item) => item.id === open.id);
        arr.splice(index, 1, result);
        return arr;
      });
    } catch (err) {
      console.log(err);
    }
    dispatch(disableLoadgin());
    setOpen(null);
  };

  return (
    <Modal animationType="fade" visible={open ? true : false} transparent>
      <Pressable onPress={() => setOpen(null)} style={styles.backdrop}>
        <Pressable
          onPress={() => {}}
          style={{ ...styles.modal, backgroundColor: theme.colors.card }}
        >
          <View>
            <Text style={{ ...styles.title, color: theme.colors.text }}>
              Редагувати нотатку
            </Text>
            <TextInput
              multiline={true}
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                ...styles.input,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              }}
              placeholderTextColor={theme.colors.placeholder}
            />
          </View>
          <Button onPress={onAddPressed} title="Підтвердити" />
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
    height: 350,
    width: "90%",
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    height: 200,
    verticalAlign: "top",
  },
});
