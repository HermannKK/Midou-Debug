import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  PanResponder,
  ActivityIndicator,
  Alert
} from "react-native";
import { Icon, Toast } from "native-base";
import firebase from "react-native-firebase";
import { color, dataFood } from "./MyData/Mydata";
import T3Bbouton from "../../othersComponents/T3Bbouton";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { reactionAfterAction } from "../../othersComponents/RepetedFunctions/GroupeA";

class StoryFood extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      imageLoad: false,
      showCommandeBouton: false,
      index: 0,
      quantite: 1,
      plusInfo: false,
      bgColor: "#000",
      animHeigthCommande: new Animated.Value(0),
      showerrorbuying: false,
      errorBuying: true
    };

    this.onPress = this.props.onclick;
    this.localisation = this.props.localisation;
    this.item = this.props.item;
    this.user = {
      name: null,
      photo: null,
      phone: null,
      id: null
    };
    this.dimension = Dimensions.get("window");
  }
  showBuyError = () => {
    const hideerror = () => {
      this.setState({ showerrorbuying: false });
    };
    this.setState({ showerrorbuying: true });
    setTimeout(hideerror, 2500);
  };

  verificationBuying = () => {
    if (this.user.id == this.item.userid) {
      this.setState({
        errorBuying: true,
        loading: false,
        showCommandeBouton: false
      });
    } else this.setState({ errorBuying: false });
  };

  renderLoading() {
    if (this.state.loading == true) {
      return <ActivityIndicator size="large" color="white" />;
    }
    {
      return <Text style={styles.textPost}>Commander</Text>;
    }
  }

  incrementViews = async () => {
    const ref = await firebase
      .firestore()
      .collection("PlatPost")
      .doc(this.item.key);
    await ref.update({ views: this.item.views + 1 });
  };
  incrementOrders = async () => {
    const ref = await firebase
      .firestore()
      .collection("PlatPost")
      .doc(this.item.key);
    await ref.update({ orders: firebase.firestore.FieldValue.increment(this.state.quantite) });
  };
  sendNotification = async orderKey => {
    const value = (await this.item.price) * this.state.quantite;
    const bodySender =
      (await "Votre commande de ") +
      this.item.name +
      " de MAD " +
      value +
      " à bien été effectuée";
    const bodyRecipient =
      (await "Vous avez une commande de ") +
      this.item.name +
      " de MAD " +
      value;
    const ref = await firebase.firestore().collection("Notifications");
    await ref.add({
      orderKey: orderKey,
      sender: {
        id: this.user.id,
        body: bodySender,
        title: "Votre commande a bien été efectuée",
        isOpened: false
      },
      recipient: {
        id: this.item.userid,
        body: bodyRecipient,
        title: "Vous avez une nouvelle commande",
        isOpened: false,
        token: this.item.pushToken
      },
      pictureURL: this.item.pictures[0],
      date: firebase.firestore.Timestamp.now()
    });
  };
  placeOrder = async () => {
    const ref = await firebase.firestore().collection("Orders");
    await ref
      .add({
        name: this.item.name,
        platKey: this.item.key,
        quantite: this.state.quantite,
        price: this.item.price,
        datePlaced: firebase.firestore.Timestamp.now(),
        buyer: {
          name: this.user.name,
          uid: this.user.id,
          picture: this.user.photo,
          phoneNumber: this.user.phone,
          localisation: new firebase.firestore.GeoPoint(
            this.localisation[0],
            this.localisation[1]
          )
        },
        dateAdded: this.item.date
      })
      .then(async succes => {
        await this.sendNotification(succes.id);
      });
    await this.incrementOrders();
    await this.setState({ loading: false });
    await Toast.show({
      text: "Félicitations! Votre commande a bien été effectuée",
      buttonText: "Okay",
      duration: 3000,
      type: "success"
    });
  };

  changeImage = () => {
    if (
      this.state.index < this.item.pictures.length - 1 &&
      !this.state.useClickCimg
    ) {
      this.setState(prevState => ({
        index: prevState.index + 1,
        imageLoad: false
      }));
    }
  };

  ChangeImageWithClick = async clickPositionX => {
    await this.setState({ useClickCimg: true });

    if (clickPositionX < this.dimension.width / 2) {
      if (this.state.index > 0) {
        this.setState(prevState => ({
          index: prevState.index - 1,
          imageLoad: false
        }));
      }
    } else {
      if (this.state.index < this.item.pictures.length - 1) {
        this.setState(prevState => ({
          index: prevState.index + 1,
          imageLoad: false
        }));
      }
    }
  };

  animationPan1 = () => {
    anime = Animated.timing(this.state.animHeigthCommande, {
      toValue: this.dimension.height,

      duration: 200,

      easing: Easing.linear
    }).start();
  };

  animationPan2 = () => {
    this.setState({ bgColor: "#000" });
    anime = Animated.timing(this.state.animHeigthCommande, {
      toValue: 0,

      duration: 200,

      easing: Easing.linear
    }).start();
  };

  addPlus = () => {
    return (
      <TouchableOpacity
        style={styles.mainContainerAddPlus}
        activeOpacity={1}
        onPress={() => {
          this.setState({
            showCommandeBouton: true
          });
        }}
      >
        <View style={{ paddinTop: 34 }}>
          <Icon
            name="chevron-up"
            type="Entypo"
            style={{ color: color.addPlus, fontSize: 25 }}
          />
        </View>
        {!this.state.showerrorbuying && (
          <Text
            style={{ fontSize: 20, fontWeight: "200", color: color.addPlus }}
          >
            Commander maintenant
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  Signaler = () => {
    Alert.alert(
      "Signaler l'annonce ",
      "en contuniant ,Vous signalez cette annonce.rassurer vous nous l'analyserons ",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed")
        },
        { text: "OK", onPress: () => console.log("Cancel Pressed") }
      ],
      { cancelable: false }
    );
  };

  addTopBar = () => {
    return (
      <View style={styles.mainContainerTopBar}>
        <View style={styles.subContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.animationPan1();
              this.onPress();
            }}
            style={{ marginRight: 2 }}
          >
            <Icon
              name="chevron-down"
              type="Entypo"
              style={{ color: color.addPlus, fontSize: 30 }}
            />
          </TouchableOpacity>
          <Image
            style={styles.imageStyle}
            resizeMode={"cover"}
            source={{ uri: this.item.userphoto }}
          />
          <View style={styles.conatinerGlobalDescription}>
            <Text style={styles.mainTextStyle}>
              {this.item.name}
              {"    "}
            </Text>
            <Text style={styles.infoTextStyle}>
              {this.item.normalDate.time_des}
              {"    "}
            </Text>
          </View>
        </View>
        <View style={styles.indicatorContainer}>
          {this.state.imageLoad && (
            <AnimatedCircularProgress
              size={30}
              width={3}
              fill={100}
              tintColor={color.addPlus}
              duration={4000}
              onAnimationComplete={() => {
                this.setState({
                  imageLoad: false,
                  useClickCimg: false
                });
                this.changeImage();
              }}
              backgroundColor="black"
            />
          )}
          <T3Bbouton
            data={[{ text: "Signaler l'annonce", func: this.Signaler }]}
            size={{ height: 80, width: 30 }}
            iconsize={22}
          />
        </View>
      </View>
    );
  };

  //

  buyFood = () => {
    return (
      <View style={styles.bymain}>
        <View style={styles.bymainprim}>
          <View style={styles.byinfoTop}>
            <Image
              style={styles.byimgFood}
              resizeMode={"cover"}
              source={{ uri: this.item.pictures[0] }}
            />

            <View style={styles.conatinerGlobalDescription}>
              <Text style={styles.byPlatname}>
                {this.item.name}
                {"    "}
              </Text>

              <Text style={{}}>{this.item.normalDate.time_des}</Text>
            </View>
          </View>

          <Text style={styles.prices}>MAD {this.item.price}</Text>
        </View>

        <View style={styles.bfchoseqan}>
          <Text style={styles.choseq}>Quantité{"    "}</Text>
          <View style={styles.contchoseq}>
            <Text
              style={styles.minus}
              onPress={() => {
                if (this.state.quantite > 1) {
                  this.setState(prevState => ({
                    quantite: prevState.quantite - 1
                  }));
                }
              }}
            >
              -
            </Text>

            <Text style={styles.exactq}>{this.state.quantite}</Text>

            <Text
              style={styles.plus}
              onPress={() => {
                this.setState(prevState => ({
                  quantite: prevState.quantite + 1
                }));
              }}
            >
              +
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.descr}>Description </Text>

          <Text>{this.item.description}</Text>

          <View style={styles.iaContainair}>
            <View style={styles.iaView2}>
              <View style={styles.iaViewIcon1}>
                <Image
                  style={{ height: 60, width: 60, borderRadius: 30 }}
                  resizeMode={"cover"}
                  source={{ uri: this.item.userphoto }}
                />
              </View>

              <View style={{ paddingLeft: 15 }}>
                <Text style={styles.iaUserName}>
                  {this.item.username}
                  {"    "}
                </Text>
              </View>
            </View>

            <View style={styles.etoileView}>{this.renduEtoile(5)}</View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btPost}
          activeOpacity={1}
          onPress={async () => {
            await this.verificationBuying();
            !this.state.errorBuying ? this.placeOrder() : this.showBuyError();
          }}
        >
          {this.renderLoading()}
        </TouchableOpacity>
      </View>
    );
  };

  renduEtoile = n => {
    const item = [];

    for (let i = 0; i < 5; i++) {
      if (i < n) {
        item.push(
          <Icon
            name="star"
            type="AntDesign"
            style={styles.etoile}
            key={i.toString()}
          />
        );
      } else {
        item.push(
          <Icon
            name="star"
            type="AntDesign"
            style={[styles.etoile, { color: "white" }]}
            key={i.toString()}
          />
        );
      }
    }

    return item;
  };

  componentDidMount() {
    StatusBar.setBackgroundColor("#000000");
    let user = firebase.auth().currentUser;
    this.user.name = user.displayName;
    this.user.id = user.uid;
    this.user.photo = user.photoURL;
    this.user.phone = user.phoneNumber;
    if (this.user.id != this.item.userid) {
      this.incrementViews();
    }
  }

  renderLoading() {
    if (this.state.loading == true) {
      return <ActivityIndicator size="large" color="white" />;
    }
    {
      return <Text style={styles.textPost}>Commander</Text>;
    }
  }

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

        if (!this.state.showCommandeBouton) {
          if (touches.length == 1) {
            if (gestureState.dy > 0) {
              this.setState({
                bgColor: "transparent",
                animHeigthCommande: new Animated.Value(gestureState.dy)
              });
            } else {
              if (gestureState.dy < -50) {
                this.setState({
                  showCommandeBouton: true
                });
              }
            }
          }
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (this.state.showCommandeBouton && gestureState.dy >= -5) {
          this.setState({
            showCommandeBouton: false,
            plusInfo: false,
            quantite: 1
          });
        } else {
          if (this.state.animHeigthCommande._value >= 200) {
            this.animationPan1();
            this.onPress();
          } else {
            this.animationPan2();
          }

          this.ChangeImageWithClick(evt.nativeEvent.pageX);
        }
      },

      onPanResponderTerminate: (evt, gestureState) => {},

      onShouldBlockNativeReponser: (evt, gestureState) => false
    });
  }

  render() {
    const ronded = -this.state.animHeigthCommande;
    return (
      <Animated.View
        style={{
          flex: 1,
          position: "absolute",
          top: this.state.animHeigthCommande,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: this.state.bgColor
        }}
        {...this.panResponder.panHandlers}
      >
        {this.state.bgColor == "#000" && this.addTopBar()}

        <Image
          style={{
            flex: 1,
            width: this.dimension.width,
            height: this.dimension.height
            // borderRadius:1000
          }}
          source={{ uri: this.item.pictures[this.state.index] }}
          // resizeMode={this.state.bgColor=='#000' ? 'contain':'cover'}
          resizeMode={"contain"}
          onLoad={e => this.setState({ imageLoad: true })}
          onError={e => console.log("erreur")}
        />
        {!this.state.imageLoad &&
          this.state.index < this.item.pictures.length - 1 && (
            <View style={styles.imageActivity}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        {this.state.bgColor == "#000" && this.addPlus()}
        {this.state.showCommandeBouton && this.buyFood()}
        {this.state.showerrorbuying &&
          reactionAfterAction("Impossible de commander votre propre plat")}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerAddPlus: {
    height: 60,
    alignItems: "center",
    justifyContent: "center"
  },

  mainContainerTopBar: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  subContainer: {
    alignItems: "center",

    justifyContent: "center",

    margin: 10,

    flexDirection: "row"
  },

  imageStyle: { width: 40, height: 40, borderRadius: 20 },

  conatinerGlobalDescription: { marginLeft: 10 },

  indicatorContainer: {
    width: 80,
    height: 50,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row"
  },

  mainTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.addPlus
  },

  infoTextStyle: {
    color: color.addPlus,

    fontSize: 12
  },

  globalContainerChargeur: {
    flex: 1,

    backgroundColor: "red"
  },

  iaContainair: {
    height: 80,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between"
  },

  iaView2: {
    flexDirection: "row",

    alignItems: "center"
  },
  iaViewIcon1: { height: 50, width: 50, borderRadius: 25 },
  iaIconUser: { color: "black", fontSize: 60 },
  iaUserName: { color: "black", fontWeight: "bold" },

  etoileView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  etoile: { color: "#f1c40f", fontSize: 16 },

  bymain: {
    position: "absolute",

    bottom: 5,

    right: 5,

    left: 5,

    backgroundColor: "white",

    padding: 10,

    borderRadius: 10
  },

  bymainprim: {
    alignItems: "center",

    justifyContent: "space-between",

    flexDirection: "row"
  },

  byinfoTop: {
    alignItems: "center",

    justifyContent: "center",

    margin: 5,

    flexDirection: "row"
  },

  byimgFood: { width: 50, height: 50, borderRadius: 25 },

  byPlatname: {
    fontSize: 18,

    fontWeight: "bold",

    color: "black"
  },

  prices: { fontSize: 18, fontWeight: "bold" },

  bfchoseqan: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },

  choseq: { color: "black", fontWeight: "bold", fontSize: 18 },
  contchoseq: {
    alignItems: "center",

    flexDirection: "row",

    borderRadius: 15,

    borderColor: "black",

    borderWidth: 2,

    height: 30,

    width: 120
  },

  minus: {
    textAlign: "center",

    textAlignVertical: "center",

    fontSize: 20,

    paddingLeft: 3,

    flex: 1
  },

  exactq: {
    flex: 2,

    textAlign: "center",

    textAlignVertical: "center",

    fontSize: 20,

    borderColor: "black",

    borderLeftWidth: 2,

    borderRightWidth: 2
  },

  plus: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    paddingRight: 3,
    flex: 1
  },

  descr: { fontSize: 18, color: "black", fontWeight: "600" },

  textPost: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    flex: 1,
    color: "white"
    // fontSize: 18
  },
  btPost: {
    height: 50,
    backgroundColor: color.orange,
    borderRadius: 5,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  imageActivity: {
    backgroundColor: "black",
    opacity: 0.95,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StoryFood;
