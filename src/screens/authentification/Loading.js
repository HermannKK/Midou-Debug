import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar
} from "react-native";
export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/splash.png")}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={require("./assets/LO.png")}
            style={{ height: 100, width: 100, resizeMode: "cover", marginBottom: 100 }}
          />
          <ActivityIndicator size="large" color="white" />
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#EE5A24"
  }
});
