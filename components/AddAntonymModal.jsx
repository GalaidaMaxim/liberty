import { Modal, Text, StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoadgin } from "../redux/slices";
import { storageGetToken } from "../service/storage/token";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { createAntonym } from "../service/API/antonyms";

export const AddAntonymsModal = ({
  open = true,
  setOpen = () => {},
  antonyms = [],
  setAntonyms,
}) => {
  const dispatch = useDispatch();

  const route = useRoute();
  const theme = useTheme();

  const onAddPressed = async (antonym) => {
    dispatch(enableLoading());
    try {
      console.log(antonym, route.params.word);

      const result = await createAntonym(
        route.params.word.id,
        antonym.id,
        storageGetToken()
      );
      setAntonyms((prev) => [...prev, antonym]);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    dispatch(disableLoadgin());
  };

  const antonymsID = antonyms ? antonyms.map((item) => item.id) : [];
  const words = route.params.words?.filter(
    (item) => !antonymsID.includes(item.id) && item.id !== route.params.word.id
  );

  return (
    <Modal animationType="fade" visible={open} transparent>
      <Pressable onPress={() => setOpen(false)} style={styles.backdrop}>
        <Pressable
          onPress={() => {}}
          style={{ ...styles.modal, backgroundColor: theme.colors.card }}
        >
          <View>
            <Text style={{ ...styles.title, color: theme.colors.text }}>
              Додати антонім
            </Text>
          </View>
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
