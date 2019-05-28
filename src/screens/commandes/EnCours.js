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
// import { dataRepasCommande } from "../home/MapComponents/MyData/Mydata";
import OneCommande from './OneCommande'
import TextButton from '../othersComponents/TextButton'
class EnCoursC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.data = [1];
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.data.length == 0 ? (
          <View style={styles.Nocommande}>
            <Text style={styles.textStyle}>
              Vous n'avez aucune commande en cours{" "}
            </Text>
          </View>
        ) : (
          <ScrollView>
            <FlatList
              data={this.data}
              keyExtractor={item => item.toString()}
              renderItem={({ item }) =><OneCommande/>}
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

export default EnCoursC;

//data
