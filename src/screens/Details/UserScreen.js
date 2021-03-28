import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import api from '../../api';

const UserScreen = (props) => {
  const {
    route: { params: { profileData = {} } = {} },
  } = props;

  const { user = {} } = profileData;
  return (
    <View style={styles.userContainer}>
      <View style={styles.imgview}>
        <Image source={{uri: user.avatar_url}} style={styles.img} />
        <Text style={styles.username}>User: {user.login}</Text>
      </View>
      {/* {(() => {
        try {
        return (
          <View style={{ width: 300, height: 300, marginTop: 30, marginLeft: 30, borderRadius: 20, borderColor: 'black', backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'center'}}>
            <MapView
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        );
        } catch (error) {
            console.log(error);
            return null;
        }
      })()} */}
    </View>
  );
};

export default UserScreen;

