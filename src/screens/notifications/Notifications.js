import React from "react";
import {
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl,
  View,
  TouchableOpacity
} from "react-native";
import firebase from "react-native-firebase";
import OneNotif from "./OneNotif";
import { convertDate } from "../../functionsRu/groupeA";
class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      look: null,
      data: []
    };
    this.unsubscribe = null;
    this.userId = firebase.auth().currentUser.uid;
    this.ref = firebase
      .firestore()
      .collection("Notifications")
      .where("recipient.id", "==", this.userId);
  }

  parseData = async querySnapshot => {
    let data = [];
    querySnapshot.forEach(doc => {
      const _data = doc.data();
      const key = doc.id;
      const normalDate = convertDate(_data.date.toDate());
      data.push({ ..._data, key, normalDate });
    });
    this.setState({ data, loading: false });
  };

  _onRefresh = async () => {
    await this.setState({ refreshing: true });
    this.ref.onSnapshot(this.parseData);
    this.setState({ refreshing: false });
  };

  showDetail = props => {
    firebase
      .firestore()
      .collection("Notifications")
      .doc(props.key)
      .update({ recipient: { ...props.recipient, isOpened: true } }) //remettre a true et revoir rerender liste
      .then(docRef => {
        this.setState(prevState => ({}));
      });
    this.props.navigation.navigate("CookerValidateCommande", {
      dataCom: props
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.parseData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#F1592A" />
        ) : this.state.data.length == 0 ? (
          <Text>Vous n'avez aucune notification</Text>
        ) : (
          <ScrollView>
            <FlatList
              data={this.state.data}
              keyExtractor={item => item.key}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
              renderItem={({ item }) => (
                <OneNotif data={item} detailsOrder={this.showDetail} />
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
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#bdc3c7"
  },
  conatinerImage: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60
  },
  imageStyle: { width: 60, height: 60, borderRadius: 30 },
  conatinerGlobalDescription: {
    flex: 9,
    flexDirection: "column",
    margin: 10
  },
  mainTextStyle: {
    fontSize: 15,
    textAlignVertical: "center",
    color: "black"
  },
  boldText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  globalContainerVoir_icon: {
    flex: 1,
    alignItems: "flex-end"
  },
  iconStyle: {
    fontSize: 20,
    color: "#bdc3c7"
  }
});

export default Notifications;
