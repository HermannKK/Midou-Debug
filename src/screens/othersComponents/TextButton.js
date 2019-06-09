import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking
} from "react-native";
class TextButton extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      {
        id: 1,
        header: "Definissez vos propres horaires",
        subject: "Il y'a pas d'horaire fixe, cuisinez quand vous voulez. "
      },
      {
        id: 2,
        header: "Gagner de l'argent facilement",
        subject:
          "Cuisinez sur Midou est un moyen facile de gagner de l'argent pendant son temps libre. "
      },
      {
        id: 3,
        header: "Créer un business depuis chez vous ",
        subject:
          "Choisisez quand vous voulez étendre votre expérience culinaires á travers le monde "
      }
    ];
  }
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        {this.data.map(item => (
          <View key={item.id.toString()} style={styles.conteneudesc}>
            <View style={styles.conteneurH}>
              <View style={{ flex: 1 }}>
                <Text style={styles.numStyle}>{item.id}</Text>
              </View>
              <View style={{ flex: 5 }}>
                <Text style={styles.headText}>{item.header}</Text>
              </View>
            </View>
            <View style={styles.conteneurH}>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 5 }}>
                <Text style={styles.secondText}>{item.subject}</Text>
              </View>
            </View>
          </View>
        ))}
        <Text style={styles.rejoindreCom}>Rejoindre la communauté</Text>
        <Text style={styles.rejoindreExplic}>
          Notre reseau de centrifigeuses se developpe chaque jour.Faites partie
          de la révolution culinaire!
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.containBouton}
          onPress={() => {
            Linking.openURL("http://midou.strikingly.com/#contactez-nous");
          }}
        >
          <Text style={styles.BoutonText}>Devenir patron</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15
  },
  headText: {
    fontSize: 20,
    color: "#000",
    textAlign: "justify",
    fontWeight: "300"
  },
  numStyle: {
    fontSize: 24,
    color: "#EE5A24",
    height: 46,
    width: 46,
    borderRadius: 23,
    borderColor: "#000",
    borderWidth: 3,
    textAlign: "center",
    textAlignVertical: "center"
  },
  secondText: {
    fontSize: 15,
    // color: "#bdc3c7",
    textAlign: "justify"
  },
  containBouton: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EE5A24",
    marginTop: 16,
    borderRadius: 3
  },
  BoutonText: { color: "white", fontSize: 20, padding: 15 },
  conteneurH: {
    flexDirection: "row",
    alignItems: "center"
  },
  conteneudesc: {
    marginBottom: 5
  },
  rejoindreCom: {
    fontSize: 15,
    color: "#EE5A24",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 30
  },
  rejoindreExplic: {
    fontSize: 15,
    // color: "#EE5A24",
    textAlign: "center",
    textAlignVertical: "center",
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default TextButton;
