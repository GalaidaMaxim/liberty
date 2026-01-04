import { Pressable, Text, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

export const CustomButton = ({ children, onPress = () => {} }) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View
        style={{ ...styles.viewStyle, backgroundColor: theme.colors.border }}
      >
        <Text
          style={{
            ...styles.text,
            fontFamily: theme.fontFamily,
            color: theme.colors.lightText,
          }}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  text: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
  },
});
