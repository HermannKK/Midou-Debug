import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { Icon } from "native-base";
import {color} from './MyData/Mydata';
class TestBulle extends Component {
  watchId = null;
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.item,
    };
    onPress=this.props.onPress
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (prevProps.item.key !== prevState.info.key) {
      this.setState({
        info: prevProps.item
      });
    }
    return true;
  }

  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={1} style={styles.mainContainer} onPress={()=>onPress()}>
          <View style={styles.subContainer}>
            <View style={styles.containerGlobal}>
              <View style={styles.conatinerImage}>
                <Image
                  style={styles.imageStyle}
                  resizeMode={"cover"}
                  source={{uri:this.state.info.pictures[0]}}
                />
              </View>
              <View style={styles.conatinerGlobalDescription}>
                <Text style={styles.mainTextStyle}>
                  {this.state.info.name}
                </Text>
                <Text style={styles.infoTextStyle}>
                {this.state.info.normalDate}
                </Text>
              </View>
              <View style={styles.globalContainerVoir_icon}>
                <Icon name="eye" style={styles.iconStyle} type='AntDesign' />
                <Text style={styles.voirTextStyle}>Voir</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white"
  },
  containerGlobal: { flex: 1, flexDirection: "row" },
  conatinerImage: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: { width: 70, height: 70, borderRadius: 35 },
  conatinerGlobalDescription: {
    flex: 2,
    flexDirection: "column",
    margin: 10
  },
  mainTextStyle: {
    flex: 1,
    fontSize: 19,
    fontWeight: "bold",
    textAlignVertical: "center",
    color: "black"
  },
  infoTextStyle: {
    flex: 1,
    color: "gray",
    fontSize: 13
  },
  globalContainerVoir_icon: {
    flex: 1,
    flexDirection: "row",
    marginTop: 33,
    marginBottom: 33,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    backgroundColor:color.bleu
  },
  iconStyle: {
    fontSize: 20,
    color: 'white',
    flex: 1,
    margin: 5,
    textAlignVertical: "center",
    textAlign: "center"
  },
  voirTextStyle: {
    flex: 2,
    textAlignVertical: "center",
    color: 'white',
    fontSize: 15
  }
});

export default TestBulle;
