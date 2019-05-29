import React from "react";
import { Icon } from "native-base";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { tabImage, cookerImage } from "../home/MapComponents/MyData/Mydata";
class OneCommande extends React.Component {
  constructor(props) {
    super(props);
    // this.data = this.props.data;
  }
  render() {
    // const {
    //   NomPlat,
    //   pu,
    //   quantite,
    //   postTime,
    //   LieuDate,
    //   description
    // } = this.data;
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
            source={tabImage[0]}
          />
          <View style={styles.containerImageCuisto}>
            <Image
              style={{ height: 30, width: 30, borderRadius: 15 }}
              resizeMode={"cover"}
              source={cookerImage.cooker1}
            />
          </View>
        </View>
        <View style={styles.containerInfo}>
          <Text style={[styles.mainTextStyle,{color:'black',marginBottom:3}]}>
            Vous avez effectué une commande MAD 300 de Attiéke chez Kabissa
          </Text>
          <Text style={styles.mainTextStyle}>il ya 2 min</Text>
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.globalContainerVoir_icon}>
            {/* <Text style={styles.voirTextStyle}>oir le post</Text> */}
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
    padding: 5
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
    alignItems: 'flex-end',
    flex: 1,
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
    alignItems: 'center',
    height: 30,
    width: 30,
  },
  voirTextStyle: {
    color: "white",
    fontSize: 14
  },
  iconStyle: {
    fontSize: 20,
    color: "white",
  }
});

export default OneCommande;
