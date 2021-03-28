import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';
import ListItemComponent from '../../components/ListItemComponent';
import { updateBookmark } from '../../redux/actionCreator';
import styles from './styles';

const BookmarkScreen = (props) => {
  const {
    navigation: { navigate },
    updateBookmarkAction,
    bookmarks = {},
  } = props;

  const [searchResults, setSearchResults] = useState([]);
  const [filterSelected, setFilterSelected] = useState(false);

  // function to sort based on time, or reset the sort selection
  const onSort = (type) => {
    if (type === 'reset' || filterSelected) {
      const values = Object.values(bookmarks);
      setSearchResults(values);
      setFilterSelected(false);
      return;
    }
    // [{}. {}, {}.... {timestampAdded: //}]
    let values = Object.entries(searchResults);
    values = values.map((item) => item[1]);
    const sortedArray = values.sort((a, b) => b.timestampAdded - a.timestampAdded);
    setSearchResults(sortedArray);
    setFilterSelected(!filterSelected);
  };

  // component as prop to Flat list rendering individual list component
  const renderItem = useCallback(({ item }) => {
    return <ListItemComponent item={item} {...props} parentName="bookmark" />;
  }, []);

  useEffect(() => {
    const values = Object.values(bookmarks);
    setSearchResults(values);
  }, [bookmarks])

  useEffect(() => {
    // update from stores if data available in redux
    if (bookmarks && Object.values(bookmarks).length > 0) {
      const values = Object.values(bookmarks);
      setSearchResults(values);
      return;
    }
    // else initialize data in redux from storage
    updateBookmarkAction().then(({ payload = {}}) => {
      if (!payload) return;
      const values = Object.values(payload);
      setSearchResults(values);
    });
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <SearchBar page={'BookmarkScreen'} />
      </View>
      {searchResults.length > 1 &&
        <View style={styles.title}>
          <Text style={styles.sortBy}>Sort By: </Text>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => onSort('time')} style={styles.filterWrapper}>
              <Icon name="filter-alt" size={24} color={filterSelected ? '#00b300' : '#9d9d9d'} />
              <Text style={{marginTop: 1, color: filterSelected ? '#00b300' : '#9d9d9d'}}>Recent First</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.resetWrapper}>
            <TouchableOpacity onPress={() => onSort('reset')} style={{ flex: 1, alignItem: 'flex-end' }}>
              <Text>Reset Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      {searchResults.length > 0 &&
        <View style={styles.flatlistWrapper}>
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
          />
        </View>
      }
      <Footer {...props} />
    </View>
  );
};

const mapStateToProps = (store) => ({
  bookmarks: store.bookmarks,
});
const mapDispatchToProps = (dispatch) => ({
  updateBookmarkAction: (params) => dispatch(updateBookmark(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkScreen);
