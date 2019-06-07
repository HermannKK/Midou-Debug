import React from "react";
import { Icon } from "native-base";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";

class OneNotif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data, detailsOrder } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.mainContainer,
          { backgroundColor: data.recipient.isOpened ? "white" : "#ecf0f1 " }
        ]}
        onPress={() => {
          detailsOrder(data);
        }}
      >
        <View style={styles.conatinerImage}>
          <Image
            style={styles.imageStyle}
            resizeMode={"cover"}
            source={{ uri: data.pictureURL }}
          />
        </View>
        <View style={styles.conatinerGlobalDescription}>
          <Text style={styles.mainTextStyle}>
            {/* you received a <Text style={styles.boldText}>*****</Text>{" "}
            order of{" "}
            <Text style={styles.boldText}>MAD *****</Text>{" "}
            from a new customer */}
            {data.recipient.body}
          </Text>
          <Text style={[styles.boldText, { color: "black" }]}>
           {data.normalDate.time_des}
          </Text>
        </View>
        <View style={styles.globalContainerVoir_icon}>
          <Icon
            name="chevron-small-right"
            style={styles.iconStyle}
            type="Entypo"
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#bdc3c7"
  },
  conatinerImage: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60
  },
  imageStyle: { width: 60, height: 60, borderRadius: 30 },
  conatinerGlobalDescription: {
    flex: 9,
    flexDirection: "column",
    margin: 10
  },
  mainTextStyle: {
    fontSize: 15,
    textAlignVertical: "center",
    color: "black"
  },
  boldText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  globalContainerVoir_icon: {
    flex: 1,
    alignItems: "flex-end"
  },
  iconStyle: {
    fontSize: 20,
    color: "#bdc3c7"
  }
});

export default OneNotif;
