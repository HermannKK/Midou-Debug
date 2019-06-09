import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  PanResponder,
  ActivityIndicator,
  Alert
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Icon } from "native-base";

const styles = StyleSheet.create({
  degradestyle: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    opacity: 0.25
  },
  ReactionAfterActionCont: {
    backgroundColor: "#EA2027",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    position: "absolute",
    right: 10,
    left: 10,
    bottom: 10
  },
  ReactionAfterActionText: {
    alignSelf: "center",
    fontSize: 15,
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10
  }
});

export const degrader = (props) => (
  <LinearGradient
    // start={{ x: 0, y: 0 }}
    // end={{ x: 1, y: 0 }}
    colors={props}
    style={styles.degradestyle}
  />
);

export const reactionAfterAction = props => (
  <View style={styles.ReactionAfterActionCont}>
    <Text style={styles.ReactionAfterActionText}>{props}</Text>
  </View>
);
