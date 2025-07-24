import { Outlet } from "../components/Outlet";
import { Text, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

export const WordScreen = ({ navigation }) => {
  const route = useRoute();
  const theme = useTheme();
  return (
    <Outlet>
      <View
        style={{
          ...styles.outlied,
          ...styles.wordView,
          borderBottomColor: theme.colors.border,
        }}
      >
        <Text
          style={{
            ...styles.wordTitle,
            color: theme.colors.text,
          }}
        >
          {route.params.word.word}
        </Text>
      </View>
      <View style={{ ...styles.outlied, ...styles.translationView }}>
        <Text style={{ ...styles.translation, color: theme.colors.text }}>
          {route.params.word.translation}
        </Text>
      </View>
    </Outlet>
  );
};

const styles = StyleSheet.create({
  wordView: {
    marginTop: 20,
    height: 70,
    justifyContent: "center",
    paddingLeft: 20,
    borderBottomWidth: 1,
  },
  wordTitle: {
    fontSize: 40,
    fontWeight: 700,
  },
  translationView: {
    height: 70,
    justifyContent: "center",
    paddingLeft: 20,
  },
  translation: { fontSize: 20 },
  outlied: {
    outlineColor: "red",
    // outlineWidth: 1,
  },
});
