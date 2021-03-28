import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList } from 'react-native';
import SearchBar from '../../components/SearchBar';
import ListItemComponent from '../../components/ListItemComponent';
import Footer from '../../components/Footer';
import { updateBookmark } from '../../redux/actionCreator';
import styles from './styles';

const HomeScreen = (props) => {
  const {
    searchResults = [],
    updateBookmarkAction,
  } = props;

  const renderItem = useCallback(({ item }) => {
    return <ListItemComponent item={item} {...props} />;
  }, []);

  useEffect(() => {
    // initialize the bookmark, to be changed to app load
    updateBookmarkAction();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 8, paddingBottom: 50}}>
        <View style={styles.searchWrapper}>
          <SearchBar page={'HomeScreen'} />
        </View>
        {searchResults.length > 0 &&
          <View style={styles.title}>
            <Text>Showing results for repositories:</Text>
          </View>
        }
        {searchResults.length > 0 &&
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
          />
        }
        {searchResults.length === 0 &&
          <View style={styles.noresult}>
            <Text style={styles.texthint}>Get Started!</Text>
            <Text style={styles.texthint}>Search repos from git, add / delete your fav. repos </Text>
            <Text style={styles.texthint}>Search from your bookmarks, Apply filters </Text>
            <Text style={styles.texthint}>View repos, create issue </Text>
          </View>
        }
      </View>
      <Footer {...props} pagename="HomeScreen" />
    </View>
  );
};

const mapStateToProps = (store) => ({
  searchResults: store.searchResults,
});
const mapDispatchToProps = (dispatch) => ({
  updateBookmarkAction: (params) => dispatch(updateBookmark(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
