import React from "react";
import { Icon } from "native-base";
import {
  Image,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";
import firebase from "react-native-firebase";
import OneCommande from "./OneCommande";
import { convertDate } from "../../functionsRu/groupeA";
class ContenuMesCommandes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { recents: [], ancs: [] }, loading: true };
    this.data = null;
    this.unsubscribe = null;
    this.userId = firebase.auth().currentUser.uid;
    this.refOrders = firebase
      .firestore()
      .collection("Orders")
      .where("buyer.uid", "==", this.userId);
    this.refPlat = firebase.firestore().collection("PlatPost");
  }

  clickCommande = props => {
    this.props.navigation.navigate("OneCommandeSelected", {
      dataCommande: props
    });
  };

  recentHeader = () => <Text style={styles.headertitle}>Récentes</Text>;
  autresHeader = () => <Text style={styles.headertitle}>Autres commandes</Text>;

  parseData = async querySnapshot => {
    let recents = [];
    let ancs = [];

    const last_query_id =
      querySnapshot.docs.length != 0
        ? querySnapshot.docs[querySnapshot.size - 1].id
        : null;

    if (last_query_id) {
      await querySnapshot.forEach(async doc => {
        const _data = doc.data();
        const normalDate = convertDate(_data.datePlaced.toDate());
        const key = doc.id;
        let imagePlat = [];
        let cookerInfo = {};
        let platLocation = [];
        let PlatDescription = "";
        await this.refPlat
          .doc(_data.platKey)
          .get()
          .then(docP => {
            docPlat = docP.data();
            imagePlat = docPlat.pictures;
            cookerInfo = { photo: docPlat.userphoto, name: docPlat.username };
            (platLocation = docPlat.localisation),
              (PlatDescription = docPlat.description);
            const commandedata = {
              ..._data,
              key,
              normalDate,
              imagePlat,
              cookerInfo,
              platLocation,
              PlatDescription
            };
            if (normalDate.isRecent) {
              recents.push(commandedata);
            } else {
              ancs.push(commandedata);
            }
          })
          .catch(error => {
            console.log(error);
          });
        recents
          .sort(function(a, b) {
            return (
              a.normalDate.datefull.getTime() - b.normalDate.datefull.getTime()
            );
          })
          .reverse();
        ancs
          .sort(function(a, b) {
            return (
              a.normalDate.datefull.getTime() - b.normalDate.datefull.getTime()
            );
          })
          .reverse();
        if (last_query_id == key) {
          console.log("dernier ellement");
          this.setState({ data: { recents, ancs }, loading: false });
        }
      });
    } else {
      this.setState({ loading: false });
    }
  };
  componentDidMount() {
    this.unsubscribe = this.refOrders.get().then(doc => {
      this.parseData(doc);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    console.log(this.data);
    return (
      <View style={styles.mainContainer}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#F1592A" />
        ) : this.state.data.ancs.length == 0 &&
          this.state.data.recents.length == 0 ? (
          <View style={styles.Nocommande}>
            <Text style={styles.textStyle}>
              Vous n'avez aucune commande effectué{" "}
            </Text>
          </View>
        ) : (
          <ScrollView>
            <View>
              <FlatList
                ListHeaderComponent={this.recentHeader}
                data={this.state.data.recents}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                  <OneCommande fc={this.clickCommande} data={item} />
                )}
              />
            </View>
            <View>
              <FlatList
                ListHeaderComponent={this.autresHeader}
                data={this.state.data.ancs}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                  <OneCommande fc={this.clickCommande} data={item} />
                )}
              />
            </View>
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
    padding: 15,
    fontSize: 20,
    textAlignVertical: "center",
    textAlign: "center"
  },
  headertitle: {
    fontSize: 16,
    paddingLeft: 15,
    height: 40,
    textAlignVertical: "center",
    backgroundColor: "#f5f6fa",
    color: "black"
  }
});

export default ContenuMesCommandes;
