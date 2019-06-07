import React, { Component } from "react";
import { SafeAreaView, NativeModules } from "react-native";
import { StyleProvider } from "native-base";
import MainApp from "./App";
import getTheme from "../native-base-theme/components";
import variables from "../native-base-theme/variables/commonColor";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import { MenuProvider } from "react-native-popup-menu";

class Setup extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Provider store={Store}>
        <MenuProvider>
          <StyleProvider style={getTheme(variables)}>
            <SafeAreaView style={{ flex: 1 }}>
              <MainApp />
            </SafeAreaView>
          </StyleProvider>
        </MenuProvider>
      </Provider>
    );
  }
}

export default Setup;
