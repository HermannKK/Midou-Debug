import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  TouchableOpacity,
  Easing,
  ActivityIndicator,StatusBar
} from "react-native";
import { Icon } from "native-base";
import Mapbox from "@mapbox/react-native-mapbox-gl";
import Geolocation from "@react-native-community/geolocation";
import { hasLocationPermission } from "./Permissions/PermissionFiles";
import TestBulle from "./TestBulle";
import StoryFood from "./StoryFood";
import { dataFood, color } from "./MyData/Mydata";
import firebase from "react-native-firebase";
Mapbox.setAccessToken(
  "pk.eyJ1IjoiYWxpbm8xOTk4IiwiYSI6ImNqcHdvdG13ZjBkb280OHIxZTV6dDVvOWUifQ.IqCLhCar6dlPsSXwPQbE3A"
);

class RenderMap extends Component {
  watchId = null;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      location: [34.016127, -6.836705],
      ValuerenderMap: false,
      showBulle: false,
      mapToMoov: true,
      activeIndex: null,
      bulleInfomations: null,
      center: null,
      showStoryFood: false,
      animToReturnLocation: new Animated.Value(1),
      data: [],
      userID: null
    };
    this.data = [];
    this.dataFood = null;
    this.openDrawerFun = this.props.onclick;
    this.unsubscribe = null;
  }

  getData = async () => {
    const ref = await firebase
      .firestore()
      .collection("PlatPost")
      .where("active", "==", true);
    this.unsubscribe = await ref.onSnapshot(this.parseData);
    await this.setState({ loading: false });
  };

  parseData = async querrySnapshot => {
    await querrySnapshot.forEach(async doc => {
      let _data = await doc.data();
      let key = await doc.id;
      let normalDate = await this.convertToDate(_data.date.toDate());
      await this.data.push({ ..._data, key, normalDate });
    });
    await this.setState({ data: [...this.data] });
  };

  convertToDate = async dateObject => {
    const d = await dateObject.getDate();
    const m = (await dateObject.getMonth()) + 1;
    const y = await dateObject.getFullYear();
    const newDate = (await d) + "/" + m + "/" + y;
    return newDate;
  };

  animToLocation = props => {
    Animated.timing(this.state.animToReturnLocation, {
      toValue: props,
      duration: 300,
      easing: Easing.linear
    }).start();
  };
  showBarHeader = () => {
    return (
      <Animated.View
        style={{
          marginTop: 15,
          paddingLeft: 15,
          position: "absolute"
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.openDrawerFun()}
        >
          <Icon
            name="menu"
            type="Entypo"
            style={{ color: "black", fontSize: 35 }}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  showLocationBouton = () => {
    return (
      <View
        style={{
          position: "absolute",
          right: 15,
          bottom: 145,
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={async () => {
            await this._map.moveTo(this.state.location, 500);
            this._map.zoomTo(14, 500);
          }}
        >
          <Icon
            name="my-location"
            type="MaterialIcons"
            style={{ color: "black", fontSize: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  showBulleManager = () => {
    if (this.state.showBulle) {
      return (
        <TestBulle
          item={this.state.bulleInfomations}
          onPress={this.bulleEventClick}
        />
      );
    }
  };
  bulleEventClick = () => {
    this.setState({ showBulle: false, showStoryFood: true });
  };
  bulleStoryEventClick = () => {
    this.setState({ showStoryFood: false, showBulle: true });
    StatusBar.setHidden(false);
  };

  takeUserPosition = () => {
    // console.log('position')
    const TakeLocationPermission = hasLocationPermission();
    if (TakeLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          // console.log(position)
          const _pos = [position.coords.latitude, position.coords.longitude];
          this.setState({ location: _pos, ValuerenderMap: true });
        },
        error => {
          console.log(error.code, error.message);
          this.takeUserPosition();
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };

  onAnnotationSelected = async (activeIndex, feature) => {
    const result = await this.data.filter(item => {
      if (item.key === this.data[activeIndex].key) {
        return item;
      }
    });

    if (this.state.activeIndex === activeIndex) {
      this.setState(prevState => ({
        showBulle: !prevState.showBulle,
        mapToMoov: false
      }));
    } else {
      if (this.state.showBulle === false) {
        this.setState({
          showBulle: true,
          activeIndex: activeIndex,
          bulleInfomations: result[0],
          mapToMoov: true
        });
      } else {
        this.setState({
          activeIndex: activeIndex,
          bulleInfomations: result[0],
          mapToMoov: true
        });
      }
    }
    if (this.state.mapToMoov) {
      await this._map.moveTo(
        [
          this.data[activeIndex].localisation.latitude,
          this.data[activeIndex].localisation.longitude
        ],
        500
      );
      this._map.zoomTo(14, 500);
    }
  };

  renderAnnotations() {
    const items = [];
    for (let i = 0; i < this.data.length; i++) {
      items.push(
        <Mapbox.PointAnnotation
          key={this.data[i].key}
          id={this.data[i].key}
          coordinate={[
            this.data[i].localisation.latitude,
            this.data[i].localisation.longitude
          ]}
        >
          <TouchableOpacity
            style={styles.annotationContainer}
            activeOpacity={0.8}
            onPress={feature => {
              this.onAnnotationSelected(i, feature);
              this.animToLocation(1);
            }}
          >
            <Image
              style={[styles.imageS]}
              resizeMode={"cover"}
              source={{ uri: this.data[i].pictures[0] }}
            />
          </TouchableOpacity>
          <Mapbox.Callout
            title={this.data[i].name}
            contentStyle={{ borderRadius: 7 }}
            textStyle={{ fontSize: 14, fontWeight: "bold" }}
          />
        </Mapbox.PointAnnotation>
      );
    }

    return items;
  }

  componentDidMount() {
    this.takeUserPosition();
    this.getData();
  }

  // componentWillUnmount(){
  //   this.unsubscribe()
  // }

  render() {
    console.log(this.data);
    return (
      <View style={styles.container}>
        {this.props.children}
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={14}
          maxZoomLevel={20}
          showUserLocation={true}
          centerCoordinate={this.state.location}
          style={styles.container}
          rotateEnabled={false}
          logoEnabled={false}
          attributionEnabled={false}
          ref={c => (this._map = c)}
        >
          {this.renderAnnotations()}
        </Mapbox.MapView>
        {this.showBulleManager()}
        {this.showBarHeader()}
        {this.showLocationBouton()}
        {this.state.showStoryFood && (
          <StoryFood
            onclick={this.bulleStoryEventClick}
            anim={this.animToLocation}
            item={this.state.bulleInfomations}
            localisation={this.state.location}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  annotationContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.orange,
    borderRadius: 20
  },
  imageS: {
    width: 40,
    height: 40,
    borderRadius: 20,
    transform: [{ scale: 0.9 }]
  }
});

export default RenderMap;
