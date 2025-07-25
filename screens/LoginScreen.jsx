import { useState } from "react";
import { useEffect } from "react";
import { Button, View, TextInput } from "react-native";
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

export const LoginScreen = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "64560341529-evi1747akv69abe3263p1o78c69tvg4v.apps.googleusercontent.com",
  });
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();

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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "90%" }}>
        <TextInput
          placeholder="email"
          style={{
            ...styles.input,
            borderColor: theme.colors.border,
            color: theme.colors.text,
          }}
          placeholderTextColor={theme.colors.placeholder}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="password"
          style={{
            ...styles.input,
            borderColor: theme.colors.border,
            color: theme.colors.text,
          }}
          placeholderTextColor={theme.colors.placeholder}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={{ marginBottom: 10 }}>
          <Button disabled={!request} title="Login" onPress={onLogin} />
        </View>
        <Button
          disabled={!request}
          title="Login with Google"
          onPress={() => promptAsync()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    ...globalStyles.input,
    marginBottom: 10,
  },
});
