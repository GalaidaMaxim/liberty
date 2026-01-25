import { useRef } from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from "react-native-popup-menu";
import { useTheme } from "@react-navigation/native";

import { buttonBase } from "../styles/global";
import { useRoute } from "@react-navigation/native";
import { useLocalisation } from "../redux/selectors";
import localisation from "../localisation";

export const SynonymButton = ({ synonym, onPress, onDelete }) => {
	const ref = useRef(null);
	const theme = useTheme();
	const language = useLocalisation();

	const openMenu = () => {
		ref.current?.open();
	};

	return (
		<>
			<Menu ref={ref}>
				<MenuTrigger customStyles={{ TriggerTouchableComponent: View }}>
					<TouchableHighlight
						onPress={() => onPress(synonym)}
						onLongPress={openMenu}
						style={{
							...styles.addSynonymButton,
							backgroundColor: theme.colors.border,
						}}>
						<Text
							style={{
								...styles.synonymTytle,
								color: theme.colors.lightText,
								fontFamily: theme.fontFamily,
							}}>
							{synonym.word}
						</Text>
					</TouchableHighlight>
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
						onSelect={() => onDelete(synonym.id)}></MenuOption>
				</MenuOptions>
			</Menu>
		</>
	);
};

const styles = StyleSheet.create({
	synonymTytle: {
		fontSize: 20,
		// lineHeight: 30,
	},
	addSynonymButton: {
		...buttonBase,
		padding: 20,
		paddingTop: 0,
		paddingBottom: 0,
	},
});
