import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Footer from '../../components/Footer';
import ListItemComponent from '../../components/ListItemComponent';
import styles from './styles';
import api from '../../api';

const DetailsScreen = (props) => {
  const {
    navigation: { navigate }, route: { params: { item = {} } },
  } = props;

  const { has_issues, owner: { id, login } } = item;

  const [details, setDetails] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getDetails = useCallback(() => {
    // /repos/{owner}/{repo}/issues
    api.get(`https://api.github.com/repos/${login}/${item.name}/issues`, {
      params: {
        per_page: 5,
      },
    }).then((res = []) => {
      setDetails(res);
      setIsLoaded(true);
    }).catch((error) => console.log(error));
  }, []);

  const renderIssues = ({ item: issueItem, index }) => {
    const { title, updated_at, user = {}, repository_url } = issueItem;
    console.log('render issue', issueItem, index);
    return (
      <View style={styles.issueItem}>
        <Text style={styles.issueTitle}>{index + 1}. {title}</Text>
        <Text style={styles.createdat}><Text>Created at:</Text> <Text style={styles.issueDate}>{updated_at}</Text></Text>
        <TouchableOpacity onPress={() => navigate('UserScreen', { profileData: issueItem })}>
          <View style={styles.userContent}>
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Image source={{uri: user.avatar_url}} style={{width: 60, height: 60}} />
              </View>
              <View style={{flex: 4, marginLeft: 8, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text style={styles.issueDate}>user: {user.login}</Text>
                <Text style={styles.issueDate}>{user.avatar_url}</Text>
              </View>
          </View>
        </TouchableOpacity>
        <Text style={{marginTop: 12}}>Repo Link: {repository_url}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (has_issues) {
      getDetails();
    }
  }, [])

  if (!isLoaded) {
    return (
      <ActivityIndicator size='large' color='#00ff00' style={styles.activity} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ height: 160 }}>
        <ListItemComponent item={item} {...props} />
      </View>
      <View style={styles.flatlistWrapper}>
        {details.length > 0 &&
          <View>
            <Text style={styles.title}>Showing top issues:</Text>
          </View>
        }
        {(() => {
          if (details.length > 0) {
            return (
              <FlatList
                data={details}
                renderItem={renderIssues}
                keyExtractor={item => String(item.id)}
              />
            );
          }
          return (
            <View style={styles.noresult}>
              <Text>No Issues Available!</Text>
            </View>
        );
        })()}
      </View>
      <Footer {...props} page={'DetailsScreen'} />
    </View>
  );
};

export default DetailsScreen;
