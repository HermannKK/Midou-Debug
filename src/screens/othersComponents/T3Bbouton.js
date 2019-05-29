import React from "react";
import { Icon } from "native-base";
import {
  View,
  StyleSheet,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

export default class T3PBouton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deleteactive: false };
    this.content = this.props.data
  }

  styles = StyleSheet.create({
    mainContainer: {
      height: this.props.size.height,
      width: this.props.size.width,
      alignItems: "center",
      justifyContent: "center",
    },
    iconback: { color: "white", fontSize: 23 },
    icon3p: { color: "white", fontSize: this.props.iconsize },
    optionSt: {
      fontSize: 18,
      color: "black",
      paddingLeft: 10
    }
  })

  render() {
    return (
      <View
        style={this.styles.mainContainer}
      >
        <Menu
          open={() => {
            this.setState({ deleteactive: true });
          }}
        >
          <MenuTrigger>
            <Icon
              name="dots-three-vertical"
              type="Entypo"
              style={this.styles.icon3p}
            />
          </MenuTrigger>
          <MenuOptions>
            {this.content.map(({ text, func }) => (
              <MenuOption
                onSelect={() => func()}
                text={text}
                key={text}
                customStyles={{ optionText: this.styles.optionSt }}
              />
            ))}
          </MenuOptions>
        </Menu>
      </View>
    );
  }
}

const color = {
  bg: "#F0F0F2",
  orange: "#EE5A24"
};