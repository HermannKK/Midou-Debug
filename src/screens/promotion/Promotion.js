import React from "react";
import {
  Text,
  Container,
  Content,
  Title,
  Body,
  H2,
  CardItem,
  Card,
  List,
  Button,
  Header,
  Icon,
  Left
} from "native-base";
import { Image } from "react-native";
import PromotionData from "./PromotionData";

class Promotion extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Promotions ',
    drawerIcon: ({ tintColor }) => (<Icon name="notification" type="AntDesign" style={{fontSize:25}}/>),
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Promotions</Title>
          </Body>
        </Header>
        <Content padder>
          <List
            dataArray={PromotionData}
            renderRow={PromotionData => (
              <Card style={{ marginBottom: 15 }}>
                <CardItem cardBody>
                  <Image
                    style={{
                      resizeMode: "cover",
                      width: null,
                      height: 300,
                      flex: 1
                    }}
                    source={PromotionData.image}
                  />
                </CardItem>
                <CardItem style={{ paddingTop: 10, paddingLeft: 10 }}>
                  <H2 style={{ fontWeight: "bold" }}>{PromotionData.titre}</H2>
                </CardItem>
                <CardItem style={{ paddingTop: 3, paddingLeft: 10 }}>
                  <Text note>{PromotionData.soustitre}</Text>
                </CardItem>
                <CardItem
                  style={{ paddingTop: 3, paddingLeft: 10, paddingBottom: 5 }}
                >
                  <Text
                    style={{ color: "#F1592A" }}
                    onPress={() =>
                      this.props.navigation.navigate(PromotionData.route())
                    }
                  >
                    Partager{" "}
                  </Text>
                </CardItem>
              </Card>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default Promotion;
