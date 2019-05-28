import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  PanResponder,
  ActivityIndicator,
  TouchableOpacity,Text
} from "react-native";
import { Icon } from "native-base";

class SliderImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      index: 0
    };
    this.dimension = Dimensions.get("window");
    this.width= this.dimension.width;
    this.tabI = [...this.props.tabI];
  }

  ChangeImageWithClick = clickPositionX => {
    if (clickPositionX < this.dimension.width / 2) {
      if (this.state.index > 0) {
        this.setState(prevState => ({
          index: prevState.index - 1
        }));
      }
    } else {
      if (this.state.index < this.tabI.length - 1) {
        this.setState(prevState => ({
          index: prevState.index + 1
        }));
      }
    }
  };

  Bulle = () => {
    const items = [];
    for (let i = 0; i < this.tabI.length; i++) {
      const is = this.state.index == i ? "white" : "black";
      items.push(
        <View key={i.toString()}>
          <Text style={{ color: is, fontSize: 40 }}>.</Text>
        </View>
      );
    }
    return items;
  };

  componentDidMount() {setTimeout(this.passToApp, 300);}
  passToApp = () => {
    this.setState({ loading: false });
  };
 
  render() {
    const height = this.props.height;
    if(this.state.loading){
      return(
        <View style={[styles.mainContainer, { height: height }]}>
          <ActivityIndicator size='large' color='white'/>
        </View>
      )
    }
    return (
      <TouchableOpacity
        style={[styles.mainContainer, { height: height }]}
        onPress={evt => {
          this.ChangeImageWithClick(evt.nativeEvent.pageX);
        }}
        activeOpacity={0.95}
      >
        <Image
          style={{flex: 1, flexDirection: "row",height:height, width:this.width}}
          source={{uri:this.tabI[this.state.index]}}
          resizeMode={"cover"}
          resizeMethod={"auto"}
          onError={e => console.log("erreur")}
        />
        <View style={styles.bulleStyle}>{this.Bulle()}</View>
        </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  /* imageStyle: { flex: 1, flexDirection: "row",height:this.props.height, width:300 }, */

  conatinerGlobalDescription: { marginLeft: 10 },
  bulleStyle: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SliderImage;
