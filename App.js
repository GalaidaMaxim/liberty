import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./screens/LoginScreen";
import { MainScreen } from "./screens/Main";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const MainStack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen name="Main" component={MainScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
