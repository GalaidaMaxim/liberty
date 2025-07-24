import { Outlet } from "../components/Outlet";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import { editWord } from "../service/API/words";
import { enableLoading, disableLoadgin } from "../redux/slices";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { storageGetToken } from "../service/storage/token";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const WordScreen = ({ navigation }) => {
  const route = useRoute();
  const theme = useTheme();
  const worRef = useRef(null);
  const translationRef = useRef(null);
  const [wordText, setWordText] = useState("");
  const [translationText, setTranslationText] = useState("");
  const [wordReduction, setWordReduction] = useState(false);
  const [translationReduction, setTranslationReduction] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setWordReduction(false);
      setTranslationReduction(false);
    });
    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (wordReduction) {
      setWordText(route.params.word.word);
      worRef.current.focus();
    }
    if (translationReduction) {
      setTranslationText(route.params.word.translation);
      translationRef.current.focus();
    }
  }, [wordReduction, translationReduction]);
  const onWordEdit = async () => {
    dispatch(enableLoading());
    try {
      const result = await editWord(
        route.params.word.id,
        { word: wordText },
        storageGetToken()
      );
      navigation.setParams({
        dictionary: route.params.dictionary,
        word: result,
      });
    } catch (err) {
      console.log(err);
    }
    dispatch(disableLoadgin());
    setWordReduction(false);
  };

  const onTranslationEdit = async () => {
    dispatch(enableLoading());
    try {
      const result = await editWord(
        route.params.word.id,

        { translation: translationText },
        storageGetToken()
      );
      navigation.setParams({
        dictionary: route.params.dictionary,
        word: result,
      });
    } catch (err) {
      console.log(err);
    }
    dispatch(disableLoadgin());
    setWordReduction(false);
  };
  return (
    <Outlet>
      <Pressable
        onLongPress={() => setWordReduction(true)}
        style={{
          ...styles.outlied,
          ...styles.wordView,
          borderBottomColor: theme.colors.border,
        }}
      >
        {wordReduction ? (
          <TextInput
            ref={worRef}
            onSubmitEditing={onWordEdit}
            value={wordText}
            onChangeText={(text) => setWordText(text)}
            style={{
              ...styles.wordTitle,
              color: theme.colors.text,
            }}
          />
        ) : (
          <Text
            style={{
              ...styles.wordTitle,
              color: theme.colors.text,
            }}
          >
            {route.params.word.word}
          </Text>
        )}
      </Pressable>
      <Pressable
        onLongPress={() => setTranslationReduction(true)}
        style={{ ...styles.outlied, ...styles.translationView }}
      >
        {translationReduction ? (
          <TextInput
            ref={translationRef}
            onSubmitEditing={onTranslationEdit}
            value={translationText}
            onChangeText={(text) => setTranslationText(text)}
            style={{
              ...styles.translation,
              color: theme.colors.text,
            }}
          />
        ) : (
          <Text style={{ ...styles.translation, color: theme.colors.text }}>
            {route.params.word.translation}
          </Text>
        )}
      </Pressable>
    </Outlet>
  );
};

const styles = StyleSheet.create({
  wordView: {
    marginTop: 20,
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
  },
  wordTitle: {
    fontSize: 40,
    fontWeight: 700,
    padding: 0,
  },
  translationView: {
    height: 70,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  translation: { fontSize: 20 },
  outlied: {
    outlineColor: "red",
    // outlineWidth: 1,
  },
});
