import React from "react";
import { Icon } from "native-base";
import {
  Image,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  View
} from "react-native";
import { dataRepasCommande } from "../home/MapComponents/MyData/Mydata";
import Histo from '../othersComponents/Histo'
class AncienneC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.data = [];
  }

  clickCommande = props => {
    this.props.navigation.navigate("OneCommandeSelected", { dataCommande: props });
  };

  render() {
    this.data=dataRepasCommande
    return (
      <View style={styles.mainContainer}>
        {this.data.length == 0 ? (
          <View style={styles.Nocommande}>
            <Text style={styles.textStyle}>
              Vous n'avez pas encore effectue de commande{" "}
            </Text>
          </View>
        ) : (
          <ScrollView>
            <FlatList
              data={this.data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Histo data={item} fc={this.clickCommande}/> }
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  Nocommande: { justifyContent: "center", alignItems: "center", flex: 1 },
  textStyle: {
    fontSize: 20,
    textAlignVertical: "center",
    textAlign: "center"
  }
});

export default AncienneC;

//data
