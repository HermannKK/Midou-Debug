import React from "react";
import { View, Image, ImageBackground, TouchableOpacity } from "react-native";
import {
  Footer,
  Grid,
  Row,
  Button,
  Header,
  Content,
  Left,
  Icon,
  Right,
  Text,
  Body,
  Title,
  Col
} from "native-base";

class MesFavoris extends React.Component {
  static navigationOptions = {
    drawerLabel: "Favoris ",
    drawerIcon: ({ tintColor }) => (
      <Image
        style={{ height: 24, width: 24, tintColor }}
        source={require("../../../assets/MesF.png")}
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      check: true,
      widt1: 170,
      heig1: 60,
      widt2: 170,
      heig2: 60,
      widt3: 170,
      heig3: 60,
      widt4: 170,
      heig4: 60,
      widt5: 170,
      heig5: 60,
      widt6: 170,
      heig6: 60
    };
  }

  changeBackground1() {
    var check = this.state.check;
    if (check == true) {
      this.setState({ widt1: 170 });
      this.setState({ heig1: 60 });
      this.setState({ check: false });
    } else {
      this.setState({ widt1: 0 });
      this.setState({ heig1: 0 });
      this.setState({ check: true });
    }
  }

  changeBackground2() {
    var check = this.state.check;
    if (check == true) {
      this.setState({ widt2: 170 });
      this.setState({ heig2: 60 });
      this.setState({ check: false });
    } else {
      this.setState({ widt2: 0 });
      this.setState({ heig2: 0 });
      this.setState({ check: true });
    }
  }

  changeBackground3() {
    var check = this.state.check;
    if (check == true) {
      this.setState({ widt3: 170 });
      this.setState({ heig3: 60 });
      this.setState({ check: false });
    } else {
      this.setState({ widt3: 0 });
      this.setState({ heig3: 0 });
      this.setState({ check: true });
    }
  }

  changeBackground4() {
    var check = this.state.check;
    if (check == true) {
      this.setState({ widt4: 170 });
      this.setState({ heig4: 60 });
      this.setState({ check: false });
    } else {
      this.setState({ widt4: 0 });
      this.setState({ heig4: 0 });
      this.setState({ check: true });
    }
  }
  changeBackground5() {
    var check = this.state.check;
    if (check == true) {
      this.setState({ widt5: 170 });
      this.setState({ heig5: 60 });
      this.setState({ check: false });
    } else {
      this.setState({ widt5: 0 });
      this.setState({ heig5: 0 });
      this.setState({ check: true });
    }
  }
  changeBackground6() {
    var check = this.state.check;
    if (check == true) {
      this.setState({ widt6: 170 });
      this.setState({ heig6: 60 });
      this.setState({ check: false });
    } else {
      this.setState({ widt6: 0 });
      this.setState({ heig6: 0 });
      this.setState({ check: true });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header style={{ justifyContent: "center", height: 64 }}>
          <Left>
            <Icon
              name="arrow-back"
              style={{ color: "white" }}
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>
          <Body>
            <Title>Mes Favoris</Title>
          </Body>
          <Right />
        </Header>

        <View style={{ flex: 8 }}>
          <View style={{ flex: 3 }} />

          <View
            style={{ flex: 5, alignItems: "center", justifyContent: "center" }}
          >
            <Grid>
              <Col style={{ alignItems: "center", justifyContent: "center" }}>
                <Row>
                  <Button
                    style={{
                      backgroundColor: "#f96138",
                      height: 60,
                      width: 170,
                      justifyContent: "center"
                    }}
                    large
                    onPress={() => this.changeBackground1()}
                  >
                    <Image
                      source={require("../../../assets/Vegetarien.jpg")}
                      style={{
                        width: this.state.widt1,
                        height: this.state.heig1,
                        position: "absolute"
                      }}
                    />
                    <Text style={{ fontWeight: "bold" }}>Vegetarien</Text>
                  </Button>
                </Row>

                <Row>
                  <Button
                    style={{
                      backgroundColor: "#f96138",
                      height: 60,
                      width: 170,
                      justifyContent: "center"
                    }}
                    large
                    onPress={() => this.changeBackground2()}
                  >
                    <Image
                      source={require("../../../assets/Togolai.jpg")}
                      style={{
                        width: this.state.widt2,
                        height: this.state.heig2,
                        position: "absolute"
                      }}
                    />
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Togolais
                    </Text>
                  </Button>
                </Row>

                <Row>
                  <Button
                    style={{
                      backgroundColor: "#f96138",
                      height: 60,
                      width: 170,
                      justifyContent: "center"
                    }}
                    large
                    onPress={() => this.changeBackground3()}
                  >
                    <Image
                      source={require("../../../assets/Marocain.jpg")}
                      style={{
                        width: this.state.widt3,
                        height: this.state.heig3,
                        position: "absolute"
                      }}
                    />
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Marocain
                    </Text>
                  </Button>
                </Row>
              </Col>

              <Col style={{ alignItems: "center", justifyContent: "center" }}>
                <Row>
                  <Button
                    style={{
                      backgroundColor: "#f96138",
                      height: 60,
                      width: 170,
                      justifyContent: "center"
                    }}
                    large
                    onPress={() => this.changeBackground4()}
                  >
                    <Image
                      source={require("../../../assets/Italien.jpg")}
                      style={{
                        width: this.state.widt4,
                        height: this.state.heig4,
                        position: "absolute"
                      }}
                    />
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Italien
                    </Text>
                  </Button>
                </Row>

                <Row>
                  <Button
                    style={{
                      backgroundColor: "#f96138",
                      height: 60,
                      width: 170,
                      justifyContent: "center"
                    }}
                    large
                    onPress={() => this.changeBackground5()}
                  >
                    <Image
                      source={require("../../../assets/Africain.png")}
                      style={{
                        width: this.state.widt5,
                        height: this.state.heig5,
                        position: "absolute"
                      }}
                    />
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Africain
                    </Text>
                  </Button>
                </Row>

                <Row>
                  <Button
                    style={{
                      backgroundColor: "#f96138",
                      height: 60,
                      width: 170,
                      justifyContent: "center"
                    }}
                    large
                    onPress={() => this.changeBackground6()}
                  >
                    <Image
                      source={require("../../../assets/Ivoirinne.png")}
                      style={{
                        width: this.state.widt6,
                        height: this.state.heig6,
                        position: "absolute"
                      }}
                    />
                    <Text style={{ fontWeight: "bold",color: "white" }}>Ivoirien</Text>
                  </Button>
                </Row>
              </Col>
            </Grid>
          </View>

          <View style={{ flex: 3 }} />
        </View>

        <View
          style={{
            flex: 1,
            height: 80,
            backgroundColor: "#f96138",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Button transparent>
              <Text style={{ color: "white", fontSize: 20 }}>Valider </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
export default MesFavoris;
