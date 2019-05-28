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
class SalesAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.data = [];
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.data.length == 0 ? (
          <View style={styles.Nocommande}>
            <Text style={styles.textStyle}>
              Aucune vente n'a été realisé{" "}
            </Text>
          </View>
        ) : (
          <ScrollView>
            <FlatList
              data={this.data}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Text style={styles.textStyle}>{item}</Text>
              )}
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

export default SalesAnalytics;

//data
