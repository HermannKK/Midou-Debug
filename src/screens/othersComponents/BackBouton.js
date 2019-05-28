import React from "react";
import { Icon } from "native-base";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class BackBouton extends React.Component {
  constructor(props) {
    super(props);
    this.goback = this.props.goback;
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          this.goback.navigate('Accueil');
        }}
        style={{
          height:25,
          width:50,
          justifyContent:"center",
          alignItems:'center'
        }}
      >
        <Icon name="md-arrow-back" type="Ionicons" style={styles.iconback} />
      </TouchableOpacity>
    );
  }
}

const color = {
  bg: "#F0F0F2",
  orange: "#EE5A24"
};

const styles = StyleSheet.create({
  mainContainer: {
    height:25,
    width:50,
  },
  iconback:{ color: "white" ,fontSize:23}
});

export default BackBouton;
