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
  render() {
    console.disableYellowBox = true
    return (
      <Root>
        <Setup />
      </Root>
    );
  }
}
