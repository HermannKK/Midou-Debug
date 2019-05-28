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
  RefreshControl,Alert
} from "react-native";
import { connect } from "react-redux";
import OneAnnonce from "./OneAnnonce";
import { dataOneAnnonce } from "../home/MapComponents/MyData/Mydata";
import TextButton from "../othersComponents/TextButton";
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
    this.data = [];
  }

  platQuery = async () => {
    this.data = await [];
    await console.log("started querry");
    const ref = await firebase
      .firestore()
      .collection("PlatPost")
      .where("userid", "==", this.userId);
    await ref.get().then(async doc => {
      await this.parseData(doc);
    });
    await console.log("finished querry");
    await this.setState({ loading: false });
  };
  parseData = async querySnapshot => {
    console.log("started parsing");
    await querySnapshot.forEach(async doc => {
      let _data = await doc.data();
      let key = await doc.id;
      let normalDate = await this.convertToDate(_data.date.toDate());
      await this.data.push({ ..._data, key, normalDate });
    });
    await console.log("finished parsing");
  };

  convertToDate = async dateObject => {
    const d = await dateObject.getDate();
    const m = (await dateObject.getMonth()) + 1;
    const y = await dateObject.getFullYear();
    const newDate = (await d) + "/" + m + "/" + y;
    return newDate;
  };

  _onRefresh = async () => {
    await this.setState({ refreshing: true });
    await this.platQuery().then(() => {
      this.setState({ refreshing: false });
    });
  };

  componentWillMount = async () => {
    await console.log("started willmount");
    await this.platQuery();
  };

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
  retirerAnnonce(id){
    //id = this.data.key 
    firebase.firestore().collection('PlatPost').doc(id).update({active:false})
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
                color:'red'
            }
          },
          { text: "OK", onPress: () => console.log("Cancel Pressed") }
        ],
        { cancelable: false }
      );
    };
    fn2 = () => {
      this.props.navigation.navigate("Poster",{ModifData:props})
    };
    this.props.navigation.navigate("OneAnnonceSelected", {
      dataAnnonce: props,
      RightButtondata:[
        { text: "Modifier", func: fn2 },
        { text: "Retirer l'annonce", func: fn1 }
      ]
    });
  };

  render() {
    console.log("rendering");
    if (this.state.loading == true) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#F1592A" />
        </View>
      );
    } else {
      if (this.data.length > 0) {
        return (
          <View style={styles.mainContainer}>
            <ScrollView style={{ paddingTop: 5 ,paddingBottom:50}}>
              <FlatList
                data={this.data}
                keyExtractor={item => item.key}
                // numColumns={2}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.95}
                    style={styleA.oneMain}
                    onPress={() => {
                      this.clickAnnonce(item)
                    }}
                  >
                    <Image
                      style={styleA.imageStyle}
                      resizeMode={"cover"}
                      resizeMethod={"auto"}
                      source={{ uri: item.pictures[1] }}
                    />
                    <Text style={styleA.PlatNameStyle}>{item.name}</Text>
                    <Text style={styleA.datePost}>{item.normalDate}</Text>
                    <View style={styleA.priceVue}>
                      <Icon
                        name="eye"
                        style={styleA.iconStyle}
                        type="AntDesign"
                      />
                      <Text style={styleA.vuetext}>{item.views}   MAD {item.price * item.orders}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <View style={{paddingBottom:5}}/>
            </ScrollView>
            {this.doNewPost()}
          </View>
        );
      }
    }
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
    fontSize: 28,
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
    fontSize: 18,
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
    fontSize: 20,
    color: "white"
  },
  vue: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  vuetext: {
    fontSize: 18,
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
