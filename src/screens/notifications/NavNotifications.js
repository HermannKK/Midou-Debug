import * as React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import CookerValidateCommande from "./CookerValidateCommande";
import Notifications from "./Notifications";
import BackBouton from "../othersComponents/BackBouton";

const Navnotif = createStackNavigator(
  {
    CookerValidateCommande: {
      screen: CookerValidateCommande,
      navigationOptions: function({ navigation }) {
        return {
          title: "Nouvelle commande",
        };
      }
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: function({ navigation }) {
        return {
          title: "Notifications",
          headerLeft: <BackBouton goback={navigation} />
        };
      }
    }
  },
  {
    initialRouteName: "Notifications",
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

const NavNotifications = createAppContainer(Navnotif);

export default NavNotifications;
