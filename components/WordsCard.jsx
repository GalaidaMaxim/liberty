import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
	Menu,
	MenuTrigger,
	MenuOptions,
	MenuOption,
} from "react-native-popup-menu";
import { useRef } from "react";
import { deleteWord } from "../service/API/words";
import { storageGetToken } from "../service/storage/token";
import { useLocalisation } from "../redux/selectors";
import localisation from "../localisation";

export const WordsCard = ({ word, words, setWords = () => {} }) => {
	const theme = useTheme();
	const route = useRoute();
	const navigation = useNavigation();
	const language = useLocalisation();
	const ref = useRef(null);

	const onDelete = async () => {
		try {
			const result = await deleteWord(word.id, storageGetToken());
			console.log(result);
			setWords((prev) => {
				return prev.filter((item) => item.id !== word.id);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const openMenu = () => {
		ref.current?.open();
	};

	const onPress = () => {
		navigation.navigate("Word", {
			dictionary: route.params.dictionary,
			word,
			words,
		});
	};

	return (
		<Menu ref={ref}>
			<MenuTrigger customStyles={{ TriggerTouchableComponent: View }}>
				<TouchableOpacity
					onPress={onPress}
					onLongPress={openMenu}
					style={{
						...styles.card,
						borderColor: theme.colors.border,
					}}>
					<Text
						style={{
							...styles.word,
							color: theme.colors.text,
							fontFamily: theme.fontFamily,
						}}>
						{word.word.trim()}
					</Text>
					<Text
						style={{
							...styles.translation,

							fontFamily: theme.fontFamily,
						}}>
						{word.translation.trim()}
					</Text>
				</TouchableOpacity>
			</MenuTrigger>
			<MenuOptions
				customStyles={{
					optionsContainer: {
						backgroundColor: theme.colors.background,
						borderRadius: 8,
						marginTop: 50,
					},
					optionWrapper: {
						padding: 15,
					},
					optionText: {
						color: theme.colors.text,
						fontSize: 16,
					},
				}}>
				<MenuOption
					text={localisation[language].delete}
					onSelect={onDelete}></MenuOption>
			</MenuOptions>
		</Menu>
	);
};

const styles = StyleSheet.create({
	card: {
		marginBottom: 10,
		height: 43,
		alignItems: "center",
		paddingLeft: 20,
		position: "relative",
		flexDirection: "row",

		borderRadius: 10,
		borderWidth: 1,
		gap: 20,
	},
	word: {
		fontSize: 20,
		lineHeight: 24,
	},
	translation: { fontSize: 20, color: "rgba(73, 54, 57, 0.6)", lineHeight: 24 },
});
