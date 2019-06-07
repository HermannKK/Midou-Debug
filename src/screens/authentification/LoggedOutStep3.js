import React from "react";
import { Icon } from "native-base";
import firebase from "react-native-firebase";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import AsyncImage from "../../AsyncImage";
import { connect } from "react-redux";
import { changeUserdataInGlobal } from "../../Store/Reducers/userProfilReducer";

class LoggedOutStep3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photochange: false,
      choosepicture: false,
      formValidation: null,
      _profilePhotoUrl: "",
      loading: false
    };
    this.profile = {
      userName: "",
      email: "",
      ProfileUserOnline: null,
      ProfileUser: null,
      currentUserID: null,
      NumeroPhone: null
    };
  }

  getThingsDone = async () => {
    const user = firebase.auth().currentUser;
    this.profile.currentUserID = user.uid;
    this.profile.NumeroPhone = user.phoneNumber;
    // this.state._profilePhotoUrl =
    //   "gs://midou-app.appspot.com/UsersImages/" +
    //   this.profile.currentUserID +
    //   "/UserProfile.jpg";
    this.setState({
      _profilePhotoUrl:
        "gs://midou-app.appspot.com/UsersImages/" +
        this.profile.currentUserID +
        "/UserProfile.jpg"
    });
    this.profile.ProfileUserOnline = user.photoURL;
    this.profile.userName = user.displayName;
    this.profile.email = user.email;
  };

  componentWillMount() {
    this.getThingsDone();
  }

  renderLoading() {
    if (this.state.loading == true) {
      return <ActivityIndicator size="large" color="white" />;
    }
    {
      return <Text style={styles.textPost}>Sauvegarder</Text>;
    }
  }

  Verification = () => {
    const reg = /^[A-Za-z0-9._-]+@[A-za-z0-9._-]+\.[A-Za-z]{2,6}$/;
    if ((this.profile.userName.length > 0) & reg.test(this.profile.email)) {
      this.setState({ formValidation: true });
    } else this.setState({ formValidation: false });
  };

  openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      this.profile.ProfileUser = image.path;
      this.setState(prevState => ({ photochange: !prevState.photochange }));
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
        this.profile.ProfileUser = image.path;
        this.setState(prevState => ({ photochange: !prevState.photochange }));
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
          {this.profile.ProfileUser && (
            <TouchableOpacity
              style={styles.choospicItem}
              activeOpacity={0.8}
              onPress={() => {
                this.profile.ProfileUser = null;
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
            !this.profile.ProfileUser && this.setState({ choosepicture: true });
            this.setState(prevState => ({
              photochange: !prevState.photochange
            }));
          }}
        >
          {!this.profile.ProfileUserOnline ? (
            <Icon name={"user"} type="FontAwesome" style={styles.iconuser} />
          ) : (
            <View>
              <AsyncImage
                image={this.state._profilePhotoUrl}
                newUrl={this.profile.ProfileUser}
                style={styles.userPhoto}
                refresh={this.state.photochange}
              />
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

  ajoutProfil = () => {
    this.setState({ loading: true, acceptChange: false });
    const email = this.profile.email;
    const userName = this.profile.userName;
    const ProfileUser = this.profile.ProfileUser;
    const NumeroPhone = this.profile.NumeroPhone;
    firebase
      .auth()
      .currentUser.updateProfile({ displayName: userName })
      .then(data => {
        changeUserdataInGlobal("CHANGE_USERNAME", userName, this.props);
      });
    firebase
      .auth()
      .currentUser.updateEmail(email)
      .then(data => {
        changeUserdataInGlobal("CHANGE_USEREMAIL", email, this.props);
      })
      .catch(error => {
        console.log(error);
      });
    const cookTest = firebase
      .firestore()
      .collection("Users")
      .doc(this.profile.currentUserID)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data().is_cooker;
        } else {
          return false;
        }
      })
      .catch(error => {
        console.log(error);
      });
    const ref = firebase
      .firestore()
      .collection("Users")
      .doc(this.profile.currentUserID);
    ref
      .set({
        id: this.profile.currentUserID,
        is_cooker: cookTest == true ? true : false,
        mail: email,
        phone: NumeroPhone,
        username: userName
      })
      .catch(error => {
        console.log(error);
      });
    if (this.profile.ProfileUser == null) {
      !this.state.loading;
      this.props.navigation.navigate("Drawer");
    } else {
      firebase
        .storage()
        .ref("/UsersImages/" + this.profile.currentUserID + "/UserProfile.jpg")
        .putFile(this.profile.ProfileUser)
        .then(success => {
          firebase
            .auth()
            .currentUser.updateProfile({ photoURL: success.downloadURL });
          changeUserdataInGlobal(
            "CHANGE_PHOTOPROFIL",
            success.downloadURL,
            this.props
          );
          !this.state.loading;
          this.props.navigation.navigate("Drawer");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={styles.contSub}
          contentContainerStyle={styles.contSub}
          behavior={"position"}
          enabled
        >
          <View>
            <Text style={styles.headInfo}>
              Votre compte est pret.vous pourrez profiter pleinement de Midou
            </Text>
            {this.userProfilecont()}
            <View style={styles.inpSt}>
              <View style={styles.conticon}>
                <Icon name="ios-person" type="Ionicons" style={styles.iconin} />
              </View>
              <TextInput
                style={styles.textInGen}
                maxLength={30}
                multiline={false}
                keyboardType={"default"}
                placeholder={"Entrez votre prenom"}
                onChangeText={text => {
                  this.profile.userName = text;
                  if (this.state.formValidation)
                    this.setState({ formValidation: null });
                }}
              />
            </View>
            <View style={styles.inpSt}>
              <View style={styles.conticon}>
                <Icon
                  name="email"
                  type="MaterialCommunityIcons"
                  style={styles.iconin}
                />
              </View>
              <TextInput
                style={styles.textInGen}
                maxLength={30}
                multiline={false}
                keyboardType={"default"}
                placeholder={"Entrez votre e-mail"}
                onChangeText={text => {
                  this.profile.email = text;
                  if (this.state.formValidation)
                    this.setState({ formValidation: null });
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                color: "red",
                paddingTop: 10,
                paddingLeft: 15,
                height: 50
              }}
            >
              {this.state.formValidation == false &&
                "Votre nom ou votre adresse e-mail n'est pas valide"}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.btPost}
            onPress={async () => {
              await this.Verification();
              this.state.formValidation && this.ajoutProfil();
            }}
            disabled={this.state.acceptChange}
          >
            {this.renderLoading()}
          </TouchableOpacity>
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
        </KeyboardAvoidingView>
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
  headInfo: {
    textAlign: "justify",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 25,
    paddingBottom: 4,
    color: "black",
    paddingTop: 15,
    fontWeight: "bold"
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
  },
  textInGen: {
    height: 50,
    fontSize: 18,
    flex: 1,
    marginLeft: 6
  },
  btPost: {
    backgroundColor: color.orange,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderRadius: 5,
    height: 60
  },
  textPost: { fontSize: 20, color: "white" },
  inpSt: {
    flexDirection: "row",
    height: 60,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10
  },
  contSub: {
    flex: 1,
    justifyContent: "space-between"
  },
  conticon: { width: 30, justifyContent: "center", alignItems: "center" },
  iconin: { color: "black", fontSize: 25 }
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(LoggedOutStep3);
