import {
	Modal,
	Button,
	Text,
	TextInput,
	StyleSheet,
	View,
	Pressable,
} from "react-native";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDictionaryThunk } from "../redux/operations";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "@react-navigation/native";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";
import { useLocalisation } from "../redux/selectors";
import localisation from "../localisation";

export const AddDictionaryModal = ({ open = true, setOpen = () => {} }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const dispatch = useDispatch();
	const theme = useTheme();
	const language = useLocalisation();

	const onAddPressed = async () => {
		dispatch(
			createDictionaryThunk({
				name,
				description,
				token: SecureStore.getItem("authToken"),
			}),
		);
		setOpen(false);
	};

	return (
		<Modal animationType="fade" visible={open} transparent>
			<Pressable onPress={() => setOpen(false)} style={styles.backdrop}>
				<Pressable
					onPress={() => {}}
					style={{ ...styles.modal, backgroundColor: theme.colors.background }}>
					<View style={{ ...styles.mainView }}>
						<Text style={{ ...styles.title, color: theme.colors.text, fontFamily: theme.fontFamily }}>
							{localisation[language].addDictionary}
						</Text>
						<CustomInput
							value={name}
							onChangeText={(text) => setName(text)}
							placeholder={localisation[language].title}
							placeholderTextColor={theme.colors.placeholder}
							onReset={() => setName("")}
						/>
						<CustomInput
							multiline={true}
							value={description}
							onChangeText={(text) => setDescription(text)}
							placeholder={localisation[language].description}
							style={{
								...styles.input,
							}}
							placeholderTextColor={theme.colors.placeholder}
							onReset={() => setDescription("")}
						/>
						<CustomButton onPress={onAddPressed}>
							{localisation[language].add}
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
	input: { height: 120 },
	picker: {
		borderWidth: 1,
		height: 45,
		justifyContent: "center",
		marginTop: 10,
	},
});
