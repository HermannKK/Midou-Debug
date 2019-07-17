import React from "react";
import { Icon } from "native-base";
import firebase from "react-native-firebase";
import {
  Image,
  TouchableOpacity,
  View,
  ToastAndroid,
  Text,
  StyleSheet,
  Linking
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { connect } from "react-redux";
import { changeUserdataInGlobal } from "../../Store/Reducers/userProfilReducer";

export const uploadImage = (path, mime = "image/png") => {
  return new Promise((resolve, reject) => {
    return imageRef
      .put(path, { contentType: mime })
      .then(() => {
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
        this.setState({ userProfile: url });
      })
      .catch(error => {
        reject(error);
        console.log("Error uploading image: ", error);
      });
  });
};
class ParametresGeneral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photochange: false,
      choosepicture: false
    };
  }

  uploadImageProfil = async imagePath => {
    const currentUser = firebase.auth().currentUser;
    const currentUserID = currentUser.uid;
    const _url = await firebase
      .storage()
      .ref("/UsersImages/" + currentUserID + "/UserProfile.jpg")
      .putFile(imagePath)
      .then(success => {
        console.log(success.downloadURL);
        currentUser.updateProfile({ photoURL: success.downloadURL });
        return success.downloadURL;
      });
    changeUserdataInGlobal("CHANGE_PHOTOPROFIL", _url, this.props);
  };

  openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      changeUserdataInGlobal("CHANGE_PHOTOPROFIL", image.path, this.props);
      this.setState(prevState => ({ photochange: !prevState.photochange }));
      const url = this.uploadImageProfil(image.path);
    });
    this.setState({ choosepicture: false });
  }

  OpenPicker() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      includeBase64: true,
      multiple: true
    }).then(images => {
      images.map(image => {
        changeUserdataInGlobal("CHANGE_PHOTOPROFIL", image.path, this.props);
        this.setState(prevState => ({ photochange: !prevState.photochange }));
        const url = this.uploadImageProfil(image.path);
      });
    });
    this.setState({ choosepicture: false });
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
          {this.props.userProfil.user_photo && (
            <TouchableOpacity
              style={styles.choospicItem}
              activeOpacity={0.8}
              onPress={() => {
                changeUserdataInGlobal("CHANGE_PHOTOPROFIL", null, this.props);
                this.setState({ choosepicture: false });
              }}
            >
              <Icon
                name="delete"
                type="MaterialCommunityIcons"
                style={styles.iconChose}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };

  userProfilecont = () => {
    return (
      <View style={styles.supContPhto}>
        <TouchableOpacity
          style={styles.contPhto}
          activeOpacity={0.9}
          onPress={() => {
            !this.props.userProfil.user_photo
              ? this.setState({ choosepicture: true })
              : this.props.navigation.navigate("ImageViewer", {
                  path: this.props.userProfil.user_photo
                });
            this.setState(prevState => ({
              photochange: !prevState.photochange
            }));
          }}
        >
          {this.props.userProfil.user_photo == null ? (
            <Icon name={"user"} type="FontAwesome" style={styles.iconuser} />
          ) : (
            <View>
              {
                <Image
                  style={styles.userPhoto}
                  source={{ uri: this.props.userProfil.user_photo }}
                  resizeMode={"cover"}
                />
              }

              <TouchableOpacity
                style={styles.contModifpic}
                activeOpacity={0.9}
                onPress={() => {
                  this.setState(prevState => ({
                    choosepicture: true,
                    photochange: !prevState.photochange
                  }));
                }}
              >
                <Icon
                  name={"photo-camera"}
                  type="MaterialIcons"
                  style={styles.iconModif}
                />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  signOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("Step1");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          {this.userProfilecont()}
          <Text style={styles.headInfo}>Prénom</Text>
          <Text
            style={styles.textInGen}
            onPress={() => {
              this.props.navigation.navigate("ModifierNomComplet");
            }}
          >
            {this.props.userProfil.username}
          </Text>
          <Text style={styles.headInfo}>Adresse e-mail</Text>
          <Text
            style={styles.textInGen}
            /*  onPress={() => {
              this.props.navigation.navigate("ModifierEmail");
            }} */
          >
            {this.props.userProfil.user_email}
          </Text>
          <Text style={styles.headInfo}>Numero de téléphone</Text>
          <Text style={styles.textInGen}>
            {this.props.userProfil.user_phoneNumber}
          </Text>
          <Text
            style={styles.logout}
            onPress={() => {
              Linking.openURL("http://midou.strikingly.com");
            }}
          >
            Conditions génerales
          </Text>
          <Text style={styles.logout}>Evaluer l'application</Text>
          <Text
            style={styles.logout}
            onPress={() => {
              this.signOut();
            }}
          >
            Déconnexion
          </Text>
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
  },
  contPhto: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  supContPhto: { height: 180, justifyContent: "center", alignItems: "center" },
  numStyle: {
    fontSize: 22,
    color: "white",
    paddingTop: 5,
    paddingLeft: 5,
    fontWeight: "bold"
  },
  headInfo: {
    textAlign: "justify",
    paddingLeft: 15,
    fontSize: 15,
    paddingBottom: 4,
    color: "#95a5a6",
    paddingTop: 15
  },
  textInGen: {
    paddingBottom: 3,
    paddingTop: 4,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 18,
    color: "black",
    borderColor: "#95a5a6",
    borderBottomWidth: 1,
    textAlign: "justify"
    // fontWeight: "bold"
  },
  logout: {
    paddingTop: 20,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 15,
    // color: "black",
    // fontWeight: "500",
    color: "#95a5a6"
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
  iconuser: {
    color: "white",
    fontSize: 80
  },
  userPhoto: { height: 140, width: 140, borderRadius: 70 },
  contModifpic: {
    backgroundColor: color.orange,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 100,
    left: 100
  },
  iconModif: {
    color: "white"
  }
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ParametresGeneral);
