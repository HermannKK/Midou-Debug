import React from "react";
import { Icon } from "native-base";
import {
  Image,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { convertDate } from "../../functionsRu/groupeA";
import Histo from "../othersComponents/Histo";

import TextButton from "../othersComponents/TextButton";
class AncienneA extends React.Component {
  constructor(props) {
    super(props);
    this.state = { refresh: false, loading: true };
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
      .where("userid", "==", this.userId)
      .where("active", "==", false);
    await ref.get().then(async doc => {
      await this.parseData(doc);
    });
    await console.log("finished querry");
    await this.setState({ loading: false });
  };
  parseData = async querySnapshot => {
    await querySnapshot.forEach(async doc => {
      const _data =  doc.data();
      const  key =  doc.id;
      const  normalDate = convertDate(_data.date.toDate());
      await this.data.push({ ..._data, key, normalDate });
    });
  };

  _onRefresh = async () => {
    await this.setState({ refreshing: true });
    await this.platQuery().then(() => {
      this.setState({ refreshing: false });
    });
  };

  componentWillMount = async () => {
    await this.platQuery();
  };

  clickAnnonce = props => {
    this.props.navigation.navigate("OneAnnonceSelected", {
      dataAnnonce: props,
      RightButtondata:null
    });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: "#bdc3c7"
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#F1592A" />
        ) : this.data.length == 0 ? (
          <View style={styles.Nocommande}>
            <Text style={styles.textStyle}>
              Vous n'avez pas d'anciennes Annonces{" "}
            </Text>
          </View>
        ) : (
          <ScrollView>
            <FlatList
              data={this.data}
              keyExtractor={item => item.key}
              renderItem={({ item }) => (
                <Histo data={item} fc={this.clickAnnonce} />
              )}
              ItemSeparatorComponent={this.renderSeparator}
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
const stylesA = StyleSheet.create({
  mainContainer: {
    height: 90,
    borderBottomWidth: 1,
    borderColor: "#bdc3c7",
    padding: 10
  },
  conatinertop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  conatinerbottom: {
    flexDirection: "row",
    alignItems: "center"
  },
  mainTextStyle: {
    fontSize: 15,
    textAlignVertical: "center",
    color: "#bdc3c7"
  },
  boldText: {
    fontSize: 22,
    fontWeight: "600",
    color: "black"
  },
  globalContainerVoir_icon: {
    marginRight: 10
  },
  iconStyle: { color: "green", fontSize: 32 }
});

const mapStateToProps = state => {
  return {
    is_cooker: state.userProfil.is_cooker,
    user_id: state.userProfil.user_id
  };
};

export default connect(mapStateToProps)(AncienneA);
//data
