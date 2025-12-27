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
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useTypes } from "../redux/selectors";
import { createWord } from "../service/API/words";
import { enableLoading, disableLoadgin } from "../redux/slices";
import { storageGetToken } from "../service/storage/token";

export const AddWordModal = ({
  open = true,
  setOpen = () => {},
  words = [],
}) => {
  const [name, setName] = useState("");
  const [translation, setTranslation] = useState("");
  const [type, setType] = useState(-1);

  const dispatch = useDispatch();
  const theme = useTheme();
  const types = useTypes();

  const route = useRoute();
  const navigation = useNavigation();

  const typesList = [{ id: -1, name: "Без типу" }, ...types];

  const onCreate = async () => {
    dispatch(enableLoading());
    try {
      const result = await createWord({
        word: name,
        translation,
        type_id: type === -1 ? undefined : type,
        dictionaryID: route.params.dictionary.id,
        token: storageGetToken(),
      });
      setOpen(false);

      navigation.navigate("Word", {
        dictionary: route.params.dictionary,
        word: result,
        words,
      });

      setName("");
      setTranslation("");
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
          style={{ ...styles.modal, backgroundColor: theme.colors.card }}
        >
          <View>
            <Text style={{ ...styles.title, color: theme.colors.text }}>
              Додати слово
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Слово"
              style={{
                ...styles.input,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              placeholderTextColor={theme.colors.placeholder}
            />
            <TextInput
              value={translation}
              onChangeText={(text) => setTranslation(text)}
              placeholder="Переклад"
              style={{
                ...styles.input,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              placeholderTextColor={theme.colors.placeholder}
            />
            <View
              style={{
                ...styles.picker,

                borderColor: theme.colors.border,
              }}
            >
              <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                style={{
                  color: theme.colors.text,
                }}
              >
                {typesList.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <Button title="Додати" onPress={() => onCreate()} />
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
    height: 300,
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
  },
  picker: {
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginTop: 10,
  },
});
