import { Outlet } from "../components/Outlet";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableHighlight, ScrollView, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { AddTypeModal } from "../components/AddTypeModal";
import { useTypes } from "../redux/selectors";

export const DictionaryScreen = () => {
  const [typeModal, setTypeModal] = useState(false);
  const types = useTypes();
  return (
    <Outlet>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.typeList}
      >
        <TouchableHighlight
          onPress={() => setTypeModal(true)}
          style={styles.button}
        >
          <AntDesign name="plus" size={16} color="black" />
        </TouchableHighlight>
        <TouchableHighlight style={styles.blueButton}>
          <Text style={styles.buttonText}>Всі</Text>
        </TouchableHighlight>
        {types.map((item) => (
          <TouchableHighlight key={item.id} style={styles.blueButton}>
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <ScrollView style={styles.wordsList}>
        <Text>words</Text>
      </ScrollView>
      <AddTypeModal open={typeModal} setOpen={setTypeModal} />
    </Outlet>
  );
};

const buttonBase = {
  height: 40,
  minWidth: 40,
  paddingLeft: 10,
  paddingRight: 10,
  marginRight: 5,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
};
const styles = StyleSheet.create({
  typeList: { padding: 10, flexDirection: "row", maxHeight: 60 },
  button: {
    ...buttonBase,
    borderBlockColor: "black",
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
