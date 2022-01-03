import React, { useState, ReactNode } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

type AppBootstrapProps = {
  children: ReactNode;
};

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });
};

const AppBootstrap = ({ children }: AppBootstrapProps) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  return fontLoaded ? (
    <>{children}</>
  ) : (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.log(err)}
    />
  );
};

export default AppBootstrap;
