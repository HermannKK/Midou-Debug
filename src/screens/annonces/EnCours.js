import React from "react";
import { Icon } from "native-base";
import {
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert
} from "react-native";
import { connect } from "react-redux";
import OneAnnonce from "./OneAnnonce";
import TextButton from "../othersComponents/TextButton";
import { convertDate } from "../../functionsRu/groupeA";
import { degrader } from "../othersComponents/RepetedFunctions/GroupeA";
import firebase from "react-native-firebase";
class EnCoursA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      data: []
    };
    this.noCU = {
      HeadText: "Gagner de l'argent avec Midou",
      secondText:
        "alignItemsaligne les enfants dans le sens travers. Par exemple, si les enfants coulent verticalement, alignItemscontrôle leur alignement horizontal. Cela fonctionne comme align-itemsen CSS, sauf que la valeur par défaut est à la stretchplace de flex",
      boutonText: "Devenir cuisinier"
    };
    this.is_cooker = this.props.is_cooker;
    this.userId = this.props.user_id;
    this.unsubscribe = null;
    this.ref = firebase
      .firestore()
      .collection("PlatPost")
      .where("userid", "==", this.userId)
      .where("active", "==", true);
  }

  parseData = querySnapshot => {
    let data = [];
    querySnapshot.forEach(doc => {
      let _data = doc.data();
      let key = doc.id;
      let normalDate = convertDate(_data.date.toDate());
      data.push({ ..._data, key, normalDate });
    });
    data
      .sort(function(a, b) {
        return (
          a.normalDate.datefull.getTime() - b.normalDate.datefull.getTime()
        );
      })
      .reverse();
    this.setState({ data, loading: false });
  };

  _onRefresh = async () => {
    await this.setState({ refreshing: true });
    await this.platQuery().then(() => {
      this.setState({ refreshing: false });
    });
  };
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.parseData);
    console.log(this.data);
  }

  doNewPost = () => {
    return (
      <TouchableOpacity
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 30,
          right: 20
        }}
        onPress={() => {
          this.props.navigation.navigate("Poster");
        }}
        activeOpacity={0.9}
      >
        <Icon
          name="plus"
          type="AntDesign"
          style={{ color: "white", fontSize: 35 }}
        />
      </TouchableOpacity>
    );
  };
  retirerAnnonce(id) {
    firebase
      .firestore()
      .collection("PlatPost")
      .doc(id)
      .update({ active: false });
  }
  clickAnnonce = props => {
    fn1 = () => {
      Alert.alert(
        "Suppression de post ",
        "en contuniant ,Votre post sera defininement supprimer et ne sera plus visible par vos clients ",
        [
          {
            text: "Annuler",
            onPress: () => console.log("Cancel Pressed"),
            style: {
              color: "red"
            }
          },
          { text: "OK", onPress: () => this.retirerAnnonce(props.key) }
        ],
        { cancelable: false }
      );
    };
    fn2 = () => {
      this.props.navigation.navigate("Poster", {
        ModifData: props,
        type: "MAJ"
      });
    };
    this.props.navigation.navigate("OneAnnonceSelected", {
      dataAnnonce: props,
      RightButtondata: [
        { text: "Modifier", func: fn2 },
        { text: "Retirer l'annonce", func: fn1 }
      ]
    });
  };
  render() {
    console.log(this.state.data);
    return (
      <View style={styles.mainContainer}>
        {!this.is_cooker ? (
          <TextButton />
        ) : this.state.loading ? (
          <ActivityIndicator size="large" color="#F1592A" />
        ) : this.state.data.length == 0 ? (
          <View style={styles.Nocommande}>
            <Text style={styles.textStyle}>
              Vous n'avez pas d'annonces en cours{" "}
            </Text>
          </View>
        ) : (
          <View style={styles.mainContainer}>
            <ScrollView style={{ paddingTop: 5, paddingBottom: 50 }}>
              <FlatList
                data={this.state.data}
                keyExtractor={item => item.key}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={this.state.refreshing}
                //     onRefresh={this._onRefresh}
                //   />
                // }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.95}
                    style={styleA.oneMain}
                    onPress={() => {
                      this.clickAnnonce(item);
                    }}
                  >
                    <Image
                      style={styleA.imageStyle}
                      resizeMode={"cover"}
                      resizeMethod={"auto"}
                      source={{ uri: item.pictures[0] }}
                    />
                    {degrader(["#000", "transparent", "#000"])}
                    <Text style={styleA.PlatNameStyle}>{item.name}</Text>
                    <Text style={styleA.datePost}>
                      {item.normalDate.time_des}
                    </Text>
                    <View style={styleA.priceVue}>
                      <Icon
                        name="eye"
                        style={styleA.iconStyle}
                        type="AntDesign"
                      />
                      <Text style={styleA.vuetext}>
                        {item.views} MAD {item.price * item.orders}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <View style={{ paddingBottom: 5 }} />
            </ScrollView>
            {this.doNewPost()}
          </View>
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
const styleA = StyleSheet.create({
  mainContain: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 3.5
  },
  oneMain: {
    height: 190,
    // justifyContent: "center",
    // alignItems: "center",
    marginBottom: 5,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 7
  },
  imageStyle: {
    height: 190,
    flex: 1,
    borderRadius: 7
  },
  PlatNameStyle: {
    fontSize: 23,
    fontWeight: "300",
    color: "white",
    position: "absolute",
    height: 75,
    top: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    textAlignVertical: "center"
  },
  datePost: {
    fontSize: 15,
    fontWeight: "100",
    color: "white",
    position: "absolute",
    height: 50,
    bottom: 0,
    left: 15,
    textAlign: "center",
    textAlignVertical: "center"
  },
  priceVue: {
    position: "absolute",
    height: 50,
    bottom: 0,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  iconStyle: {
    fontSize: 16,
    color: "white"
  },
  vue: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  vuetext: {
    fontSize: 15,
    fontWeight: "100",
    color: "white",
    marginLeft: 3
  }
});

const mapStateToProps = state => {
  return {
    is_cooker: state.userProfil.is_cooker,
    user_id: state.userProfil.user_id
  };
};

export default connect(mapStateToProps)(EnCoursA);
