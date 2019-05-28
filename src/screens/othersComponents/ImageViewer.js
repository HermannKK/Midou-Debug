import React from "react";
import { StyleSheet, View, Image,Dimensions } from "react-native";
import { Icon } from "native-base";

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const data = navigation.getParam("path");
    this.setState({ path: data });
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.path && (
          <Image
            style={styles.userPhoto}
            source={{ uri: this.state.path }}
            resizeMode={"cover"}
          />
        )}
      </View>
    );
  }
}

const dimension = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  userPhoto: {
    flexDirection: "row",
    width:dimension.width,
    height: dimension.width
  }
});

export default ImageViewer
