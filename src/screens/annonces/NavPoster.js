import * as React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Poster from "./Poster";
import ImageViewer from "../othersComponents/ImageViewer";
import BackBouton from "../othersComponents/BackBouton";

const NavPs = createStackNavigator(
  {
    Poster: {
      screen: Poster,
      navigationOptions: function({ navigation }) {
        return {
          title: "Nouvelle Annonce",
          headerLeft: <BackBouton goback={navigation} />
        };
      }
    },
    ImageViewer: {
      screen: ImageViewer,
      navigationOptions: () => ({
        title: "Votre plat"
      })
    }
  },
  {
    initialRouteName: "Poster",
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

const NavPoster = createAppContainer(NavPs);

export default NavPoster;
