import React, { useState, useRef, useCallback, memo } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { Icon } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import { getApiData, filterBookmark } from '../redux/actionCreator';
import styles from './styles';

const SearchBar = (props) => {
  const {
    // navigation: { navigate },
    page,
    getDataAction,
    filterBookmarkAction,
  } = props;
  const [text, setText] = useState('');
  const debouncedApiAction = useRef(debounce((str) => getDataAction(str), 300)).current;
  const debouncedFilterAction = useRef(debounce((str) => filterBookmarkAction(str), 300)).current;



  const onTextChange = useCallback((str) => {
    setText(str);
    if (str && str.length > 2 && page === 'HomeScreen') {
      debouncedApiAction(str);
    } else {
      // for bookmark screen, search from bookmark in redux
      debouncedFilterAction(str);
    }
  }, []);

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchContent}>
        <Icon name="search" color="#9d9d9d" size={24} />
        <View style={styles.textInputWrapper}>
          <TextInput
            value={text}
            style={{ fontSize: 16 }}
            placeholder= {page === 'HomeScreen' ? 'search from github repos...' : 'Search from bookmarks'}
            autoFocus={false}
            onChangeText={(text) => onTextChange(text)}
          />
        </View>
        {text !== '' &&
          <Icon name="clear" color="#9ab1c3" size={16} onPress={() => onTextChange('')} />
        }
      </View>
    </View>
  );
};


const mapDispatchToProps = (dispatch) => ({
  getDataAction: (params) => dispatch(getApiData(params)),
  filterBookmarkAction: (params) => dispatch(filterBookmark(params)),
})

export default connect(null, mapDispatchToProps)(memo(SearchBar));
