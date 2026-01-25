import { Modal, Button, Text, StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useTypes } from "../redux/selectors";
import { createWord } from "../service/API/words";
import { enableLoading, disableLoading } from "../redux/slices";
import { storageGetToken } from "../service/storage/token";
import { CustomInput, CustomPicker } from "./CustomInput";
import { CustomButton } from "./CustomButton";
import { useLocalisation } from "../redux/selectors";
import localisation from "../localisation";

export const AddWordModal = ({
	open = true,
	setOpen = () => {},
	words = [],
}) => {
	const [name, setName] = useState("");
	const [translation, setTranslation] = useState("");
	const [type, setType] = useState(-1);

	const dispatch = useDispatch();
	const theme = useTheme();
	const types = useTypes();

	const route = useRoute();
	const navigation = useNavigation();

	const language = useLocalisation();
	const typesList = [
		{ id: -1, name: localisation[language].withoutType },
		...types,
	];

	const onCreate = async () => {
		dispatch(enableLoading());
		try {
			const result = await createWord({
				word: name,
				translation,
				type_id: type === -1 ? undefined : type,
				dictionaryID: route.params.dictionary.id,
				token: storageGetToken(),
			});
			setOpen(false);

			navigation.navigate("Word", {
				dictionary: route.params.dictionary,
				word: result,
				words,
			});

			setName("");
			setTranslation("");
		} catch (err) {
			console.log(err);
		}
		dispatch(disableLoading());
	};
	return (
		<Modal animationType="fade" visible={open} transparent>
			<Pressable onPress={() => setOpen(false)} style={styles.backdrop}>
				<Pressable
					onPress={() => {}}
					style={{ ...styles.modal, backgroundColor: theme.colors.background }}>
					<View style={styles.mainView}>
						<Text style={{ ...styles.title, color: theme.colors.text }}>
							{localisation[language].addWord}
						</Text>
						<CustomInput
							value={name}
							onChangeText={(text) => setName(text)}
							placeholder={localisation[language].word}
							style={styles.input}
							placeholderTextColor={theme.colors.placeholder}
							onReset={() => setName("")}
						/>
						<CustomInput
							value={translation}
							onChangeText={(text) => setTranslation(text)}
							placeholder={localisation[language].translation}
							style={{
								...styles.input,
							}}
							placeholderTextColor={theme.colors.placeholder}
						/>
						<CustomPicker
							selectedValue={type}
							style={styles.input}
							placeholder={localisation[language].type}
							onValueChange={(itemValue) => setType(itemValue)}>
							{typesList.map((item) => (
								<Picker.Item key={item.id} label={item.name} value={item.id} />
							))}
						</CustomPicker>
						<CustomButton onPress={() => onCreate()}>
							{localisation[language].save}
						</CustomButton>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		backgroundColor: "rgba(0,0,0,0.3)",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modal: {
		width: "90%",
		padding: 20,
		borderRadius: 10,
		justifyContent: "space-between",
	},
	mainView: {
		gap: 20,
	},
	title: {
		fontSize: 30,
	},
	input: {},
	picker: {
		borderWidth: 1,
		height: 45,
		justifyContent: "center",
		marginTop: 10,
	},
});
