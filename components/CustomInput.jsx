import {
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import crossButton from "../assets/corssButton.png";
import { Picker } from "@react-native-picker/picker";

export const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  style,
  onReset = () => {},
}) => {
  const theme = useTheme();
  return (
    <View style={{ ...styles.view, ...style }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{ ...styles.input }}
        placeholderTextColor={placeholderTextColor}
      />
      {value && (
        <Pressable onPress={onReset} style={{ ...styles.crossButton }}>
          <Image source={crossButton} />
        </Pressable>
      )}
      <Text
        style={{
          ...styles.text,

          color: theme.colors.lightText,
        }}
      >
        {placeholder}
      </Text>
    </View>
  );
};

export const CustomPicker = ({
  selectedValue,
  onValueChange,
  placeholder,
  style,
  children,
}) => {
  const theme = useTheme();

  return (
    <View style={{ ...styles.view, ...style }}>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {children}
      </Picker>
      <Text
        style={{
          ...styles.text,

          color: theme.colors.lightText,
        }}
      >
        {placeholder}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: "relative",
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    paddingLeft: 16,
    paddingRight: 72,
    minHeight: 56,
    fontSize: 16,
    fontFamily: "Inter",
  },
  text: {
    position: "absolute",
    left: 10,
    top: -8,
    height: 16,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: "#896c32",
    fontSize: 12,
  },
  crossButton: {
    position: "absolute",
    height: "100%",

    width: 48,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
  },
});
