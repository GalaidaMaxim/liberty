import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./screens/LoginScreen";
import { MainScreen } from "./screens/Main";
import { DictionaryScreen } from "./screens/DictionaryScreen";
import { store } from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { Loader } from "./components/Loader";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(40, 40, 40)",
    card: "rgb(70, 70, 70)",
    text: "white",
    border: "gray",
    primary: "orange",
    placeholder: "rgba(255, 255, 255, 0.7)",
  },
  shadow: "1px 1px 7px gray",
};

const MainStack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <MainStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Login"
          >
            <MainStack.Screen name="Login" component={LoginScreen} />
            <MainStack.Screen name="Main" component={MainScreen} />
            <MainStack.Screen name="Dictionary" component={DictionaryScreen} />
          </MainStack.Navigator>
        </NavigationContainer>
        <Loader />
      </SafeAreaProvider>
    </Provider>
  );
}
