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
import { dataOneAnnonce } from "../home/MapComponents/MyData/Mydata";
import firebase from "react-native-firebase";
import Histo from "../othersComponents/Histo";

import TextButton from "../othersComponents/TextButton";
class AncienneA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {refresh:false, loading:true};
    this.noCU = {
      HeadText: "Gagner de l'argent avec Midou",
      secondText:
        "alignItemsaligne les enfants dans le sens travers. Par exemple, si les enfants coulent verticalement, alignItemscontrôle leur alignement horizontal. Cela fonctionne comme align-itemsen CSS, sauf que la valeur par défaut est à la stretchplace de flex",
      boutonText: "Devenir cuisinier"
    };
    this.is_cooker = this.props.is_cooker;
    this.userId= this.props.user_id;
    this.data=[]
  }

  
  platQuery = async () =>{
    this.data =await [];
    await console.log('started querry');
    const ref= await firebase.firestore().collection('PlatPost').where('userid','==',this.userId).where('active','==',false);
    await ref.get().then(async (doc)=>{await this.parseData(doc)});
    await console.log('finished querry');
    await this.setState({loading:false});
  }
  parseData = async (querySnapshot) => {
    console.log('started parsing');
    await querySnapshot.forEach(async (doc) => {
      let _data = await doc.data();
      let key = await doc.id;
      let normalDate = await this.convertToDate(_data.date.toDate())
      await this.data.push({..._data, key, normalDate});
    });
    await console.log('finished parsing');
  }

  convertToDate=async(dateObject)=>{
    const d = await dateObject.getDate();
    const m = await dateObject.getMonth()+1
    const y = await dateObject.getFullYear();
    const newDate= await d + '/' + m + '/' + y ;
    return newDate;
  }

  _onRefresh = async () => {
    await this.setState({refreshing: true});
    await this.platQuery().then(() => {
      this.setState({refreshing: false});
    });
  }
  
  componentWillMount = async () =>{
    await console.log('started willmount');
    await this.platQuery();
  }

  clickAnnonce = props => {
    this.props.navigation.navigate("OneAnnonceSelected", {
      dataAnnonce: props
    });
  };
  whenNoCusinier = () => {};
  render() {
    if(this.state.loading==true){
      <View style={{flex:1}}>
          <ActivityIndicator size="large" color="#F1592A"/>
        </View>
    }
    else{
      if(this.data.length>0){
        <ScrollView>
            <FlatList
              data={this.data}
              keyExtractor={item => item.key}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />}
              renderItem={({ item }) => (
                <TouchableOpacity
              activeOpacity={0.8}
              style={stylesA.mainContainer}
              onPress={() => {
                this.props.navigation.navigate("OneAnnonceSelected", {
                  dataAnnonce: item
                });
              }}
            >
        <View style={stylesA.conatinertop}>
          <Text style={stylesA.boldText}>{item.name}</Text>
          <Text style={stylesA.boldText}>${item.price}</Text>
        </View>
        <View style={stylesA.conatinerbottom}>
          <View style={stylesA.globalContainerVoir_icon}>
            <Icon name="history" type="FontAwesome" style={stylesA.iconStyle} />
          </View>
          <View>
            <Text style={stylesA.mainTextStyle}>
              {item.normalDate}
            </Text>
            <Text
              numberOfLines={1}
              style={stylesA.mainTextStyle}
              ellipsizeMode={"tail"}
            >
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
              )}
            />
          </ScrollView>
      }
    }
    return (
      <View style={styles.mainContainer}>
        {!this.is_cooker ? (
          <TextButton
            headText={this.noCU.HeadText}
            secondText={this.noCU.secondText}
            boutonText={this.noCU.boutonText}
            fc={this.whenNoCusinier}
          />
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
