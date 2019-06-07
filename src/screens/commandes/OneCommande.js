import React from "react";
import { Icon } from "native-base";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { tabImage, cookerImage } from "../home/MapComponents/MyData/Mydata";
class OneCommande extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
  }
  render() {
    fc = this.props.fc;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.mainContainer}
        onPress={() => {
          fc(this.data);
        }}
      >
        <View style={styles.containerImagePlat}>
          <Image
            style={{ height: 60, width: 60, borderRadius: 30 }}
            resizeMode={"cover"}
            source={{ uri: this.data.imagePlat[0] }}
          />
          <View style={styles.containerImageCuisto}>
            <Image
              style={{ height: 30, width: 30, borderRadius: 15 }}
              resizeMode={"cover"}
              source={{uri:this.data.cookerInfo.photo}}
            />
          </View>
        </View>
        <View style={styles.containerInfo}>
          <Text
            style={[styles.mainTextStyle, { color: "black", marginBottom: 3 }]}
            numberOfLines={3}
          >
            Vous avez effectué une commande MAD{" "}
            {this.data.price * this.data.quantite} de {this.data.name} chez{" "}
            {this.data.cookerInfo.name}
          </Text>
          <Text style={styles.mainTextStyle}>
            {this.data.normalDate.time_des}
          </Text>
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.globalContainerVoir_icon}>
            <Icon name="eye" style={styles.iconStyle} type="AntDesign" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 90,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#bdc3c7",
    backgroundColor: "#f5f6fa",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  containerImagePlat: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  containerInfo: {
    marginLeft: 10,
    flex: 5,
    justifyContent: "center"
  },
  mainTextStyle: {
    fontSize: 14,
    textAlignVertical: "center",
    color: "#bdc3c7"
  },
  containerBottom: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1
  },
  containerImageCuisto: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0
  },
  globalContainerVoir_icon: {
    borderRadius: 15,
    backgroundColor: "#2897f3",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30
  },
  voirTextStyle: {
    color: "white",
    fontSize: 14
  },
  iconStyle: {
    fontSize: 20,
    color: "white"
  }
});

export default OneCommande;
