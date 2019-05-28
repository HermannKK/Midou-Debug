import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
class TextButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { headText, secondText, boutonText ,fc} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.HeadText}>{headText}</Text>
        <Text style={styles.secondText} >{secondText}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.containBouton}
          onPress={() => {
            fc();
          }}
        >
          <Text style={styles.BoutonText}>{boutonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 15,
    padding: 13
  },
  HeadText: {
    fontSize: 24,
    color: "black",
    textAlign: "justify"
  },
  secondText: {
    fontSize: 15,
    // color: "#bdc3c7",
    textAlign: "justify",
    marginTop: 10
  },
  containBouton: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginTop: 16,
    borderRadius: 3
  },
  BoutonText: { color: "white", fontSize: 20, padding: 15 }
});

export default TextButton;


