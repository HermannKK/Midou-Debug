import React from "react";
import { Icon } from "native-base";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";

class OneAnnonce extends React.Component {
  constructor(props) {
    super(props);
    this.state = { look: null };
    this.detailsAnnonce=this.props.detailsAnnonce;
  }



  oneElement = props => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.oneMain}
        onPress={() => {
          this.detailsAnnonce(props);
        }}
      >
        <View>
          <Text style={styles.PlatNameStyle}>{props.name}</Text>
        </View>
        <View style={styles.conatinerImage}>
          <Image
            style={styles.imageStyle}
            resizeMode={"cover"}
            source={{uri: props.pictures[0]}}
          />
        </View>
        <View>
          <Text style={styles.PostTimeContaine} numberOfLines={2}>
            {props.description}
          </Text>
        </View>

        <View style={styles.footerConatain}>
          <Text style={styles.PostTimeContaine}>Il ya 3</Text>
          <Text style={styles.GainContain}>{props.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const data = this.props.data;
    return (
      <View style={styles.mainContain}>
        {this.oneElement(data)}
          <View
            style={{
              height: 230,
              flex: 1,
              marginLeft: 3.5,
              marginRight: 3.5,
              borderRadius: 10,
              padding: 5
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContain: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    padding: 3.5
  },
  oneMain: {
    height: 230,
    // justifyContent: ,
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ecf0f1",
    marginLeft: 3.5,
    marginRight: 3.5,
    borderRadius: 10,
    padding: 5
  },
  conatinerImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginBottom: 5
  },
  imageStyle: {
    height: 100,
    width: 150,
    borderRadius: 10
  },
  PlatNameStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5
  },
  footerConatain: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 3.5,
    paddingRight: 3.5,
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5
  },
  boldText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  PostTimeContaine: { fontSize: 16 },
  GainContain: { fontSize: 18, color: "black", fontWeight: "bold" }
});

export default OneAnnonce;
