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
// import { dataRepasCommande } from "../home/MapComponents/MyData/Mydata";
import OneCommande from './OneCommande'
import TextButton from '../othersComponents/TextButton'
import firebase from "react-native-firebase";
class EnCoursC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading:true};
    this.data = [];
  }

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

  parseData=async(querySnapshot)=>{
    await querySnapshot.forEach(async doc => {
      let _data = await doc.data();
      let key = await doc.id;
      let imagePlat= null;
      await firebase.firestore().collection('PlatPost').doc(_data.platKey).get().then(doc=>{let __data=doc.data(); imagePlat=__data.pictures[0]})
      let normalDate = await this.convertToDate(_data.datePlaced.toDate());
      await this.data.push({ ..._data, key, normalDate, imagePlat });
    });
  }

  getData=async()=>{
    const user = await firebase.auth().currentUser;
    const ref= await firebase.firestore().collection('Orders').where('buyer.uid','==',user.uid);
    await ref.get().then((doc=>{this.parseData(doc)}));
    await this.setState({loading:false});
  }

  componentWillMount(){
    console.log('started WillMount')
    this.getData();
  }

  render() {
    console.log('rendering');
    console.log(this.data);
    console.log(Object.keys(this.data).length);
    console.log(this.data[0]);
    if (this.state.loading == true) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#F1592A" />
        </View>
      );
    }
        return(
          <View style={styles.mainContainer}>
          <ScrollView>
            <FlatList
              data={this.data}
              keyExtractor={item => item.key}
              renderItem={({ item }) =><OneCommande data={ item }/>}
            />
          </ScrollView>
        </View>
        )

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

export default EnCoursC;

//data
