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
import { createNote } from "../service/API/notes";
import { enableLoading, disableLoading } from "../redux/slices";
import { storageGetToken } from "../service/storage/token";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";
import { useLocalisation } from "../redux/selectors";
import localisation from "../localisation";

export const AddNoteModal = ({ open = true, setOpen = () => {}, addNote }) => {
	const [name, setName] = useState("");
	const dispatch = useDispatch();

	const route = useRoute();
	const theme = useTheme();
	const language = useLocalisation();

	const onAddPressed = async () => {
		dispatch(enableLoading());
		try {
			const result = await createNote(
				name,
				route.params.word.id,
				storageGetToken(),
			);
			addNote((prev) => {
				return [...prev, result];
			});

			setName("");
			setOpen(false);
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
					<View>
						<Text
							style={{
								...styles.title,
								color: theme.colors.text,
								fontFamily: theme.fontFamily,
							}}>
							{localisation[language].addNote}
						</Text>
						<CustomInput
							placeholder={localisation[language].note}
							multiline={true}
							value={name}
							onChangeText={(text) => setName(text)}
							style={{
								...styles.input,
								borderColor: theme.colors.border,
								color: theme.colors.text,
							}}
							placeholderTextColor={theme.colors.placeholder}
						/>
					</View>
					<CustomButton
						onPress={onAddPressed}
						title={localisation[language].add}>
						{localisation[language].add}
					</CustomButton>
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
	title: {
		fontSize: 30,
	},
	input: {
		marginTop: 20,
		marginBottom: 20,
		borderWidth: 1,
		height: 200,
		verticalAlign: "top",
	},
});
