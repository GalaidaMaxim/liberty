import { Pressable, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { deleteDictionaryThunk } from "../redux/operations";
import { useDispatch } from "react-redux";
import { storageGetToken } from "../service/storage/token";

export const DictionaryCard = ({ dictionary }) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(
      deleteDictionaryThunk({ id: dictionary.id, token: storageGetToken() })
    );
  };
  return (
    <Pressable style={styles.card}>
      <Text style={styles.title}>{dictionary.name}</Text>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <AntDesign name="close" size={24} color="black" />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    width: "90%",
    height: 150,
    padding: 20,
    position: "relative",

    borderBlockColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    boxShadow: "1px 1px 5px black",
  },
  title: {
    fontSize: 20,
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});
