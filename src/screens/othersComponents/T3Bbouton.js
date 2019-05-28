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

export class T3PBouton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deleteactive: false };
    this.content = this.props.data
  }

  render() {
    return (
      <View
        style={{
          height: 25,
          width: 50,
          justifyContent: "center",
          alignItems: "center"
        }}
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
              style={styles.icon3p}
            />
          </MenuTrigger>
          <MenuOptions>
            {this.content.map(({ text, func }) => (
              <MenuOption
                onSelect={() => func()}
                text={text}
                key={text}
                customStyles={{ optionText: styles.optionSt }}
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

const styles = StyleSheet.create({
  mainContainer: {
    height: 25,
    width: 50
  },
  iconback: { color: "white", fontSize: 23 },
  icon3p: { color: "white", fontSize: 19 },
  optionSt: {
    fontSize: 18,
    color: "black",
    paddingLeft: 10
  }
});
