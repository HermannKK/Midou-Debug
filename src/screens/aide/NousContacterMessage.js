import React from "react";
import { View, KeyboardAvoidingView, Text, StyleSheet } from "react-native";
import {
  Container,
  Textarea,
  Form,
  Item,
  Input,
  ListItem,
  Header,
  Content,
  Left,
  Icon,
  Right,
  Body,
  Title,
  Button,
  Footer
} from "native-base";
import email from "react-native-email";

class NousContacterMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sujet: "",
      texte: ""
    };
  }
  handleEmail = () => {
    const to = "midoucontact@gmail.com"; // string or array of email addresses
    email(to, {
      subject: this.state.sujet,
      body: this.state.texte
    }).catch(console.error);
  };
  HandleSujetChange = value => {
    this.setState({
      sujet: value
    });
  };
  HandleTextChange = value => {
    this.setState({
      texte: value
    });
  };
  componentDidMount() {
    const { navigation } = this.props;
    if (navigation.getParam("data"))
      this.setState({ sujet: navigation.getParam("data") });
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
          <Form>
            <Item stackedLabel>
              <Input
                placeholder="Sujet"
                defaultValue={this.state.sujet}
                onChangeText={this.HandleSujetChange}
              />
            </Item>
            <Textarea
              rowSpan={5}
              style={styles.messagetext}
              onChangeText={this.HandleTextChange}
              placeholder="Ecrire un message"
            />
          </Form>
        </View>
        <Text style={styles.contactUs} onPress={() => this.handleEmail()}>
          ENVOYER
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

const color = {
  bg: "#F0F0F2",
  orange: "#EE5A24"
};

const styles = StyleSheet.create({
  contactUs: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    textAlign: "center",
    textAlignVertical: "center",
    height: 50,
    fontSize: 16,
    backgroundColor: color.orange,
    color: "white"
  },
  messagetext: {
    marginLeft: 10
  }
});

export default NousContacterMessage;
