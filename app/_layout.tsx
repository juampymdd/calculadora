import { View } from "react-native";

import { useFonts } from "expo-font";
import { Slot } from "expo-router";

import { globalStyles } from "@/styles/global-styles";

// const isAndroid = Platform.OS === "android";
// if (isAndroid) {
//   NavigationBar.setBackgroundColorAsync("black");
// }

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null; // or a loading indicator
  }

  return (
    <View style={globalStyles.background}>
      <Slot />
    </View>
  );
};

export default RootLayout;
