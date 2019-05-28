import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  PanResponder,
  ActivityIndicator
} from "react-native";
import { Icon } from "native-base";
import Mapbox from "@mapbox/react-native-mapbox-gl";
import { color } from "../home/MapComponents/MyData/Mydata";
import firebase from "react-native-firebase";
Mapbox.setAccessToken(
  "pk.eyJ1IjoiYWxpbm8xOTk4IiwiYSI6ImNqcHdvdG13ZjBkb280OHIxZTV6dDVvOWUifQ.IqCLhCar6dlPsSXwPQbE3A"
);

class CookerValidateCommande extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: null,
      showInformations: false,
      showValidateReject: false,
      topPosition: new Animated.Value(0),
      loading: true
    };
    this.customerPosition = [-6.8438266, 34.0097651];
    this.dimension = Dimensions.get("window");
    this.raisonIndispo = [
      "Indiponibilité du repas",
      "Indiponibilité du cuisinier",
      "Autres"
    ];
    this.comIcon = require('../home/MapComponents/Images/iconfinder_234-man-raising-hand-1_3099355.png');
    this.data=[]
  }

  animation = () => {
    animeFooter = Animated.timing(this.state.topPosition, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear
    }).start();
  };

  custumerLocation = () => {
    return (
      <Mapbox.PointAnnotation
        key={"customer location"}
        id={"customer location"}
        coordinate={[this.data.buyer.localisation.latitude,this.data.buyer.localisation.longitude]}
      >
        <View>
          {/* <Icon
              name="location-pin"
              type="Entypo"
              style={{ color: color.orange, fontSize: 40 }}
            /> */}
          <Image
            style={styles.cmLocationImageStyle}
            resizeMode={"cover"}
            source={this.comIcon}
          />
        </View>
        <Mapbox.Callout
          title={"Votre client"}
          contentStyle={styles.calloutContentStyle}
          textStyle={styles.calloutTextStyle}
        />
      </Mapbox.PointAnnotation>
    );
  };

  MapViewRender = () => {
    return (
      <Mapbox.MapView
        styleURL={Mapbox.StyleURL.Street}
        minZoomLevel={zomLevel}
        zoomLevel={zomLevel}
        maxZoomLevel={zomLevel}
        centerCoordinate={[this.data.buyer.localisation.latitude,this.data.buyer.localisation.longitude]}
        style={styles.mapViewContainer}
        rotateEnabled={false}
        scrollEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
      >
        {this.custumerLocation()}
      </Mapbox.MapView>
    );
  };

  totalVenteRender = () => {
    return (
      <TouchableOpacity
        style={styles.tvContenair}
        activeOpacity={0.9}
        onPress={() => {
          this.setState(prevState => ({
            showInformations: !prevState.showInformations
          }));
        }}
      >
        <Text style={styles.tvTotalPrice}>Prix total</Text>
        <View style={styles.tvDirectionRow}>
          <Text style={styles.tvMad}> MAD </Text>
          <Text style={styles.tvPrice}>
            {this.data.price * this.data.quantite}
          </Text>

          {this.state.showInformations ? (
            <Icon name="chevron-up" type="EvilIcons" style={styles.tvIcon} />
          ) : (
            <Icon name="chevron-down" type="EvilIcons" style={styles.tvIcon} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  infosVenteRender = () => {
    if (this.state.showInformations) {
      return (
        <View style={styles.ivContenair}>
          <Text style={styles.ivInfoSup}>Informations suplémentaires</Text>
          <View style={styles.ivInfoIntContainer}>
            <Text style={styles.ivText}>Repas commandé</Text>
            <Text style={styles.ivText}>{this.data.name}</Text>
          </View>
          <View style={styles.ivInfoIntContainer}>
            <Text style={styles.ivText}>Date de mise en ligne   </Text>
            <Text style={styles.ivText}>{this.data.normalDateAdded.date} à {this.data.normalDateAdded.hour}</Text>
          </View>
          <View style={styles.ivInfoIntContainer}>
            <Text style={styles.ivText}>Date de commande   </Text>
            <Text style={styles.ivText}>{this.data.normalDatePlaced.date} à {this.data.normalDatePlaced.hour}</Text>
          </View>
          <View style={styles.ivInfoIntContainer}>
            <Text style={styles.ivText}>Prix unitaire   </Text>
            <Text style={styles.ivText}>{this.data.price}</Text>
          </View>
          <View style={styles.ivInfoIntContainer}>
            <Text style={styles.ivText}>Quantité   </Text>
            <Text style={styles.ivText}>{this.data.quantite}</Text>
          </View>
          <View style={styles.ivContTotal}>
            <Text style={styles.ivTotal}>Total</Text>
            <Text style={styles.ivTotal}>
              {this.data.price * this.data.quantite}
            </Text>
          </View>
        </View>
      );
    }
  };

  modePayement = () => {
    return (
      <View style={styles.mpConatiner}>
        <Icon
          name="cash-multiple"
          type="MaterialCommunityIcons"
          style={styles.mpIcon}
        />
        <Text style={styles.mpText}>Paiement cash</Text>
      </View>
    );
  };

  infoAcheteurRender = () => {
    return (
      <View style={styles.iaContainair}>
        <View style={styles.iaView2}>
          <View style={styles.iaViewIcon1}>
            <Icon
              name="user-circle"
              type="FontAwesome"
              style={styles.iaIconUser}
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.iaUserName}>{this.data.cookerName}</Text>
            <Text>Cuisinier   </Text>
          </View>
        </View>
        <View style={styles.telephoneView}>
          <Icon
            name="phone"
            type="SimpleLineIcons"
            style={styles.iconTelephoneUser}
          />
        </View>
      </View>
    );
  };

  boutonValidateAndAnulate = () => {
    return (
      <View style={styles.bvContainer}>
        <TouchableOpacity activeOpacity={0.9} style={styles.bvCommandeBouton}>
          <Text style={styles.bvCommandeBoutonText}>VALIDER LA COMMANDE</Text>
        </TouchableOpacity>
        <View style={styles.bvRjectContainer}>
          <Text
            style={{ color: "red" }}
            onPress={() => this.setState({ showValidateReject: true })}
          >
            REJETER LA COMMANDE
          </Text>
        </View>
      </View>
    );
  };

  confirmationAnnulation = () => {
    if (this.state.showValidateReject) {
      return (
        <Animated.View
          style={[
            styles.confirmCancelCOntainer,
            { bottom: this.state.topPosition }
          ]}
          {...this.panResponder.panHandlers}
        >
          <Text style={styles.ccRaison}>
            Indiquer la raison de l'annulation
          </Text>
          <View>
            {this.raisonIndispo.map(itemSelected => {
              return (
                <View key={itemSelected} style={styles.ccRaisonDetail}>
                  {this.state.itemSelected === itemSelected ? (
                    <Text
                      onPress={() => {
                        this.setState({ itemSelected });
                      }}
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      {itemSelected}
                    </Text>
                  ) : (
                    <Text
                      onPress={() => {
                        this.setState({ itemSelected });
                      }}
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      {itemSelected}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
          <View style={styles.ccViewConfirm}>
            <Text style={{ fontSize: 17 }}>Terminé</Text>
          </View>
        </Animated.View>
      );
    }
  };
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (Math.abs(gestureState.dy) > 5) return true;
        else return false;
      },
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onPanResponderTerminationRequest: () => true,

      onPanResponderMove: (evt, gestureState) => {
        let touches = evt.nativeEvent.touches;
        if (gestureState.dy > 0 && touches.length == 1) {
          this.setState({ topPosition: new Animated.Value(-gestureState.dy) });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.state.topPosition._value >= -100) {
          this.animation();
        } else {
          this.setState({
            showValidateReject: false,
            topPosition: new Animated.Value(0),
            itemSelected: null
          });
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeReponser: (evt, gestureState) => false
    });
  }

  convertToDate = async dateObject => {
    const d = await dateObject.getDate();
    const m = (await dateObject.getMonth()) + 1;
    const y = await dateObject.getFullYear();
    const h = await dateObject.getHours();
    const min = await dateObject.getMinutes();
    const date = (await d) + "/" + m + "/" + y;
    const hour = (await h) + ":" + min;
    const normalDate=await {date, hour};
    return normalDate;
  };

  getData=async(key)=>{
    const ref=await firebase.firestore().collection('Orders').doc(key);
    const data= await ref.get().then(async doc=>{
      let _doc=await doc.data();
      let normalDateAdded= await this.convertToDate(_data.dateAdded.toDate());
      let normalDatePlaced=await this.convertToDate(_data.datePlaced.toDate());
      await _doc.push({normalDateAdded, normalDatePlaced});
      return _doc
    });
    return data
  }

  componentDidMount=async() =>{
    const { navigation } = await this.props;
    const key = await navigation.getParam("dataCom");
    this.data=await this.getData(key);
    await this.setState({loading:false});
  }
  render() {
    console.log("rendering");
    if (this.state.loading == true) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#F1592A" />
        </View>
      )}
      
    return (
      <View style={{ flex: 1 }}>
        {this.state.data != null && (
          <ScrollView style={styles.container}>
            {/* {this.props.children} */}
            {this.MapViewRender()}
            {this.totalVenteRender()}
            {this.infosVenteRender()}
            {this.modePayement()}
            {this.infoAcheteurRender()}
            {this.boutonValidateAndAnulate()}
          </ScrollView>
        )}

        {this.state.showValidateReject && (
          <View style={styles.cacheNoirView} {...this.panResponder.panHandlers}>
            <TouchableOpacity
              style={{
                flex: 1
              }}
              activeOpacity={0.9}
              onPress={() => {
                this.setState({ showValidateReject: false });
              }}
            />
          </View>
        )}
        <View>{this.confirmationAnnulation()}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1"
  },
  cmLocationImageStyle: { width: 30, height: 30 },
  calloutContentStyle: {
    height: 30,
    width: 150,
    borderRadius: 7,
    justifyContent: "center"
  },
  calloutTextStyle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  mapViewContainer: {
    height: 200,
    margin: 10,
    overflow: "hidden",
    borderRadius: 15
  },
  tvContenair: {
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15
  },
  tvTotalPrice: {
    fontSize: 25,
    fontWeight: "200",
    color: "black"
  },
  tvDirectionRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  tvMad: { fontSize: 20, color: "#a4b0be" },
  tvPrice: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
  },
  tvIcon: { color: "#a4b0be", fontSize: 25 },
  ivContenair: {
    backgroundColor: "#dfe4ea",
    borderTopColor: "#a4b0be",
    borderTopWidth: 1
  },
  ivInfoSup: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    padding: 10
  },
  ivInfoIntContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    height: 30
  },
  ivContTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "#a4b0be",
    borderTopWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    height: 36
  },
  ivText: { color: "black" },
  ivTotal: { color: "black", fontWeight: "bold" },
  mpConatiner: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    borderTopColor: "#a4b0be",
    borderTopWidth: 1
  },
  mpIcon: { color: "#a4b0be", fontSize: 30 },
  mpText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a4b0be",
    paddingLeft: 10
  },
  iaContainair: {
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    borderTopColor: "#a4b0be",
    borderTopWidth: 1
  },
  iaView2: {
    flexDirection: "row",
    alignItems: "center"
  },
  iaViewIcon1: { height: 60, width: 60, borderRadius: 30 },
  iaIconUser: { color: "black", fontSize: 60 },
  iaUserName: { color: "black", fontWeight: "bold" },
  telephoneView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#2ed573",
    justifyContent: "center",
    alignItems: "center"
  },
  iconTelephoneUser: { color: "white", fontSize: 25 },
  bvContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  bvCommandeBouton: {
    backgroundColor: color.orange,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 60,
    width: 330
  },
  bvCommandeBoutonText: { fontSize: 20, color: "white" },
  bvRjectContainer: {
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  confirmCancelCOntainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1
  },
  ccRaison: {
    fontSize: 17,
    alignSelf: "center",
    padding: 15,
    fontWeight: "bold"
  },
  ccRaisonDetail: {
    paddingLeft: 15,
    height: 50,
    justifyContent: "center",
    borderTopColor: "#a4b0be",
    borderTopWidth: 1
  },
  ccViewConfirm: {
    borderTopColor: "#a4b0be",
    borderTopWidth: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  cacheNoirView: {
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

const zomLevel = 10;

export default CookerValidateCommande;
