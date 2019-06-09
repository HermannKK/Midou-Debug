import React, { createRef } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import CodeInput from "react-native-confirmation-code-field";
import firebase from "react-native-firebase";
import { connect } from "react-redux";
import { Icon } from "native-base";
import { changeUserdataInGlobal } from "../../Store/Reducers/userProfilReducer";

class LoggedOutStep2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotValidePass: false,
      error: null,
      numero: null,
      loading: true,
      credential: null
    };
    this.confirmResult = null;
  }

  numberInput = () => (
    <View style={{ height: 80 }}>
      <CodeInput
        ref={this.codeInputRef}
        keyboardType="numeric"
        variant={"border-b"}
        codeLength={6}
        activeColor={"black"}
        inactiveColor={"#EE5A24"}
        cellBorderWidth={2}
        size={30}
        inputPosition={"left"}
        autoFocus={true}
        cellProps={this.cellProps}
        onFulfill={this.onFinishCheckingCode}
      />
    </View>
  );

  codeInputRef = createRef();

  cellProps = ({ /*index, isFocused,*/ hasValue }) => {
    return {
      style: styles.inputStyle
    };
  };

  onFinishCheckingCode = code => {
    this.confirmResult
      .confirm(code)
      .then(user => {
        console.log(user);
        this.setState({ isNotValidePass: false });
        console.log(this.state.credential);
        this.props.navigation.navigate("Step3");
      })
      .catch(error => {
        this.setState({ isNotValidePass: true });
      });
    this.codeInputRef.current.clear();
  };

  async componentDidMount() {
    const { navigation } = this.props;
    await this.setState({ numero: navigation.getParam("numero") });
    this.handleSignUp();
    this.state.loading = true;
  }

  handleSignUp = () => {
    firebase
      .auth()
      .signInWithPhoneNumber(this.state.numero)
      .catch(error => {
        this.setState({ error });
      })
      .then(confirmResult => {
        this.setState({ loading: false });
        this.confirmResult = confirmResult;
      });
  };

  renderLoading() {
    if (this.state.loading == true) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50
          }}
        >
          <ActivityIndicator size="large" color="#f96138" />
          <Text style={{ justifyContent: "center", alignItems: "center" }}>
            ENVOI DU CODE DE VERIFICATION...{" "}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50
          }}
        >
          <Icon
            name="done"
            type="MaterialIcons"
            style={{ color: "green", fontSize: 80 }}
          />
          <Text style={{ justifyContent: "center", alignItems: "center" }}>
            MESSAGE ENVOYÉ{" "}
          </Text>
        </View>
      );
    }
  }

  render() {
    // console.log(this.state.numero);

    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>ENTREZ LE CODE DE VÉRIFICATION </Text>
        <Text style={styles.textStyle}>REÇU PAR SMS </Text>
        {this.numberInput()}
        {this.state.isNotValidePass && (
          <Text style={styles.errorTextStyle}>Code invalide. ré-essayer.</Text>
        )}
        {this.state.numero != null && (
          <Text>Votre code a été envoyé au {this.state.numero}.</Text>
        )}
        {this.renderLoading()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20
  },
  textStyle: {
    fontSize: 17,
    color: "#2f3640"
  },
  errorTextStyle: {
    fontSize: 13,
    color: "#eb4d4b"
  },
  inputStyle: {
    height: 40,
    color: "#EE5A24"
  }
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(LoggedOutStep2);
