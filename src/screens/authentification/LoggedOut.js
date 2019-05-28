import {createStackNavigator,createAppContainer} from 'react-navigation';
import LoggedOutStep1 from './LoggedOutStep1';
import LoggedOutStep2 from './LoggedOutStep2';
import LoggedOutStep3 from './LoggedOutStep3';
import LoggedIn from './LoggedIn';
const LoggedOutStack = createStackNavigator(
    {
      Step1: {screen:LoggedOutStep1},
      Step2:{screen:LoggedOutStep2},
      Step3:{screen:LoggedOutStep3},
      LoggedIn:{screen:LoggedIn},
    },
    {
      initialRouteName:"Step1",
      headerMode: "none"
    }
  );
  const LoggedOut = createAppContainer(LoggedOutStack)
export default LoggedOut;
