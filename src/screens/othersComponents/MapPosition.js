import React from "react";
import { StyleSheet, View, Image, Dimensions,Text } from "react-native";
import { Icon } from "native-base";
import Mapbox from "@mapbox/react-native-mapbox-gl";
Mapbox.setAccessToken(
  "pk.eyJ1IjoiYWxpbm8xOTk4IiwiYSI6ImNqcHdvdG13ZjBkb280OHIxZTV6dDVvOWUifQ.IqCLhCar6dlPsSXwPQbE3A"
);

class MapPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.customerPosition = [-6.8438266, 34.0097651];
    this.dimension = Dimensions.get("window");
    this.donne = {
      height: 130,
      zomLevel: 10,
      position: [-6.8438266, 34.0097651],
      title: "Votre client"
    };
  }

  render() {
    const { height, zomLevel, position, title, image } = this.props;
    return (
      <View style={styles.mapViewContainer}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          minZoomLevel={zomLevel}
          zoomLevel={zomLevel}
          maxZoomLevel={zomLevel}
          centerCoordinate={position}
          style={[styles.mapViewContainer, { height: height }]}
          rotateEnabled={false}
          scrollEnabled={false}
          logoEnabled={false}
          attributionEnabled={false}
        >
          <Mapbox.PointAnnotation key={title} id={title} coordinate={position}>
            <View style={styles.imageCon}>
              <Image
                style={styles.cmLocationImageStyle}
                resizeMode={"cover"}
                source={{ uri: image }}
              />
            </View>
            <Mapbox.Callout
              title={title}
              contentStyle={styles.calloutContentStyle}
              textStyle={styles.calloutTextStyle}
            />
          </Mapbox.PointAnnotation>
        </Mapbox.MapView>
        <Text style={{paddingLeft:4}}>
          ({Math.round(position[0]*10**6)/10**6} ; {Math.round(position[1]*10**6)/10**6} )
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cmLocationImageStyle: { width: 40, height: 40, borderRadius: 20 },
  imageCon: {
    justifyContent: "center",
    alignItems: "center",
    width: 40
  },
  calloutContentStyle: {
    height: 30,
    width: 150,
    borderRadius: 5,
    justifyContent: "center"
  },
  calloutTextStyle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  mapViewContainer: {
    overflow: "hidden",
    borderRadius: 15
  }
});

export default MapPosition;
