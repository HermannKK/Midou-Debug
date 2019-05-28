import React from "react";
import { Icon } from "native-base";
import { Image, View, StyleSheet, Text,ScrollView } from "react-native";
import { connect } from "react-redux";
import { DrawerItems, SafeAreaView } from 'react-navigation';

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <View
        style={styles.contbox}
      >
        {props.user_photo == null ? (
          <Icon
            name={"user"}
            type="FontAwesome"
            style={styles.usericon}
          />
        ) : (
          <Image
            style={styles.userPic}
            source={{ uri: props.user_photo }}
            resizeMode={"cover"}
          />
        )}
        <Text style={styles.username}>
          {props.username}
        </Text>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  username:{ fontSize: 20, color: "white" },
  contbox:{
    height: 200,
    backgroundColor: "#EE5A24",
    alignItems: "center",
    justifyContent: "center"
  },
  userPic:{
    height: 100,
    width: 100,
    alignContent: "center",
    marginBottom: 5,
    borderRadius: 50
  },usericon:{ color: "white", fontSize: 80 }
});

const mapStateToProps = state => {
  return {
    username: state.userProfil.username,
    user_photo: state.userProfil.user_photo
  };
};

export default connect(mapStateToProps)(CustomDrawerContentComponent);