import { Pressable, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { deleteDictionaryThunk, getTypeThunk } from "../redux/operations";
import { useDispatch } from "react-redux";
import { storageGetToken } from "../service/storage/token";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

export const DictionaryCard = ({ dictionary }) => {
  const dispatch = useDispatch();
  const naviagation = useNavigation();
  const theme = useTheme();
  const onDelete = () => {
    dispatch(
      deleteDictionaryThunk({ id: dictionary.id, token: storageGetToken() })
    );
  };
  const onCardPress = () => {
    dispatch(
      getTypeThunk({ dictionaryID: dictionary.id, token: storageGetToken() })
    );
    naviagation.navigate("Dictionary", { dictionary });
  };
  return (
    <Pressable
      onPress={onCardPress}
      style={{
        ...styles.card,
        borderColor: theme.colors.border,
        // boxShadow: theme.shadow,
        backgroundColor: theme.colors.card,
      }}
    >
      <Text style={{ ...styles.title, color: theme.colors.text }}>
        {dictionary.name}
      </Text>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <AntDesign name="close" size={24} color={theme.colors.text} />
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
