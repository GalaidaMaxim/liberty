import { Modal, Text, StyleSheet, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoadgin } from "../redux/slices";
import { storageGetToken } from "../service/storage/token";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { createSynonym } from "../service/API/synonyms";
import { CustomInput } from "./CustomInput";

export const AddSynonymModal = ({
  open = true,
  setOpen = () => {},
  synonyms = [],
  setSynonyms,
}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const theme = useTheme();
  const [filter, setFilter] = useState("");

  const onAddPressed = async (synonym) => {
    dispatch(enableLoading());
    try {
      const result = await createSynonym(
        route.params.word.id,
        synonym.id,
        storageGetToken()
      );
      setSynonyms((prev) => [...prev, synonym]);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    dispatch(disableLoadgin());
  };

  const line = "asd";
  line.toLowerCase;

  const synonymsID = synonyms ? synonyms.map((item) => item.id) : [];
  let words = route.params.words?.filter(
    (item) => !synonymsID.includes(item.id) && item.id !== route.params.word.id
  );
  if (filter) {
    words = words.filter((item) =>
      item.word.toLowerCase().includes(filter.toLowerCase())
    );
  }

  return (
    <Modal animationType="fade" visible={open} transparent>
      <Pressable onPress={() => setOpen(false)} style={styles.backdrop}>
        <Pressable
          onPress={() => {}}
          style={{ ...styles.modal, backgroundColor: theme.colors.background }}
        >
          <View>
            <Text style={{ ...styles.title, color: theme.colors.text }}>
              Додати синонім
            </Text>
          </View>
          <CustomInput
            value={filter}
            onChangeText={setFilter}
            onReset={() => setFilter("")}
            style={{ marginTop: 20 }}
            placeholder={"Пошук"}
          />
          <ScrollView>
            {words.map((item) => (
              <Pressable
                onPress={() => onAddPressed(item)}
                style={{ ...styles.button, borderColor: theme.colors.border }}
                key={item.id}
              >
                <View>
                  <Text style={{ color: theme.colors.text }}>{item.word}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
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
    height: 600,
    width: "90%",
    padding: 20,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 30,
  },
  button: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
});
