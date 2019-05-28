import React from "react";
import { Icon } from "native-base";
import { ActivityIndicator ,View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, Linking } from "react-native";
import firebase from "react-native-firebase";

class Aide extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading:  true,
      data: []
    }
  }

  retrieveHelpData = async () => {
    console.log('started');
    const _data = [];
    const ref=firebase.firestore().collection('Aide')
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { issue, link } = doc.data()
        _data.push({
          key: doc.id,
          doc, // DocumentSnapshot
          issue,
          link
        });
          console.log(doc.id, " => ", doc.data());
      });
    });
  console.log(this.state.loading)
  this.setState({data:_data, loading: false});
  console.log(this.state.loading)
  }

  componentDidMount() {
    this.retrieveHelpData();
    
  }
 
  render() {
    if(this.state.loading==true){
      return(
        <View style={{justifyContent: "center", alignItems:'center', marginTop:50}}>
          <ActivityIndicator size="large" color="#f96138" />
          <Text style={{justifyContent: "center",alignItems: "center",}} >Recuperation des données </Text>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.mainContainer}>
          <FlatList
            keyExtractor={item => item.key}
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableOpacity 
                activeOpacity={0.9}
                onPress={()=>Linking.openURL(item.link)}>
                <Text style={styles.textInGen}>{item.issue}</Text>
              </TouchableOpacity>
              
            )}
          />
          <Text
            style={styles.getSupport}
            onPress={() => {
              this.props.navigation.navigate("NousContacter");
            }}
          >
            Contacter l'assistance
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const color = {
  bg: "#F0F0F2",
  orange: "#EE5A24"
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  getSupport: {
    flex: 1,
    fontSize: 18,
    color: color.orange,
    borderColor: color.orange,
    borderWidth: 2,
    textAlign: "center",
    height: 50,
    textAlignVertical: "center",
    borderRadius:5,
    margin:15
  },
  textInGen: {
    flex: 1,
    fontSize: 18,
    color: "black",
    borderColor: "#95a5a6",
    borderBottomWidth: 1,
    textAlign: "center",
    height: 50,
    textAlignVertical: "center"
  }
});

export default Aide;
