import * as React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import ModifierEmail from "./ModifierEmail";
import ModifierNomComplet from "./ModifierNomComplet";
import ParametresGeneral from "./ParametresGeneral";
import ImageViewer from "../othersComponents/ImageViewer";
import BackBouton from "../othersComponents/BackBouton";

const Navsettings = createStackNavigator(
  {
    ParametresGeneral: {
      screen: ParametresGeneral,
      navigationOptions: function({ navigation }) {
        return {
          title: "Parametres   ",
          headerLeft: <BackBouton goback={navigation} />
        };
      }
    },
    ModifierEmail: {
      screen: ModifierEmail,
      navigationOptions: () => ({
        title: ""
      })
    },
    ModifierNomComplet: {
      screen: ModifierNomComplet,
      navigationOptions: () => ({
        title: ""
      })
    },
    ImageViewer: {
      screen: ImageViewer,
      navigationOptions: () => ({
        title: "Photo de profil    ",    
      })
    }
  },
  {
    initialRouteName: "ParametresGeneral",
    headerMode: "screen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#EE5A24"
      },
      headerTintColor: "#fff"
    }
  }
);

const NavParametres = createAppContainer(Navsettings);

export default NavParametres;
