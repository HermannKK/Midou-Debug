import React from "react";
import {
  BackHandler,
  ToastAndroid,
} from 'react-native';
import { Root } from "native-base";
import Setup from "./src/Setup";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
      ToastAndroid.show('Action desactivée', ToastAndroid.SHORT);
      return true;
  }
  render() {
    return (
      <Root>
        <Setup />
      </Root>
    );
  }
}
