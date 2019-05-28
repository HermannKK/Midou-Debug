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

class ModifierNomComplet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _error: null,
      acceptChange: true
    };
    this.username = this.props.username;
  }
  setData = () => {
    if(!this.username){
      Toast.show({
        text: "Veuillez indiquer votre prenom",
        buttonText: "Okay",
        type: "danger"
      })
    }
    else{
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: this.username })
        .catch(
          error => this.setState({ _error: error }),
          Toast.show({
            text: this.state.error ? "Erreur" : "Informations mises à jour",
            buttonText: "Okay",
            type: this.state.error ? "danger" : "success"
          })
        )
        .then(changeUserdataInGlobal('CHANGE_USERNAME',this.username,this.props), this.props.navigation.navigate("ParametresGeneral"));
    }
  };

  render() {
    console.log(this.props)
    return (
      <View style={styles.mainContainer}>
          <View style={styles.mainContainer}>
            <Text style={styles.headInfo}>Modifier votre nom</Text>
            <Text style={styles.descri}>
              Votre nom permettra de vous identifier
            </Text>
            <TextInput
              style={styles.textInGen}
              maxLength={30}
              multiline={false}
              keyboardType={"default"}
              defaultValue={this.username}
              onChangeText={text => {
                this.username = text
              }}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.btPost}
              onPress={ () => {
                this.setData();
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
    username: state.userProfil.username
  }
}

export default connect(mapStateToProps)(ModifierNomComplet)
