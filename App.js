import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./screens/LoginScreen";
import { MainScreen } from "./screens/Main";
import { WordScreen } from "./screens/WordScreen";
import { DictionaryScreen } from "./screens/DictionaryScreen";
import { store } from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { Loader } from "./components/Loader";
import { MenuProvider } from "react-native-popup-menu";
import { useFonts } from "expo-font";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    background: "#fefae3",
    lightText: "#fefae3",
    card: "rgb(70, 70, 70)",
    text: "#493639",
    border: "#493639",
    primary: "orange",
    placeholder: "rgba(39, 12, 12, 0.7)",
    gostText: "rgba(73,54,57,0.7)",
    header: "#896C32",
  },
  fontFamily: "Georgia",
  shadow: "1px 1px 7px gray",
};

const MainStack = createStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    Georgia: require("./fonts/georgia/georgia.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MenuProvider>
          <NavigationContainer theme={MyTheme}>
            <MainStack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Login"
            >
              <MainStack.Screen name="Login" component={LoginScreen} />
              <MainStack.Screen name="Main" component={MainScreen} />
              <MainStack.Screen name="Word" component={WordScreen} />
              <MainStack.Screen
                name="Dictionary"
                component={DictionaryScreen}
              />
            </MainStack.Navigator>
          </NavigationContainer>
          <Loader />
        </MenuProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
