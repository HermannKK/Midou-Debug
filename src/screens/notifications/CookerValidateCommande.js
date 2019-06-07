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
  ActivityIndicator,
  Linking
} from "react-native";
import { Icon } from "native-base";
import Mapbox from "@mapbox/react-native-mapbox-gl";
import { color } from "../home/MapComponents/MyData/Mydata";
import firebase from "react-native-firebase";
import { convertDate } from "../../functionsRu/groupeA";
import { isBoolean } from "util";
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
      loading: false,
      data: null,
      isLoading1: false
    };
    this.dimension = Dimensions.get("window");
    this.raisonIndispo = [
      "Indiponibilité du repas",
      "Indiponibilité du cuisinier",
      "Autres"
    ];
    this.comIcon = require("../home/MapComponents/Images/iconfinder_234-man-raising-hand-1_3099355.png");
    this.data = null;
    this.orderdata = null;
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
        coordinate={[
          this.state.data.buyer.localisation.longitude,
          this.state.data.buyer.localisation.latitude
        ]}
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
        centerCoordinate={[
          this.state.data.buyer.localisation.longitude,
          this.state.data.buyer.localisation.latitude
        ]}
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
            {this.state.data.price * this.state.data.quantite}
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
            <Text style={styles.ivText}>{this.state.data.name}</Text>
          </View>
          <View style={styles.ivInfoIntContainer}>
            <Text style={styles.ivText}>Date de mise en ligne </Text>
            <Text style={styles.ivText}>
              {this.state.data.dateAdded.formattedDate} à{" "}
              {this.state.data.dateAdded.formattedTime}
            </Text>
          </View>
          <View style={styles.ivInfoIntContainer}>
            <Text style={styles.ivText}>Date de commande </Text>
            <Text style={styles.ivText}>
              {this.state.data.datePlaced.formattedDate} à{" "}
              {this.state.data.datePlaced.formattedTime}
            </Text>
          </View>
          <View style={styles.ivInfoIntContainer}>
            <Text style={styles.ivText}>Prix unitaire </Text>
            <Text style={styles.ivText}>{this.state.data.price}</Text>
          </View>
          <View style={styles.ivInfoIntContainer}>
            <Text style={styles.ivText}>Quantité </Text>
            <Text style={styles.ivText}>{this.state.data.quantite}</Text>
          </View>
          <View style={styles.ivContTotal}>
            <Text style={styles.ivTotal}>Total</Text>
            <Text style={styles.ivTotal}>
              {this.state.data.price * this.state.data.quantite}
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
            {/* <Icon
              name="user-circle"
              type="FontAwesome"
              style={styles.iaIconUser}
            /> */}
            <Image
              style={styles.iaIconUser}
              resizeMode={"cover"}
              source={{ uri: this.state.data.buyer.picture }}
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.iaUserName}>{this.state.data.buyer.name}</Text>
            <Text>Achetteur</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.telephoneView}
          opacity={1}
          onPress={() => {
            Linking.openURL(`tel:${this.state.data.buyer.phoneNumber}`);
          }}
        >
          <Icon
            name="phone"
            type="SimpleLineIcons"
            style={styles.iconTelephoneUser}
          />
        </TouchableOpacity>
      </View>
    );
  };

  boutonValidateAndAnulate = () => {
    return (
      <View style={styles.bvContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.bvCommandeBouton}
          onPress={() => {
            this.updateBoard(0, this.orderdata.orderKey);
          }}
        >
          {this.state.isLoading1 ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={styles.bvCommandeBoutonText}>VALIDER LA COMMANDE</Text>
          )}
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
            {this.state.isLoading1 ? (
              <ActivityIndicator size="large" color="#F1592A" />
            ) : (
              <Text
                style={{ fontSize: 17 }}
                onPress={() => {
                  if (this.state.itemSelected)
                    this.updateBoard(1, this.orderdata.orderKey);
                }}
              >
                Terminé
              </Text>
            )}
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

  updateBoard(type, key) {
    this.setState({
      isLoading1: true
    });
    const updateRef = firebase
      .firestore()
      .collection("Orders")
      .doc(key);
    updateRef
      .update({
        validate: type == 0 ? true : false,
        raisonRefu: type == 1 && this.state.itemSelected
      })
      .then(docRef => {
        this.setState({
          isLoading1: false,
          showValidateReject: false,
          data: { ...this.state.data, validate: type == 0 ? true : false }
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          isLoading1: false,
          showValidateReject: false
        });
      });
  }

  getData = async key => {
    let x = null;
    const ref = await firebase
      .firestore()
      .collection("Orders")
      .doc(key);

    const data = await ref.get().then(async doc => {
      x = doc.data();
      const dateAdded = await convertDate(x.dateAdded.toDate());
      const datePlaced = await convertDate(x.datePlaced.toDate());
      this.setState({ data: { ...x, dateAdded, datePlaced }, loading: true });
      return doc.data().buyer.name;
    });
    return x;
    // return data;
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.orderdata = navigation.getParam("dataCom");
    this.data = this.getData(this.orderdata.orderKey);
  }
  render() {
    console.log("rendering");
    console.log(this.state.data);
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading ? (
          <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
              {this.MapViewRender()}
              {this.totalVenteRender()}
              {this.infosVenteRender()}
              {this.modePayement()}
              {this.infoAcheteurRender()}
              {this.state.data.validate == (null || undefined) &&
                this.boutonValidateAndAnulate()}
            </ScrollView>
            {typeof this.state.data.validate == "boolean" && (
              <Text
                style={{
                  backgroundColor: "#2ed573",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  color: "white",
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 18
                }}
              >
                Commande {this.state.data.validate ? "accepté" : "refusé"}
              </Text>
            )}
          </View>
        ) : (
          <ActivityIndicator size="large" color="#F1592A" />
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
    backgroundColor: "#ecf0f1",
    flex: 1
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
  iaIconUser: { height: 60, width: 60, borderRadius: 30 },
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
