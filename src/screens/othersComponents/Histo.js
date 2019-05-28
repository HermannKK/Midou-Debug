import React from "react";
import { Icon } from "native-base";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
class Histo extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
  }
  render() {
    const {
      name,
      price,
      orders,
      date,
      localisation,
      normalDate,
      description
    } = this.data;
    fc = this.props.fc;
    console.log(this.data);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.mainContainer}
        onPress={() => {
          fc(this.data);
        }}
      >
        <View style={styles.conatinertop}>
          <Text style={styles.boldText}>{name}</Text>
          <Text style={styles.boldText}>DH {price}</Text>
        </View>
        <View style={styles.conatinerbottom}>
          <View style={styles.globalContainerVoir_icon}>
            <Icon name="history" type="FontAwesome" style={styles.iconStyle} />
          </View>
          <View>
            <Text style={styles.mainTextStyle}>
              {normalDate}
            </Text>
            <Text
              numberOfLines={1}
              style={styles.mainTextStyle}
              ellipsizeMode={"tail"}
            >
              {description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 90,
    borderBottomWidth: 1,
    borderColor: "#bdc3c7",
    padding: 10
  },
  conatinertop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  conatinerbottom: {
    flexDirection: "row",
    alignItems: "center"
  },
  mainTextStyle: {
    fontSize: 15,
    textAlignVertical: "center",
    color: "#bdc3c7"
  },
  boldText: {
    fontSize: 22,
    fontWeight: "600",
    color: "black"
  },
  globalContainerVoir_icon: {
    marginRight: 10
  },
  iconStyle: { color: "green", fontSize: 32 }
});

export default Histo;
