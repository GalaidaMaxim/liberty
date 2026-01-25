import { useState } from "react";
import { useEffect } from "react";
import { Button, View, TextInput, Text } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { googleRegistration, loginWithPasword } from "../service/API/auth";
import { getUser } from "../service/API/user";
import { StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser, enableLoading, disableLoadgin } from "../redux/slices";
import { globalStyles } from "../styles/global";
import { getDictionaryThunk } from "../redux/operations";
import { useTheme } from "@react-navigation/native";
import localisation from "../localisation";
import { CustomButton } from "../components/CustomButton";
import { useLocalisation } from "../redux/selectors";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "64560341529-evi1747akv69abe3263p1o78c69tvg4v.apps.googleusercontent.com",
  });
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const language = useLocalisation();

  navigation.closeDrawer();

  const getUserInfo = async (token) => {
    dispatch(enableLoading());
    try {
      const data = await getUser(token);
      dispatch(getDictionaryThunk({ token }));
      if (data && data.name) {
        dispatch(setUser(data));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Main" }],
          })
        );
      }
    } catch (err) {
      console.log(err);
      await SecureStore.deleteItemAsync("authToken");
    }
    dispatch(disableLoadgin());
  };

  useEffect(() => {
    if (response?.type === "success") {
      (async () => {
        dispatch(enableLoading());
        try {
          const { token } = await googleRegistration(
            response.authentication.accessToken
          );
          SecureStore.setItem("authToken", token);

          await getUserInfo(token);
        } catch (err) {
          console.log(err);
        }
        dispatch(disableLoadgin());
      })();
    }
  }, [response]);

  useEffect(() => {
    (async () => {
      const token = SecureStore.getItem("authToken");
      if (!token) {
        return;
      }
      await getUserInfo(token);
    })();
  }, []);

  const onLogin = async () => {
    dispatch(enableLoading());
    try {
      const response = await loginWithPasword(email, password);
      if (!response.token) {
        return;
      }
      SecureStore.setItem("authToken", response.token);
      await getUserInfo(response.token);
    } catch (err) {
      console.log(err);
    }
    disableLoadgin(disableLoadgin());
  };

  const upTitle = localisation[language].welcomeTo.split(" ");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={styles.mainWraper}>
        <View style={styles.textView}>
          <Text
            style={{
              ...styles.upTitle,
              color: theme.colors.text,
              fontFamily: theme.fontFamily,
            }}
          >
            {upTitle[0]}
          </Text>
          {upTitle.length > 1 && (
            <Text
              style={{
                ...styles.upTitle,
                color: theme.colors.text,
                fontFamily: theme.fontFamily,
              }}
            >
              {upTitle[upTitle.length - 1]}
            </Text>
          )}
          <Text
            style={{
              ...styles.title,
              color: theme.colors.text,
              fontFamily: theme.fontFamily,
            }}
          >
            Lexigo
          </Text>
        </View>
        <View
          style={{ ...styles.inputWraper, borderColor: theme.colors.border }}
        >
          <TextInput
            placeholder={localisation[language].userName}
            style={{
              ...styles.input,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            }}
            placeholderTextColor={theme.colors.placeholder}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <View
            style={{ ...styles.midLine, borderColor: theme.colors.border }}
          ></View>
          <TextInput
            secureTextEntry={true}
            placeholder={localisation[language].password}
            style={{
              ...styles.input,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            }}
            placeholderTextColor={theme.colors.placeholder}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ ...styles.buttonView }}>
          <CustomButton onPress={onLogin}>
            {localisation[language].continue}
          </CustomButton>
          <CustomButton disabled={!request} onPress={() => promptAsync()}>
            Login with Google
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upTitle: { fontWeight: 400, fontSize: 32, lineHeight: 32 },
  title: {
    fontWeight: 400,
    fontSize: 64,
    lineHeight: 75,
  },
  inputWraper: {
    borderWidth: 3,
    borderRadius: 12,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  midLine: {
    borderTopWidth: 1,
  },
  input: {
    ...globalStyles.input,
  },
  textView: {
    alignItems: "center",
    gap: 5,
  },
  mainWraper: {
    marginLeft: 30,
    marginRight: 30,
    gap: 94,
  },
  buttonView: {
    gap: 10,
  },
});
