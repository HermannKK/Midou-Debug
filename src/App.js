import React from "react";
import { View, Text, StatusBar } from "react-native";
import LoggedOut from "./screens/authentification/LoggedOut";
import Loading from "./screens/authentification/Loading";
import LoggedIn from "./screens/authentification/LoggedIn";
import firebase from "react-native-firebase";

export default class MainApp extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: false
    };
  }
  checkNotifications = async id => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      await firebase
        .messaging()
        .getToken()
        .then(token => {
          firebase
            .firestore()
            .collection("Users")
            .doc(id)
            .update({ pushToken: token });
          firebase
            .firestore()
            .collection("Notifications")
            .where("recepient.id", "==", id)
            .get()
            .then(doc => {
              doc.forEach(_doc => {
                let _id = _doc.id;
                firebase
                  .firestore()
                  .collection("Notifications")
                  .doc(_id)
                  .update({ recipient: { token: token } });
              });
            });
          firebase
            .firestore()
            .collection("PlatPost")
            .where("userid", "==", id)
            .get()
            .then(doc => {
              doc.forEach(_doc => {
                let _id = _doc.id;
                firebase
                  .firestore()
                  .collection("PlatPost")
                  .doc(_id)
                  .update({ pushToken: token });
              });
            });
          return token;
        });
    } else {
      await ToastAndroid.show(
        "Vous ne recevrez pas de notifications de notre part",
        ToastAndroid.LONG
      );
    }
  };

  componentDidMount = async () => {
    await setTimeout(this.passToApp, 3000);
    this.authSubscription = await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.checkNotifications(user.uid);
        this.setState({ user });
      }
    });
  };

  passToApp = () => {
    this.setState({ loading: false });
  };

  componentWillUnmount() {
    this.authSubscription && this.authSubscription();
  }

  static router = LoggedIn.router;
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#d35400" barStyle="light-content" />
        {this.state.loading ? (
          <Loading />
        ) : this.state.user ? (
          <LoggedIn navigation={this.props.navigation} />
        ) : (
          <LoggedOut />
        )}
       </View>
    );
  }
}
