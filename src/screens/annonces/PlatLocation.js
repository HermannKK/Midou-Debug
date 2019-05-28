import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon } from "native-base";
import Mapbox from "@mapbox/react-native-mapbox-gl";
import Geolocation from "@react-native-community/geolocation";
import { hasLocationPermission } from "../home/MapComponents/Permissions/PermissionFiles";
import { color } from "../home/MapComponents/MyData/Mydata";
Mapbox.setAccessToken(
  "pk.eyJ1IjoiYWxpbm8xOTk4IiwiYSI6ImNqcHdvdG13ZjBkb280OHIxZTV6dDVvOWUifQ.IqCLhCar6dlPsSXwPQbE3A"
);
import {apidataPositionChoisi} from '../authentification/restcountriesAPI'
class PlatLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [-6.843266, 34.007651],
      locationChoseToShowFood: null,
      mapRendu: false
    };
    this.onPress = this.props.onPress;
    this.closeMap = this.props.closeMap;
  }

  takeUserPosition = async () => {
    const TakeLocationPermission = hasLocationPermission();
    if (TakeLocationPermission) {
      Geolocation.getCurrentPosition(
        async position => {
          const _pos = await [
            position.coords.longitude,
            position.coords.latitude
          ];
          this.setState({ location: _pos });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };
  BoutonToChoosePosition = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          backgroundColor: color.orange,
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
          borderRadius: 5,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          height: 60
        }}
        onPress={async () => {
          const center = await this._map.getCenter();
          let datapos
          await apidataPositionChoisi(center,datapos)
          console.log(datapos)
          await this.onPress(center);
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>
          Choose food location
        </Text>
      </TouchableOpacity>
    );
  };

  renduPointer = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 30,
          width: 30,
          position: "absolute",
          alignContent: "center",
          alignSelf: "center",
          paddingBottom: 20
        }}
      >
        <Icon
          name="dot-single"
          type="Entypo"
          style={{ color: "black", fontSize: 30 }}
        />
      </View>
    );
  };
  showClose = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          top: 10,
          left: 5,
          position: "absolute"
        }}
        onPress={() => {
          this.closeMap();
        }}
      >
        <Icon
          name="close"
          type="MaterialIcons"
          style={{ color: "black", fontSize: 30 }}
        />
      </TouchableOpacity>
    );
  };

  showLocationBouton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          this._map.moveTo(this.state.location, 500);
        }}
        style={{
          position: "absolute",
          right: 15,
          bottom: 175,
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Icon
          name="my-location"
          type="MaterialIcons"
          style={{ color: "black", fontSize: 30 }}
        />
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    this.takeUserPosition();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        }}
      >
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          minZoomLevel={10}
          zoomLevel={13}
          maxZoomLevel={18}
          showUserLocation={true}
          centerCoordinate={this.state.location}
          style={styles.mapViewContainer}
          rotateEnabled={false}
          scrollEnabled={true}
          logoEnabled={false}
          attributionEnabled={false}
          ref={c => (this._map = c)}
          onDidFinishLoadingMap={() => {
            this.setState({ mapRendu: true });
          }}
        />
        {this.showClose()}
        {this.renduPointer()}
        {this.BoutonToChoosePosition()}
        {this.showLocationBouton()}
        {!this.state.mapRendu && (
          <View style={styles.imageActivity}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mapViewContainer: {
    flex: 1
  },
  imageActivity: {
    backgroundColor: "black",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PlatLocation;
