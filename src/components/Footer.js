import React, {useCallback, memo} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const Footer = (props) => {
  const {
    navigation: { navigate }, route: { name },
  } = props;

 const navigateFn = useCallback((pagename) => {
  navigate(pagename);
 }, []);

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigateFn('HomeScreen')}>
        <View>
          <Icon name="home" color={name === 'HomeScreen' ? '#6262ff' : 'black'} />
          <Text style={{ color: name === 'HomeScreen' ? '#4e4eff' : 'black' }}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigateFn('BookmarkScreen')}>
        <View style={styles.footerItem}>
          <Icon name="bookmarks" color={name === 'BookmarkScreen' ? '#6262ff' : 'black'}/>
          <Text style={{ color: name === 'BookmarkScreen' ? '#4e4eff' : 'black' }}>Bookmarks</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigateFn('ProfileScreen')}>
        <View style={styles.footerItem}>
          <Icon name="account-box" />
          <Text>Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


export default memo(Footer);
