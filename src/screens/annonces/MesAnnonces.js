import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import EnCoursA from "./EnCours";
import AncienneA from "./Ancienne";
import SalesAnalytics from "./SalesAnalytics";
import Poster from "./Poster";
import OneAnnonceSelected from "./OneAnnonceSelected";
import BackBouton from "../othersComponents/BackBouton";
import { T3PBouton } from "../othersComponents/T3Bbouton";

const TabAnnonces = createMaterialTopTabNavigator(
  {
    EnCoursC: {
      screen: EnCoursA,
      navigationOptions: {
        title: "En cours"
      }
    },
    AncienneC: {
      screen: AncienneA,
      navigationOptions: {
        title: "Anciennes"
      }
    },
    SalesAnalytics: {
      screen: SalesAnalytics,
      navigationOptions: {
        title: "Analytics"
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

const AnnoncesStack = createStackNavigator(
  {
    First: {
      screen: TabAnnonces,
      navigationOptions: function({ navigation }) {
        return {
          title: "Mes Annonces",
          headerLeft: <BackBouton goback={navigation} />
        };
      }
    },
    Poster: {
      screen: Poster,
      navigationOptions: {
        title: "Nouveau Post"
      }
    },
    OneAnnonceSelected: {
      screen: OneAnnonceSelected,
      navigationOptions: function({ navigation }) {
        return {
          title: "Votre Annonce",
          headerRight: (
            <T3PBouton data={navigation.getParam("RightButtondata")} />
          )
        };
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

const MesAnnonces = createAppContainer(AnnoncesStack);

export default MesAnnonces;
