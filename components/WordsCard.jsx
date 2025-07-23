import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "@react-navigation/native";

export const WordsCard = ({ word }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
      }}
    >
      <Text style={{ ...styles.word, color: theme.colors.text, flex: 1 }}>
        {word.word}
      </Text>
      <Text style={{ color: theme.colors.text, flex: 1 }}>
        {word.translation}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    height: 50,
    alignItems: "center",
    paddingLeft: 20,
    position: "relative",
    flexDirection: "row",

    borderRadius: 10,
    borderWidth: 1,
    boxShadow: "1px 1px 5px black",
  },
  word: {
    fontSize: 20,
  },
});
