import React from "react";
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import firebase from "react-native-firebase";

//Components
import NavAide from "../aide/NavAide";
import Home from "../../screens/home/index";
import LoggedOutStep3 from "./LoggedOutStep3";
import MesCommande from "../commandes/MesCommande";
import MesAnnonces from "../annonces/MesAnnonces";
import NavParametres from "../parametres/NavParametres";
import NavNotifications from "../notifications/NavNotifications";
import NavPoster from "../annonces/NavPoster";
import CustomDrawerContentComponent from "../othersComponents/CustomDrawerContentComponent";
//FinComponents

const _DrawerCuisinier = createDrawerNavigator(
  {
    Accueil: { screen: Home, navigationOptions: { title: "Accueil    " } },
    Poster: { screen: NavPoster, navigationOptions: { title: "Poster    " } },
    NavNotifications: {
      screen: NavNotifications,
      navigationOptions: { title: "Mes Notifications    " }
    },
    MesAnnonces: {
      screen: MesAnnonces,
      navigationOptions: { title: "Mes annonces    " }
    },
    MesCommande: {
      screen: MesCommande,
      navigationOptions: { title: "Mes commandes    " }
    },
    ParametresGeneral: {
      screen: NavParametres,
      navigationOptions: { title: "Mes parametres    " }
    },
    Aide: { screen: NavAide, navigationOptions: { title: "Aide    " } }
  },
  {
    initialRouteName: "Accueil",
    drawerPosition: "left",
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    contentOptions: {
      activeTintColor: "#f96138"
    }
  }
);

let isKnown = false;
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const _name = firebase.auth().currentUser.displayName;
    isKnown = _name ? true : false;
  }
});

const DrawerCuisinier = createAppContainer(_DrawerCuisinier);
const _initialRoute = isKnown ? "Drawer" : "Step3";

const Stack = createStackNavigator(
  {
    Home: { screen: Home },
    Drawer: DrawerCuisinier,
    Step3: { screen: LoggedOutStep3 }
  },
  {
    initialRouteName: _initialRoute,
    headerMode: "none"
  }
);

const LoggedIn = createAppContainer(Stack);

export default LoggedIn;
