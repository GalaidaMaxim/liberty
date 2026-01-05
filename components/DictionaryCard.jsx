import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import { deleteDictionaryThunk, getTypeThunk } from "../redux/operations";
import { useDispatch } from "react-redux";
import { storageGetToken } from "../service/storage/token";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import cross from "../assets/cross.png";

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
      }}
    >
      <View style={styles.topLine}>
        <Text
          style={{
            ...styles.title,
            color: theme.colors.text,
            fontFamily: theme.fontFamily,
          }}
        >
          {dictionary.name}
        </Text>
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <Image source={cross} />
        </Pressable>
      </View>
      <Text
        style={{
          ...styles.discription,
          fontFamily: theme.fontFamily,
          color: theme.colors.gostText,
        }}
      >
        Description
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    marginBottom: 20,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    position: "relative",

    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
  },
  discription: {
    marginTop: 10,
  },
});
