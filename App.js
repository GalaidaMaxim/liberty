import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./screens/LoginScreen";
import { MainScreen } from "./screens/Main";
import { store } from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { Loader } from "./components/Loader";
import { ImageBackground } from "react-native";
const MainStack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ImageBackground
          source={{ uri: "https://source.unsplash.com/random/800x600" }}
          style={{ flex: 1 }}
        >
          <NavigationContainer>
            <MainStack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Login"
            >
              <MainStack.Screen name="Login" component={LoginScreen} />
              <MainStack.Screen name="Main" component={MainScreen} />
            </MainStack.Navigator>
          </NavigationContainer>
          <Loader />
        </ImageBackground>
      </SafeAreaProvider>
    </Provider>
  );
}
