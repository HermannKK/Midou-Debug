import React from "react";
import { View, Text,StatusBar } from "react-native";
import LoggedOut from "./screens/authentification/LoggedOut";
import Loading from "./screens/authentification/Loading";
import LoggedIn from "./screens/authentification/LoggedIn";
import firebase from "react-native-firebase";

export default class MainApp extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: false
    };
  }

  componentDidMount() {
    setTimeout(this.passToApp, 3000);
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      });
    });
  }

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
