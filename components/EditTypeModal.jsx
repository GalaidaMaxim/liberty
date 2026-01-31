import {
	Modal,
	Button,
	Text,
	TextInput,
	StyleSheet,
	View,
	Pressable,
} from "react-native";
import { globalStyles } from "../styles/global";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTypeThunk } from "../redux/operations";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "@react-navigation/native";
import { useLocalisation } from "../redux/selectors";
import localisation from "../localisation";

export const EditTypeModal = ({
	open = true,
	setOpen = () => {},
	type,
	setType,
}) => {
	const [name, setName] = useState(type.name);
	const dispatch = useDispatch();
	const theme = useTheme();
	const language = useLocalisation();

	useEffect(() => {
		setName(type.name);
	}, [open]);

	const onAddPressed = async () => {
		const { id } = type;
		dispatch(
			changeTypeThunk({ id, name, token: SecureStore.getItem("authToken") }),
		);
		setType({});
		setOpen(false);
	};

	return (
		<Modal animationType="fade" visible={open} transparent>
			<Pressable onPress={() => setOpen(false)} style={styles.backdrop}>
				<Pressable
					onPress={() => {}}
					style={{ ...styles.modal, backgroundColor: theme.colors.card }}>
					<View>
						<Text style={{ ...styles.title, color: theme.colors.text, fontFamily: theme.fontFamily }}>
							{localisation[language].editType}
						</Text>
						<TextInput
							value={name}
							onChangeText={(text) => setName(text)}
							placeholder={localisation[language].title}
							style={{
								...styles.input,
								color: theme.colors.text,
								borderColor: theme.colors.border,
							}}
							placeholderTextColor={theme.colors.placeholder}
						/>
					</View>
					<Button
						onPress={onAddPressed}
						title={localisation[language].confirm}
					/>
				</Pressable>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		backgroundColor: "rgba(0,0,0,0.7)",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modal: {
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
