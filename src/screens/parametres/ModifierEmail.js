import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput
} from "react-native";
import { Toast } from "native-base";
import firebase from "react-native-firebase";
import { connect } from 'react-redux'
import{changeUserdataInGlobal} from '../../Store/Reducers/userProfilReducer'

class ModifierEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _error: null,
      acceptChange: true,
      emailvalid:null
    };
    this.email = this.props.user_email;
  }

  emailVerification = () => {
    if (/^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,6}$/.test(this.email)) {
      this.setState({ emailvalid: true });
    } else {
      this.setState({ emailvalid: false });
    }
  };

  setData = async () => {
    const credential=firebase.auth.Authcredential;
    console.log(credential);
    firebase.auth().currentUser.reauthenticateWithCredential(credential);
    firebase
      .auth()
      .currentUser.updateEmail(this.email)
      .catch(
        error => this.setState({ _error: error }),
        Toast.show({
          text: this.state.error ? "Erreur" : "Informations mises à jour",
          buttonText: "Okay",
          type: this.state.error ? "danger" : "success"
        })
      )
      .then(
        await changeUserdataInGlobal('CHANGE_USEREMAIL',this.email,this.props),
        this.props.navigation.navigate("ParametresGeneral")
        );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
          <View style={styles.mainContainer}>
            <Text style={styles.headInfo}>Modifier votre adresse e-mail</Text>
            <Text style={styles.descri}>
              Recevez nos dernieres nouveautés et toutes nos promotions sur
              votre boite e-mail
            </Text>
            <TextInput
              style={styles.textInGen}
              maxLength={30}
              multiline={false}
              keyboardType={"default"}
              defaultValue={this.email}
              onChangeText={text => {
                this.email = text;
                this.setState({ emailvalid: null });
              }}
            />
            {this.state.emailvalid==false && (
                <Text
                  style={{
                    fontSize: 16,
                    color: "red",
                    paddingTop:10,
                    paddingLeft:15
                  }}
                >
                  Cette adresse e-mail n'est pas valide.
                </Text>
              )}
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.btPost}
              onPress={async() => {
                await this.emailVerification();
                this.state.emailvalid && this.setData();
              }}
              // disabled={this.state.acceptChange}
            >
              <Text style={styles.textPost}>Enregistrer</Text>
            </TouchableOpacity>
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
    flex: 1,
    paddingTop:10
  },
  headInfo: {
    textAlign: "justify",
    paddingLeft: 15,
    fontSize: 26,
    paddingBottom: 4,
    color: "black"
  },
  descri: {
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    textAlign: "justify"
  },
  textInGen: {
    marginTop: 10,
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    borderColor: color.orange,
    borderBottomWidth: 2
  },
  btPost: {
    backgroundColor: color.orange,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 60
  },
  textPost: { fontSize: 20, color: "white" }
});

const mapStateToProps = (state) => {
  return {
    user_email: state.userProfil.user_email
  }
}

export default connect(mapStateToProps)(ModifierEmail)
