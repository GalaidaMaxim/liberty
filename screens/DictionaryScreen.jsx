import { Outlet } from "../components/Outlet";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableHighlight, ScrollView, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
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
        style={styles.typeList}
      >
        <TouchableHighlight
          onPress={() => setTypeModal(true)}
          style={{ ...styles.button, borderColor: theme.colors.border }}
        >
          <AntDesign name="plus" size={16} color={theme.colors.border} />
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            ...styles.blueButton,
            ...(selectedType ? {} : styles.highlited),
          }}
          onPress={() => setSelectedType(null)}
        >
          <Text style={styles.buttonText}>Всі</Text>
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
      <ScrollView style={styles.wordsList}>
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
        style={styles.aboluteViev}
      >
        <AntDesign name="pluscircleo" size={50} color={theme.colors.text} />
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
  typeList: { padding: 10, flexDirection: "row", maxHeight: 60 },

  button: {
    ...buttonBase,
    borderWidth: 1,
  },
  blueButton: {
    ...buttonBase,
    backgroundColor: "rgb(46, 129, 255)",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  wordsList: {
    flex: 1,
    padding: 10,
  },
  highlited: {
    outlineColor: "white",
    outlineWidth: 1,
  },
  aboluteViev: {
    position: "absolute",
    bottom: 60,
    right: 10,

    borderRadius: "50%",
  },
});
