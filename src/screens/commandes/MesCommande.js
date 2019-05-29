import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import EnCoursC from "./ContenuMesCommandes";
import ContenuMesCommandes from './ContenuMesCommandes'
import OneCommandeSelected from "./OneCommandeSelected";
import BackBouton from "../othersComponents/BackBouton";

const CommandeStack = createStackNavigator(
  {
    ContenuMesCommandes: {
      screen: ContenuMesCommandes,
      navigationOptions: function({ navigation }) {
        return {
          title: "Mes commandes",
          headerLeft: <BackBouton goback={navigation} />
        };
      }
    },
    OneCommandeSelected: {
      screen: OneCommandeSelected,
      navigationOptions:{
        title:'Votre Commande'
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#EE5A24",
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0 // remove shadow on iOS
      },
      headerTintColor: "#fff"
    }
  }
);

const MesCommande = createAppContainer(CommandeStack);

export default MesCommande;
