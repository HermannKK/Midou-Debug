import React from "react";
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  CardItem,
  Card,
  List,
  Header,
  Content,
  Left,
  Icon,
  Right,
  Text,
  Grid,
  Row,
  Col,
  Body,
  Title
} from "native-base";
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import HistoriqueData from "../historique/HistoriqueData";
import firebase from "react-native-firebase";
import { connect } from 'react-redux';
import Reservation from "../reservation/Reservation";

//function snapshotToArray(snapshot) {
// var returnArr = [];

// snapshot.forEach(function(childSnapshot) {
//     var item = childSnapshot.val();
//     item.key = childSnapshot.key;
//       returnArr.push(item);
//    });

//    return returnArr;
//}

class Annonces extends React.Component {
  constructor(props) {
    super(props);
    this.tasksRef = firebase.database().ref("/PlatsPoste/");
    this.state = {
      AnnonceData: [],
      IImage: null
    };
  }
  componentDidMount () {
    this.listenForNewPlat(this.tasksRef);
    
  }



  listenForNewPlat(tasksRef) {
    tasksRef.on("value", dataSnapshot => {
      var AnnoncesDataRef = [];

      dataSnapshot.forEach(child => {
        //firebase.database().ref('/PlatsPoste/-LaYKBtXo0Jp9XKEz8Se/PlatImages/ImagePlat1').on('value', (snapshot) => {
        //IImage=snapshot.val();
        // this.setState({IImage:IImage})
        //})
        if (child.val().PlatImages != undefined) {
          AnnoncesDataRef.push({
            NomPlat: child.val().NomPlat,
            key: child.key,
            IImage: child.val().PlatImages.ImagePlat1
          });
        }
      });

      this.setState({
        AnnonceData: AnnoncesDataRef
      });
    });
  }

  render() {
    console.log(this.state.AnnonceData)
    return (
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1, marginVertical: 1, marginHorizontal: 10 }}
          data={this.state.AnnonceData}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <Card style={{ width: "48%", marginRight: 8 }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Reservation");
                }}
              >
                <CardItem cardBody>
                  <Image
                    style={{
                      resizeMode: "cover",
                      width: 100,
                      height: 140,
                      flex: 1
                    }}
                    source={{ uri: item.IImage }}
                  />
                </CardItem>
                <CardItem style={{ flex: 1, flexDirection: "column" }}>
                  <Text style={{ flex: 1, marginBottom: 1 }}>
                    {item.NomPlat}
                  </Text>
                </CardItem>
              </TouchableOpacity>
            </Card>
          )}
          numColumns={2}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    is_cooker: state.userProfil.is_cooker
  }
}

export default connect(mapStateToProps)(Annonces)