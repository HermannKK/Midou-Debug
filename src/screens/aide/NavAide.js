import * as React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Aide from "./Aide";
import NousContacter from "./NousContacter";
import NousContacterMessage from './NousContacterMessage'
import BackBouton from "../othersComponents/BackBouton";

const NavAi = createStackNavigator(
  {
    Aide: {
      screen: Aide,
      navigationOptions: function({ navigation }) {
        return {
          title: "Aide",
          headerLeft: <BackBouton goback={navigation} />
        };
      }
    },
    NousContacter: {
      screen: NousContacter,
      navigationOptions: () => ({
        title: "Nous contacter"
      })
    },
    NousContacterMessage: {
      screen: NousContacterMessage,
      navigationOptions: () => ({
        title: "Votre message"
      })
    }
  },
  {
    initialRouteName: "Aide",
    headerMode: "screen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#EE5A24"
        //   elevation: 0, // remove shadow on Android
        //   shadowOpacity: 0 // remove shadow on iOS
      },
      headerTintColor: "#fff"
    }
  }
);

const NavAide = createAppContainer(NavAi);

export default NavAide;
