import React from "react";
import { View, Image, Modal, TouchableHighlight } from "react-native";
import {
  H3,
  Container,
  ListItem,
  Separator,
  Header,
  Footer,
  FooterTab,
  Content,
  Toast,
  Left,
  Icon,
  Right,
  Text,
  Body,
  Title,
  Button
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import firebase from "react-native-firebase";

class SupprimerCompte extends React.Component {
  state = {
    _error:null,
    show:true,
};
  signOut = () => {
    firebase.auth().signOut();
  };
  delete = () => {
    firebase.auth().currentUser
    .delete()
    .catch(error => this.setState({_error:error, show:false}),
                    Toast.show(
                      {text:(this.state._error? 'Veuillez vous reconnecter et reessayer':'Compte supprimé'),
                      buttonText: 'Okay', 
                      type:(this.state._error? "danger":"success")}
                      )
          )
    .then(
      
    )

  }
  componentWillUnmount(){
    this.setState(
      {show:true}
    )
  }
  render() {
    return (
      <Container>
        <Header style={{ justifyContent: "center", height: 64 }}>
          <Left>
            <Icon
              name="arrow-back"
              style={{ color: "white" }}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          </Left>
          <Body>
            <Title>Supprimer mon compte</Title>
          </Body>
        </Header>
        <Content>
        <View style={{ flex: 2.3, marginVertical: 30, marginHorizontal: 20 }}>
          <H3>
            Nous sommes navrés de vous voir partir
          </H3>
          <Text style={{ color: "#5f5d5e", marginVertical: 10 }}>
            Quand vous supprimez votre compte il est immediatement desactivé et
            supprimé de maniere definitive apres 7 jours
          </Text>

          <Button transparent danger>
            <Text>En savoir plus</Text>
          </Button>
        </View>

        <View style={{ alignItems: "center", flex: 3.5 }}>
          <Image
            style={{
              height: 250,
              width: 250,
              resizeMode: "cover",
              justifyContent: "center"
            }}
            source={require("../../../assets/supprimerC.png")}
          />
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
        </View>
      </Content>
      <Footer>
          <FooterTab>
            <Button vertical transparent light onPress={() => this.props.navigation.navigate('Parametres_general')}>
              <Text>Annuler</Text>
            </Button>
            <Button vertical transparent active={this.state.show} disabled={this.state.show} onPress={this.signOut}>
              <Text>Deconnexion</Text>
            </Button>
            <Button vertical transparent light active={!this.state.show} disabled={!this.state.show} onPress={this.delete}>
              <Text>Confirmer</Text>
            </Button>
          </FooterTab>
        </Footer>
    </Container>
    );
  }
}

export default SupprimerCompte;
