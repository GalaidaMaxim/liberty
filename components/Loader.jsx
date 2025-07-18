import { Modal, StyleSheet, View, ActivityIndicator } from "react-native";
import { globalStyles } from "../styles/global";
import { useLoading } from "../redux/selectors";

export const Loader = () => {
  const loadgin = useLoading();
  return (
    <Modal visible={loadgin} transparent>
      <View style={styles.backdrop}>
        <View>
          <ActivityIndicator size={80} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 200,
    width: "90%",
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
  },
  input: {
    ...globalStyles.input,
    marginTop: 10,
  },
});
