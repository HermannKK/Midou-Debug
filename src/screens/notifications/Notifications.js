import React from "react";
import { Icon } from "native-base";
import {ActivityIndicator ,Image, FlatList, ScrollView, Text,StyleSheet, RefreshControl,View } from "react-native";
import firebase from "react-native-firebase";
class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading:true, refreshing:false,look:null};
    this.data =[]
  }

  dataQuery = async () => {
    this.data = await [];
    const userId =await firebase.auth().currentUser.uid;
    await console.log("started querry");
    const ref = await firebase
      .firestore()
      .collection("Notifications")
      .where("recipient.id", "==", userId);
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
    await console.log(this.data);
    await console.log("finished parsing");
  };

  convertToDate = async dateObject => {
    const d = await dateObject.getDate();
    const m = (await dateObject.getMonth()) + 1;
    const y = await dateObject.getFullYear();
    const h = await dateObject.getHours();
    const min = await dateObject.getMinutes();
    const date = (await d) + "/" + m + "/" + y;
    const hour = (await h) + ":" + min;
    const normalDate=await {date, hour};
    return normalDate;
  };

  _onRefresh = async () => {
    await this.setState({ refreshing: true });
    await this.dataQuery().then(() => {
      this.setState({ refreshing: false });
    });
  };

  componentWillMount = async () => {
    await console.log("started willmount");
    await this.dataQuery();
  };


  render() {
    console.log("rendering");
    console.log(this.data)
    if (this.state.loading) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#F1592A" />
        </View>
      )}
    else{
      if(this.data==null){
        return(
          <View style={{ flex: 1 }}>
            <Text>Vous n'avez aucune notification</Text>
          </View>
        )
      }
      else{ 
        if(this.data){
          return (
            <ScrollView>
              <FlatList
                data={this.data}
                keyExtractor={item => item.key}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
                renderItem={({ item }) =>{
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={[styles.mainContainer,{backgroundColor:item.recipient.isOpened? '#ecf0f1':'white' }]}
                    onPress={() => {this.props.navigation.navigate('CookerValidateCommande',{dataCom:item.orderKey})}}
                  >
                    <View style={styles.conatinerImage}>
                      <Image
                        style={styles.imageStyle}
                        resizeMode={"cover"}
                        source={{uri:item.pictureURL}}
                      />
                    </View>
                    <View style={styles.conatinerGlobalDescription}>
                      <Text style={styles.mainTextStyle}>
                        {item.recipient.body}
                      </Text>
                      <Text>{item.normalDate.date} à {item.normalDate.hour}</Text>
                    </View>
                    <View style={styles.globalContainerVoir_icon}>
                      <Icon
                        name="chevron-small-right"
                        style={styles.iconStyle}
                        type="Entypo"
                      />
                    </View>
                  </TouchableOpacity>
                } }
              />
            </ScrollView>
      );
        }
      }
    }
    
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

//data 