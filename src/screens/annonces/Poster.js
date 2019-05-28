import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import { Icon, Toast } from "native-base";
import ImagePicker from "react-native-image-crop-picker";
import { NavigationEvents } from "react-navigation";
import firebase from "react-native-firebase";
import PlatLocation from "./PlatLocation";
import { connect } from "react-redux";
import TextButton from "../othersComponents/TextButton";

class Poster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photochange: true,
      loading: false,
      choosepicture: false,
      choosePlatPosition: false,
      userEtat: null,
      UrlPhoto1: "jbkjh",
      UrlPhoto2: "jhgvgh",
      UrlPhoto3: "hgvgh"
    };
    this.dataPlat = {
      plat: {
        description: null,
        Prix: null,
        categorie: null,
        nom: null,
        position: null,
        PlatPhoto: [],
        userPhoto: null
      },
      currentUserPosteurID: null,
      NumeroPhonePosteur: null,
      UserNamePosteur: null,
      Posteid: null,
      indiceImage: null,
      i: 0
    };
    this.noCU = {
      HeadText: "Gagner de l'argent avec Midou",
      secondText:
        "alignItemsaligne les enfants dans le sens travers. Par exemple, si les enfants coulent verticalement, alignItemscontrôle leur alignement horizontal. Cela fonctionne comme align-itemsen CSS, sauf que la valeur par défaut est à la stretchplace de flex",
      boutonText: "Devenir cuisinier"
    };
    this.is_cooker = this.props.is_cooker;
    this.pushToken =this.props.pushToken;
  }

  uploadImage = (UID, PlatUid) => {
    console.log("started");
    const _picturesURL = [];
    for (let i = 0; i < 3; i++) {
      firebase
        .storage()
        .ref("/UsersImages/" + UID + "/" + PlatUid + "/image" + i + ".jpg")
        .putFile(this.dataPlat.plat.PlatPhoto[i].path)
        .then(success => {
          (_picturesURL[i] = success.downloadURL), console.log(i);
        })
        .catch(error => {
          console.log(error);
        });
    }
    console.log(_picturesURL);
    return _picturesURL;
  };

  AjoutPoste = async (
    userName,
    NumeroPhone,
    categorie,
    description,
    NomPlat,
    localisationX,
    localisationY,
    Prix,
    UserID
  ) => {
    await this.setState({ loading: true });
    await console.log("started");
    const picturesURL = [];
    for (let i = 0; i < 3; i++) {
      await firebase
        .storage()
        .ref(
          "/PlatImage/" +
            this.dataPlat.currentUserPosteurID +
            "/" +
            this.dataPlat.Posteid +
            "/image" +
            i +
            ".jpg"
        )
        .putFile(this.dataPlat.plat.PlatPhoto[i].path)
        .then(success => {
          (picturesURL[i] = success.downloadURL), console.log(i);
        })
        .catch(error => {
          console.log(error);
        });
    }
    await console.log(picturesURL);
    const pushToken =await firebase.firestore().collection('Users').doc(UserID).get().then(doc=>{let _doc=doc.data()
      return _doc.pushToken});
    const ref = await firebase.firestore().collection("PlatPost");
    await ref
      .add({
        name: NomPlat,
        pictures: picturesURL,
        price: Prix,
        orders: 0,
        views: 0,
        localisation: new firebase.firestore.GeoPoint(
          localisationX,
          localisationY
        ),
        date: firebase.firestore.Timestamp.now(),
        description: description,
        username: userName,
        userid: UserID,
        userphoto: this.dataPlat.userPhoto,
        userphone: NumeroPhone,
        active: true,
        categorie: categorie,
        pushToken: pushToken
      })
      .then(async succes => {
        await console.log(succes.id)
        await this.setState({ loading: false }),
          Toast.show({
            text: "Félicitations! Votre plat a bien été posté",
            buttonText: "Okay",
            duration: 3000,
            type: "success"
          }),
          this.props.navigation.navigate("MesAnnonces");
      })
      .catch(error => {
        console.log(error);
      });
  };

  openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      this.dataPlat.plat.PlatPhoto.push(image);
      this.setState(prevState => ({ photochange: !prevState.photochange }));
    });
    this.setState({ choosepicture: false });
  }

  OpenPicker() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      multiple: true,
      compressImageQuality: 0.8
    }).then(images => {
      images.map(image => {
        this.dataPlat.plat.PlatPhoto.push(image);
        this.setState(prevState => ({ photochange: !prevState.photochange }));
      });
    });
    this.setState({ choosepicture: false });
  }

  setIdFromDate() {
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds
    const id = date + "" + month + "" + year + "" + hours + "" + min + "" + sec;
    console.log(id);
    return id;
  }

  pictureChoice = () => {
    if (this.state.choosepicture) {
      return (
        <View style={styles.choosepictureCont}>
          <TouchableOpacity
            style={styles.choospicItem}
            activeOpacity={0.8}
            onPress={() => {
              this.openCamera();
            }}
          >
            <Icon
              name="photo-camera"
              type="MaterialIcons"
              style={styles.iconChose}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choospicItem}
            activeOpacity={0.8}
            onPress={() => {
              this.OpenPicker();
            }}
          >
            <Icon name="picture" type="AntDesign" style={styles.iconChose} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderLoading() {
    if (this.state.loading == true) {
      return <ActivityIndicator size="large" color="white" />;
    }
    {
      return <Text style={styles.textPost}>POSTER UN PLAT</Text>;
    }
  }

  RenduImageSelection = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(
        <View
          key={i.toString()}
          style={
            i <= this.dataPlat.plat.PlatPhoto.length - 1
              ? styles.isPicture
              : styles.ImageItems
          }
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flex: 1 }}
            onPress={() => {
              i > this.dataPlat.plat.PlatPhoto.length - 1
                ? this.setState({ choosepicture: true })
                : this.props.navigation.navigate("ImageViewer", {
                    path: this.dataPlat.plat.PlatPhoto[i].path
                  });
            }}
          >
            {i <= this.dataPlat.plat.PlatPhoto.length - 1 && (
              <Image
                style={{ height: 140, width: 100, borderRadius: 6 }}
                source={{ uri: this.dataPlat.plat.PlatPhoto[i].path }}
                resizeMode={"cover"}
              />
            )}
            <Text style={styles.numStyle}>{i + 1}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              i <= this.dataPlat.plat.PlatPhoto.length - 1
                ? styles.deleteImage
                : styles.plusCon
            }
            activeOpacity={0.8}
            onPress={() => {
              i > this.dataPlat.plat.PlatPhoto.length - 1
                ? this.setState({ choosepicture: true })
                : this.dataPlat.plat.PlatPhoto.splice(i, 1);
              this.setState(prevState => ({
                photochange: !prevState.photochange
              }));
            }}
          >
            <Icon
              name={
                i <= this.dataPlat.plat.PlatPhoto.length - 1 ? "close" : "plus"
              }
              type="AntDesign"
              style={
                i <= this.dataPlat.plat.PlatPhoto.length - 1
                  ? styles.icondelete
                  : styles.iconadd
              }
            />
          </TouchableOpacity>
        </View>
      );
    }
    return items;
  };

  takeposition = props => {
    this.dataPlat.plat.position = props;
    this.setState({ choosePlatPosition: false });
  };

  closeMap = () => {
    this.setState({ choosePlatPosition: false });
  };

  componentWillMount() {}

  componentDidMount() {
    this.dataPlat.UserNamePosteur = firebase.auth().currentUser.displayName;
    this.dataPlat.currentUserPosteurID = firebase.auth().currentUser.uid;
    this.dataPlat.NumeroPhonePosteur = firebase.auth().currentUser.phoneNumber;
    this.dataPlat.userPhoto = firebase.auth().currentUser.photoURL;
    const PosteID = this.setIdFromDate();
    this.dataPlat.Posteid = PosteID;
  }

  render() {
    <NavigationEvents
      onWillFocus={() => {
        this.setState({
          photochange: true,
          choosepicture: false,
          choosePlatPosition: false,
          userEtat: null
        });
        const PosteID = this.setIdFromDate();
        this.setState({
          Posteid: PosteID
        });
      }}
    />;
    if (!this.is_cooker) {
      return (
        <View style={{ flex: 1 }}>
          <TextButton
            headText={this.noCU.HeadText}
            secondText={this.noCU.secondText}
            boutonText={this.noCU.boutonText}
            fc={this.whenNoCusinier}
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView style={styles.mainContainer} behavior={"height"}>
          <ScrollView keyboardDismissMode={"on-drag"}>
            <View style={styles.conImagePlat}>
              {this.RenduImageSelection()}
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.headInfo}>Nom du plat</Text>
              <TextInput
                style={styles.textInGen}
                maxLength={50}
                multiline={false}
                keyboardType={"default"}
                placeholder={"exemple: Tajine au poulet"}
                onChangeText={text => (this.dataPlat.plat.nom = text)}
                // value={this.state.text}
              />
              <Text style={styles.headInfo}>Catégorie</Text>
              <TextInput
                style={styles.textInGen}
                maxLength={50}
                multiline={false}
                keyboardType={"default"}
                placeholder={"exemple: Marocain"}
                onChangeText={text => (this.dataPlat.plat.categorie = text)}
                // value={this.state.text}
              />
              <Text style={styles.headInfo}>Description et ingredients</Text>
              <TextInput
                style={[styles.textInGen, { height: 100,textAlign:'justify',textAlignVertical:'top' }]}
                maxLength={1000}
                multiline={true}
                placeholder={"exemple: Mon plat est le meilleur des plats\n-tomates\n-épices"}
                keyboardType={"default"}
                onChangeText={text => (this.dataPlat.plat.description = text)}
                // value={this.state.text}
              />
              <Text style={styles.headInfo}>Prix (MAD)</Text>
              <TextInput
                style={styles.textInGen}
                maxLength={5}
                multiline={false}
                placeholder={"exemple: 25"}
                keyboardType={"numeric"}
                onChangeText={text => (this.dataPlat.plat.Prix = text)}
                // value={this.state.text}
              />
              <Text style={styles.headInfo}>Localisation</Text>
              <TouchableOpacity
                style={[styles.textInGen, { justifyContent: "center" }]}
                activeOpacity={1}
                onPress={() => {
                  this.setState({ choosePlatPosition: true });
                }}
              >
                {this.dataPlat.plat.position && (
                  <Text style={{ fontSize: 16 }}>
                    ({this.dataPlat.plat.position[0]},
                    {this.dataPlat.plat.position[1]})
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btPost}
                activeOpacity={1}
                onPress={async () => {
                  await this.setState({ loading: true });
                  this.AjoutPoste(
                    this.dataPlat.UserNamePosteur,
                    this.dataPlat.NumeroPhonePosteur,
                    this.dataPlat.plat.categorie,
                    this.dataPlat.plat.description,
                    this.dataPlat.plat.nom,
                    this.dataPlat.plat.position[0],
                    this.dataPlat.plat.position[1],
                    this.dataPlat.plat.Prix,
                    this.dataPlat.currentUserPosteurID,
                  );
                }}
              >
                {this.renderLoading()}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {this.state.choosePlatPosition && (
          <PlatLocation onPress={this.takeposition} closeMap={this.closeMap} />
        )}
        {this.state.choosepicture && (
          <View style={styles.cacheNoirView}>
            <TouchableOpacity
              style={{
                flex: 1
              }}
              activeOpacity={0.9}
              onPress={() => {
                this.setState({ choosepicture: false });
              }}
            />
          </View>
        )}
        {this.pictureChoice()}
      </View>
    );
  }
}

const color = {
  bg: "#F0F0F2",
  orange: "#EE5A24"
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
    // padding: 13
  },
  conImagePlat: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
  },
  ImageItems: {
    height: 140,
    width: 100,
    borderRadius: 6,
    borderStyle: "dashed",
    borderColor: "#a4b0be",
    backgroundColor: color.bg,
    borderWidth: 1
  },
  numStyle: {
    fontSize: 22,
    color: "white",
    paddingTop: 5,
    paddingLeft: 5,
    fontWeight: "bold"
  },
  plusCon: {
    backgroundColor: "#2ecc71",
    height: 26,
    width: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 125,
    left: 80
  },
  headInfo: {
    height: 45,
    backgroundColor: color.bg,
    textAlign: "justify",
    textAlignVertical: "bottom",
    paddingLeft: 15,
    fontSize: 18,
    paddingBottom: 4
  },
  textInGen: {
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16
  },
  btPost: {
    height: 50,
    backgroundColor: color.orange,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  textPost: {
    color: "white"
    // fontSize: 18
  },
  choosepictureCont: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#f5f6fa"
  },
  choospicItem: {
    backgroundColor: color.bg,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#a4b0be",
    borderWidth: 1
  },
  iconChose: { color: color.orange, fontSize: 30 },
  cacheNoirView: {
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  isPicture: {
    height: 140,
    width: 100,
    borderRadius: 6
  },
  iconadd: {
    color: "white",
    fontSize: 18
  },
  icondelete: {
    color: "white",
    fontSize: 18
  },
  deleteImage: {
    backgroundColor: "red",
    height: 26,
    width: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 125,
    left: 80
  }
});
const mapStateToProps = state => {
  return {
    is_cooker: state.userProfil.is_cooker
  };
};

export default connect(mapStateToProps)(Poster);
