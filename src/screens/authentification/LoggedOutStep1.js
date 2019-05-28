import React, { createRef } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Icon } from "native-base";
import {
  getCountryFromAPiWhenReseacrch,
  getFlagOnCountry
} from "./restcountriesAPI";

class LoggedOutStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donnepays: null,
      showNumIns: false,
      showWarning: false
    };
    this.numero = "";
  }

  HandleNumberChange = value => {
    this.setState({ showWarning: false });
    this.numero = "+212" + parseInt(value);
  };

  _getCountry = async () => {
    const country = "Morocco";
    const data = await getCountryFromAPiWhenReseacrch(country);
    const flag = await getFlagOnCountry(country);
    this.setState({ donnepays: { ...data[0], flag } });
  };

  numeroVerifAndValidation = () => {
    if (this.numero.length == 13) {
      this.props.navigation.navigate("Step2", {
        numero: this.numero
      });
    } else {
      this.setState({ showWarning: true });
    }
  };

  componentDidMount() {
    this._getCountry();
  }
  numInputRef = createRef();
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} enabled>
        <StatusBar backgroundColor="#EE5A24" barStyle="light-content" />
        {this.state.donnepays != null && (
          <View style={{ flex: 1, justifyContent: "space-between"}}>
            {!this.state.showNumIns ? (
              <View style={{ flex: 4, alignItems: "center", marginBottom: 10 }}>
                <Image
                  style={{ flex: 1, width: 400, height: 200 }}
                  source={require("./assets/PremierPas.jpg")}
                />
              </View>
            ) : (
              <View
                style={{
                  height: 50,
                  justifyContent: "center",
                  marginHorizontal: 20
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showNumIns: false, showWarning: false });
                    this.numInputRef.current.clear();
                  }}
                  activeOpacity={0.9}
                >
                  <Icon
                    name="arrowleft"
                    type="AntDesign"
                    style={{ color: "black", fontSize: 25 }}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={{ flex: 1, marginHorizontal: 20 }}>
              <Text style={{ fontSize: 20, color: "black" }}>
                {!this.state.showNumIns
                  ? "Premiers pas avec Midou"
                  : "Saisissez votre numero de télephone pour vous inscrire"}
              </Text>
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#ecf0f1",
                    height: 50,
                    alignItems: "center",
                    padding: 5,
                    borderRadius: 5,
                    borderColor: "#95a5a6",
                    borderWidth: 1,
                    marginTop: 10,
                    position: "absolute",
                    left: 0,
                    right: 0
                  }}
                  activeOpacity={0.9}
                  onPress={() => {
                    this.setState({ showNumIns: true });
                  }}
                  disabled={this.state.showNumIns}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 32,
                      marginLeft: 8,
                      borderRadius: 4
                    }}
                    resizeMode={"cover"}
                    source={{ uri: this.state.donnepays.flag }}
                  />
                  <Text style={{ fontSize: 17, marginLeft: 8, color: "black" }}>
                    +{this.state.donnepays.code}
                  </Text>
                  <View style={{ marginLeft: 8 }}>
                    <Icon
                      name="chevron-down"
                      type="EvilIcons"
                      style={{ color: "black", fontSize: 15 }}
                    />
                  </View>
                  <TextInput
                    ref={this.numInputRef}
                    placeholder={"0654-116106"}
                    editable={this.state.showNumIns}
                    style={{
                      marginLeft: 8,
                      fontSize: 17,
                      textAlignVertical: "center",
                      height:50
                    }}
                    // autoFocus={this.state.showNumIns}
                    onSubmitEditing={() => {this.numeroVerifAndValidation()}}
                    onChangeText={this.HandleNumberChange}
                    keyboardType={"numeric"}
                  />
                </TouchableOpacity>
              </View>
              {this.state.showWarning && (
                <Text
                  style={{
                    fontSize: 16,
                    color: "red",
                    position: "relative",
                    top: 65
                  }}
                >
                  Ce numero de telephone n'est pas valide.
                </Text>
              )}
            </View>
          </View>
        )}

        {this.state.showNumIns && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              backgroundColor: "#2ed573",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0
            }}
            onPress={() => {
              this.numeroVerifAndValidation();
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>VALIDER</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    );
  }
}
export default LoggedOutStep1;
