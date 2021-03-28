import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import styles from './styles';
import api from '../../api';
import toaster from '../../helpers/toaster';

const CreateIssueScreen = (props) => {
  // https://docs.github.com/en/rest/reference/issues#create-an-issue
  const {
    navigation: { pop }, route: { params: { repoName, repoUser } },
  } = props;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmit, setIsSubmit] = useState(true);

  const submitIssue = () => {
    if (!title && !body) return;
    setIsSubmit(false);
    // /repos/{owner}/{repo}/issues
    // title, body -> form input
    // api.post('https://api.github.com/repos/octocat/hello-world/issues', {
    api.post(`https://api.github.com/repos/${repoUser}/${repoName}/issues`, {
      data: {
        title,
        owner: repoUser,
        body,
      },
    }).then((res) => {
      setIsSubmit(true);
      if (res.title) {
        toaster(`issue: ${title} created successfully!`);
        pop();
        return;
      }
      toaster(res.message);
    }).catch((error) => {
      console.log(error);
      toaster('Something went wrong');
    });
  };

  useEffect(() => {
  }, []);

  return (
    <View style={styles.issueContainer}>
      <View style={styles.titleWrapper}>
        {/* <Icon name='mail' color='#00716F' size={24} /> */}
        <TextInput style={{ paddingHorizontal: 10 }} placeholder= 'issuetitle' onChangeText={text => setTitle(text)} />
      </View>
      <View style={styles.bodyWrapper}>
        {/* <Icon name='mail' color='#00716F' size={24}/> */}
        <TextInput style={{ paddingHorizontal: 10 }} placeholder= 'issue body' onChangeText={text => setBody(text)} />
      </View>
      <TouchableOpacity onPress={() => submitIssue()}>
        <View style={{ marginHorizontal: 55, alignItems: 'center', justifyContent: 'center', marginTop: 30, paddingVertical: 10, backgroundColor: `${title && body ? 'green' : 'grey'}`, border: 1, borderRadius: 10, }}>
          <Text style={{ color: 'white' }}>Submit Issue</Text>
        </View>
      </TouchableOpacity>
      {!isSubmit &&
        <ActivityIndicator size='large' color='#00ff00' style={{ flex: 1 }} />
      }
    </View>
  );
};

export default CreateIssueScreen;

