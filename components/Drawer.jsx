import { View, Text, StyleSheet, Pressable } from "react-native";
import localisation from "../localisation";
import { useLocalisation } from "../redux/selectors";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLocalisation } from "../redux/slices";
import * as SecureStore from "expo-secure-store";
import { logout } from "../service/API/auth";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

export const Drawer = () => {
	const theme = useTheme();
	const [localOpen, setLocalOpen] = useState(false);
	const languagle = useLocalisation();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const onLocalisationPress = (value) => {
		setLocalOpen(false);
		dispatch(setLocalisation(value));
	};

	const onLogout = async () => {
		const token = SecureStore.getItem("authToken");
		console.log("Logout");

		try {
			if (token) {
				try {
					await logout(token);
				} catch (err) {
					console.log(err);
				}
			}
			await SecureStore.deleteItemAsync("authToken");
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "Login" }],
				}),
			);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<View style={{ ...styles.main }}>
			<Text style={{ ...styles.logo, fontFamily: theme.fontFamily }}>
				Lexigo
			</Text>
			<Pressable
				style={{ ...styles.button }}
				onPress={() => setLocalOpen((prev) => !prev)}>
				<Text>{localisation[languagle].language}</Text>
			</Pressable>
			{localOpen && (
				<View>
					{Object.keys(localisation).map((item) => (
						<Pressable
							style={{ ...styles.button }}
							key={item}
							onPress={() => onLocalisationPress(item)}>
							<Text>{localisation[item].language}</Text>
						</Pressable>
					))}
				</View>
			)}
			<Pressable onPress={onLogout} style={{ ...styles.button }}>
				<Text>{localisation[languagle].logout}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		paddingTop: 30,
	},
	logo: {
		textAlign: "center",
		fontSize: 40,
	},
	button: {
		padding: 10,
		borderBottomColor: "black",
		borderBottomWidth: 2,
	},
});
