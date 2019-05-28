import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import EnCoursC from "./EnCours";
import AncienneC from "./Ancienne";
import OneCommandeSelected from "./OneCommandeSelected";
import BackBouton from "../othersComponents/BackBouton";

const TabCommande = createMaterialTopTabNavigator(
  {
    EnCoursC: {
      screen: EnCoursC,
      navigationOptions: {
        title: "En cours"
      }
    },
    AncienneC: {
      screen: AncienneC,
      navigationOptions: {
        title: "Anciennes"
      }
    }
  },
  {
    tabBarPosition: "top",
    initialRouteName: "EnCoursC",
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "#fff",
      pressColor: "#c7ecee",
      inactiveTintColor: "#fff",
      style: {
        backgroundColor: "#EE5A24"
      },
      upperCaseLabel: false,
      labelStyle: {
        fontSize: 14
      },
      indicatorStyle: {
        backgroundColor: "#c7ecee"
      }
    }
  }
);

const CommandeStack = createStackNavigator(
  {
    First: {
      screen: TabCommande,
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
