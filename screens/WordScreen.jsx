import { Outlet } from "../components/Outlet";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
  Button,
  ScrollView,
} from "react-native";
import { editWord } from "../service/API/words";
import { enableLoading, disableLoadgin } from "../redux/slices";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { storageGetToken } from "../service/storage/token";
import { AddNoteModal } from "../components/AddNoteModal";
import { getNotes } from "../service/API/notes";
import { Note } from "../components/Note";
import { EditNoteModal } from "../components/EditNoteModal";

export const WordScreen = ({ navigation }) => {
  const route = useRoute();
  const theme = useTheme();

  const worRef = useRef(null);
  const translationRef = useRef(null);
  const [wordReduction, setWordReduction] = useState(false);
  const [translationReduction, setTranslationReduction] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const [nodeModal, setNoteModal] = useState(false);

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
    (async () => {
      dispatch(enableLoading());
      try {
        const result = await getNotes(route.params.word.id, storageGetToken());
        setNotes(result);
      } catch (err) {
        console.log(err);
      }
      dispatch(disableLoadgin());
    })();
  }, []);

  const onWordEdit = async () => {
    dispatch(enableLoading());
    try {
      const result = await editWord(
        route.params.word.id,
        { word: route.params.word.word },
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

        { translation: route.params.word.translation },
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
      <ScrollView>
        <Pressable
          onLongPress={() => {
            setWordReduction(true);
            setTranslationReduction(false);
            setTimeout(() => {
              worRef.current.focus();
            }, 60);
          }}
          style={{
            ...styles.outlied,
            ...styles.wordView,
            borderBottomColor: theme.colors.border,
          }}
        >
          <TextInput
            editable={wordReduction}
            ref={worRef}
            onSubmitEditing={onWordEdit}
            value={route.params.word.word}
            onChangeText={(text) =>
              navigation.setParams({
                dictionary: route.params.dictionary,
                word: { ...route.params.word, word: text },
              })
            }
            style={{
              ...styles.wordTitle,
              color: theme.colors.text,
            }}
          />
        </Pressable>
        <Pressable
          onLongPress={() => {
            setWordReduction(false);
            setTranslationReduction(true);
            setTimeout(() => {
              translationRef.current.focus();
            }, 60);
          }}
          style={{ ...styles.outlied, ...styles.translationView }}
        >
          <TextInput
            editable={translationReduction}
            ref={translationRef}
            onSubmitEditing={onTranslationEdit}
            value={route.params.word.translation}
            onChangeText={(text) =>
              navigation.setParams({
                dictionary: route.params.dictionary,
                word: { ...route.params.word, translation: text },
              })
            }
            style={{
              ...styles.translation,
              color: theme.colors.text,
            }}
          />
        </Pressable>
        <View
          style={{
            ...styles.notesView,
            borderBottomColor: theme.colors.border,
          }}
        >
          <Button onPress={() => setNoteModal(true)} title="Додати нотаток" />
          {notes.length === 0 ? (
            <View style={styles.noNotesView}>
              <Text style={styles.noNotesText}>Немає нотатків</Text>
            </View>
          ) : (
            notes.map((item) => (
              <Note
                setNotes={setNotes}
                noteInfo={item}
                key={item.id}
                setNoteToEdit={setNoteToEdit}
              />
            ))
          )}
        </View>
      </ScrollView>
      <AddNoteModal
        open={nodeModal}
        setOpen={setNoteModal}
        addNote={setNotes}
      />
      <EditNoteModal
        open={noteToEdit}
        setOpen={setNoteToEdit}
        setNotes={setNotes}
      />
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
  notesView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginTop: 20,
    borderBottomWidth: 1,
  },
  noNotesView: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  noNotesText: {
    fontSize: 40,
    fontWeight: 100,
    color: "#a7a7a76c",
    fontStyle: "italic",
  },
});
