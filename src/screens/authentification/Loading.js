import React from "react";
import { ActivityIndicator, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
export default class Loading extends React.Component {
  render() {
    return (
      <LinearGradient style={styles.container} colors={["#e67e22", "#EE5A24"]}>
        <Image
          source={require("./assets/LO.png")}
          style={{
            height: 80,
            width: 80,
            resizeMode: "cover",
            marginBottom: 0
          }}
        />
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
