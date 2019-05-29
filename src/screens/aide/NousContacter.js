import React from "react";
import {
  View,
  Linking,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { Card, CardTitle } from "react-native-material-cards";
import { Container, Content } from "native-base";

class NousContacter extends React.Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content padder>
          <Card>
            <CardTitle title="Nous sommes aussi sur les reseaux sociaux Vous pouvez suivre nos actualités" />
          </Card>
          <Card
            onPress={() =>
              Linking.openURL("https://www.facebook.com/midoutechnology/")
            }
          >
            <CardTitle
              avatarSource={require("../../../assets/f-ogo_RGB_HEX-58.png")}
              title="Facebook"
              subtitle="@MidouTechnology"
              style={{ fontSize: 30 }}
              onPress={() =>
                Linking.openURL("https://instagram.com/midou_page")
              }
            />
          </Card>
          <Card
            onPress={() => Linking.openURL("https://instagram.com/midou_page")}
          >
            <CardTitle
              avatarSource={require("../../../assets/IG_Glyph_Fill.png")}
              title="Instagram"
              subtitle="@Midou_Page"
              style={{ fontSize: 30 }}
            />
          </Card>
          <Card
            onPress={() => Linking.openURL("https://twitter.com/Midou_Service")}
          >
            <CardTitle
              avatarSource={require("../../../assets/Twitter_Social_Icon_Circle_Color.png")}
              title="Twitter"
              subtitle="@Midou_Service"
              style={{ fontSize: 30 }}
            />
          </Card>
          <Card
            onPress={() =>
              Linking.openURL(
                "https://wa.me/212682380482?text=Bonjour%20la%20team%20Midou"
              )
            }
          >
            <CardTitle
              avatarSource={require("../../../assets/WhatsApp_Logo_2.png")}
              title="Whatsapp"
              subtitle="+212682380482"
              style={{ fontSize: 30 }}
            />
          </Card>
        </Content>
        <Text
          style={styles.contactUs}
          onPress={() => this.props.navigation.navigate("NousContacterMessage")}
        >
          NOUS CONTACTER PAR MAIL
        </Text>
      </Container>
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
  }
});
export default NousContacter;
