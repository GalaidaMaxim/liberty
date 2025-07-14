import * as React from "react";
import { Button, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { googleRegistration } from "./service/API/auth";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "64560341529-evi1747akv69abe3263p1o78c69tvg4v.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      (async () => {
        try {
          const { token } = await googleRegistration(
            response.authentication.accessToken
          );
          console.log(token);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => promptAsync()}
      />
    </View>
  );
}
