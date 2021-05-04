import "react-native-gesture-handler";
import * as React from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import MainFlow from "./MainFlow";

import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["Setting a timer", "Unhandled promise rejection"]);

import store from "./app/store";
import { Provider } from "react-redux";
import { AppLoading } from "expo";

let customFonts = {
  "SF-Pro-Display-regular": require("./assets/fonts/FontsFree-Net-SFProDisplay-Regular.ttf"),
  "SF-Pro-Display-thin": require("./assets/fonts/FontsFree-Net-SFProDisplay-Thin.ttf"),
  "SF-Pro-Display-semibold": require("./assets/fonts/FontsFree-Net-SFProDisplay-Semibold.ttf"),
  "SF-Pro-Display-light": require("./assets/fonts/FontsFree-Net-SFProDisplay-Light.ttf"),
  "SF-Pro-Display-medium": require("./assets/fonts/FontsFree-Net-SFProDisplay-Medium.ttf"),
  "SF-Pro-Text-regular": require("./assets/fonts/FontsFree-Net-SFProText-Regular.ttf"),
  "Helvetica-Neue-light": require("./assets/fonts/HelveticaNeueLt.ttf"),
  HelveticaNeuBold: require("./assets/fonts/HelveticaNeuBold.ttf"),
  "SF-Pro-Text-semibold": require("./assets/fonts/FontsFree-Net-SFProText-Semibold.ttf"),
  "SF-Pro-Text-medium": require("./assets/fonts/FontsFree-Net-SFProText-Medium.ttf"),
};

export default function App() {
  const [fonts, setFonts] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      await Font.loadAsync(customFonts).then((res) => console.log(res));
      setFonts(true);
    }
    fetchData();
  }, []);

  return (
    <Provider store={store}>
      {fonts ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
          }}
        >
          <MainFlow />
        </View>
      ) : (
        <AppLoading />
      )}
    </Provider>
  );
}
