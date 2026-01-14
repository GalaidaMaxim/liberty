import { Outlet } from "../components/Outlet";
import {
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { useState } from "react";
import { AddTypeModal } from "../components/AddTypeModal";
import { EditTypeModal } from "../components/EditTypeModal";
import { useTypes } from "../redux/selectors";
import { TypeButtonMenu } from "../components/TypeButtonMenu";
import { buttonBase } from "../styles/global";
import { useTheme } from "@react-navigation/native";
import { AddWordModal } from "../components/AddWordModal";
import { getWords } from "../service/API/words";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoadgin } from "../redux/slices";
import { storageGetToken } from "../service/storage/token";
import { WordsCard } from "../components/WordsCard";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import whiteCorst from "../assets/whiteCross.png";
import penTool from "../assets/penTool.png";

export const DictionaryScreen = () => {
  const [typeModal, setTypeModal] = useState(false);
  const [editTypeModal, setEditTypeModal] = useState(false);
  const [addWordModal, setWordModal] = useState(false);
  const [editableType, setEditableType] = useState({});
  const [selectedType, setSelectedType] = useState(null);
  const [words, setWords] = useState([]);

  const types = useTypes();
  const theme = useTheme();
  const dispatch = useDispatch();
  const route = useRoute();

  const updateWords = useCallback(async () => {
    try {
      dispatch(enableLoading());
      const words = await getWords({
        token: storageGetToken(),
        dictionaryID: route.params.dictionary.id,
      });
      setWords(words);
    } catch (err) {
      console.log(err);
    }
    dispatch(disableLoadgin());
  }, []);

  useFocusEffect(
    useCallback(() => {
      updateWords();
    }, [updateWords])
  );

  const openEditTypeModal = (type) => {
    setEditableType(type);
    setEditTypeModal(true);
  };

  return (
    <Outlet>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ ...styles.typeList, ...styles.cover }}
        style={styles.typeListScroll}
      >
        <TouchableHighlight
          onPress={() => setTypeModal(true)}
          style={{ ...styles.button, backgroundColor: theme.colors.border }}
        >
          <Image source={whiteCorst} />
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            ...styles.blueButton,
            ...(selectedType ? {} : styles.highlited),
            backgroundColor: theme.colors.border,
          }}
          onPress={() => setSelectedType(null)}
        >
          <Text style={{ ...styles.buttonText, fontFamily: theme.fontFamily }}>
            Всі
          </Text>
        </TouchableHighlight>
        {types.map((item) => (
          <TypeButtonMenu
            key={item.id}
            type={item}
            openEditModal={openEditTypeModal}
            styles={styles}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        ))}
      </ScrollView>
      <ScrollView style={{ ...styles.wordsList, ...styles.cover }}>
        {words
          .filter((item) => {
            if (!selectedType) {
              return item;
            }
            return item.type_id === selectedType;
          })
          .map((item) => (
            <WordsCard
              key={item.id}
              word={item}
              words={words}
              setWords={setWords}
            />
          ))}
      </ScrollView>
      <TouchableHighlight
        onPressIn={() => setWordModal(true)}
        style={{ ...styles.aboluteViev, backgroundColor: theme.colors.border }}
      >
        <Image source={penTool} />
      </TouchableHighlight>
      <AddTypeModal open={typeModal} setOpen={setTypeModal} />
      <EditTypeModal
        open={editTypeModal}
        setOpen={setEditTypeModal}
        type={editableType}
        setType={setEditableType}
      />
      <AddWordModal
        setWords={setWords}
        open={addWordModal}
        setOpen={setWordModal}
        words={words}
      />
    </Outlet>
  );
};

const styles = StyleSheet.create({
  cover: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  typeListScroll: {
    maxHeight: 70,
    outlive: "1px solid green",
  },
  typeList: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },

  button: {
    ...buttonBase,
  },
  blueButton: {
    ...buttonBase,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  wordsList: {
    flex: 1,
  },
  highlited: {
    outlineColor: "rgba(137,108,50,0.87)",
    outlineWidth: 2,
  },
  aboluteViev: {
    position: "absolute",
    bottom: 60,
    right: 10,
    padding: 16,
    borderRadius: "50%",
  },
});
