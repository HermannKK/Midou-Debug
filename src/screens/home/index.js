import React from "react";
import { View, Image, ActivityIndicator} from "react-native";
import {
  Icon,
} from "native-base";
import firebase from "react-native-firebase";
import { connect } from "react-redux";
import { changeUserdataInGlobal } from "../../Store/Reducers/userProfilReducer";
import RenderMap from './MapComponents/RenderMap'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

 

  getData = async () => {
    const user=await firebase.auth().currentUser;
    const username = await user.displayName;
    const user_email = await user.email;
    const user_phoneNumber = await user.phoneNumber;
    const user_photo= await user.photoURL;
    const user_id= await user.uid;
    const ref= firebase.firestore().collection('Users').doc(user_id);
    const is_cooker = await ref.get().then((doc)=>{console.log(doc) ;return doc.data().is_cooker});
    const data= await {username,user_email,user_phoneNumber,user_photo, is_cooker,user_id}; 
    await changeUserdataInGlobal('CHANGE_ALL',data,this.props);}


  componentWillMount =async () =>  {
    await this.getData();
  }

  componentDidMount(){
    const channel = new firebase.notifications.Android.Channel('MidouV1.0r1', 'Midou', firebase.notifications.Android.Importance.Max).setDescription('Midou');
    firebase.notifications().android.createChannel(channel);
    this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log(notification);
    });
    this.removeNotificationListener = firebase.notifications().onNotification((notification) => {
      const _notification = new firebase.notifications.Notification( {sound: 'default',show_in_foreground: true})
      .setNotificationId('notificationId')
      .setTitle(notification.title)
      .setBody(notification.body)
      .android.setAutoCancel(true)
      .android.setChannelId('MidouV1.0r1')
      .android.setSmallIcon('ic_launcher_round')
      .android.setPriority(firebase.notifications.Android.Priority.Default);
      firebase.notifications().displayNotification(_notification)
    });
  }

  componentWillUnmount() {
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
  }

  render() {
    
    
      return (
        <View style={{flex:1}}>
          <RenderMap onclick={this.props.navigation.openDrawer} />
          {/* <LoggedOutStep3/> */}
        </View>
      );
    
    
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Home);