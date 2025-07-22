import { Outlet } from "../components/Outlet";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableHighlight, ScrollView, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { AddTypeModal } from "../components/AddTypeModal";
import { EditTypeModal } from "../components/EditTypeModal";
import { useTypes } from "../redux/selectors";
import { TypeButtonMenu } from "../components/TypeButtonMenu";
import { buttonBase } from "../styles/global";
import { useTheme } from "@react-navigation/native";

export const DictionaryScreen = () => {
  const [typeModal, setTypeModal] = useState(false);
  const [editTypeModal, setEditTypeModal] = useState(false);
  const [editableType, setEditableType] = useState({});

  const types = useTypes();
  const theme = useTheme();

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
        <TouchableHighlight style={styles.blueButton}>
          <Text style={styles.buttonText}>Всі</Text>
        </TouchableHighlight>
        {types.map((item) => (
          <TypeButtonMenu
            key={item.id}
            type={item}
            openEditModal={openEditTypeModal}
          />
        ))}
      </ScrollView>
      <ScrollView style={styles.wordsList}>
        <Text>words</Text>
      </ScrollView>
      <AddTypeModal open={typeModal} setOpen={setTypeModal} />
      <EditTypeModal
        open={editTypeModal}
        setOpen={setEditTypeModal}
        type={editableType}
        setType={setEditableType}
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
  },
});
