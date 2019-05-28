import React from "react";
import { View, Image} from "react-native";
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
  }

  checkNotifications =async (id) =>{
    const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        await firebase.messaging().getToken().then(token=>{firebase.firestore().collection('Users').doc(id).update({ pushToken: token }); return token})
      } else {
        await ToastAndroid.show('Vous ne recevrez pas de notifications de notre part', ToastAndroid.LONG);
      }
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
    const pushToken= await this.checkNotifications(user_id);
    const data= await {username,user_email,user_phoneNumber,user_photo, is_cooker, pushToken,user_id}; 
    await changeUserdataInGlobal('CHANGE_ALL',data,this.props)
  };
  componentWillMount =async () =>  {
    await this.getData();
    
  }
 /*  componentDidMount(){
    // Build a channel
    const channel = new firebase.notifications.Android.Channel('MidouV1.0r1', 'Midou', firebase.notifications.Android.Importance.Max)
    .setDescription('Midou');
    // Create the channel
    firebase.notifications().android.createChannel(channel);
    this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.

    });
    this.removeNotificationListener = firebase.notifications().onNotification((notification) => {
        // Process your notification as required
    });
  }

  componentWillUnmount() {
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
} */
  render() {
    // console.log(this.props)
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