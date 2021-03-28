import React, { memo, useCallback } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Touchable } from 'react-native';
import { updateBookmark } from '../redux/actionCreator';
import styles from './styles';

const ListItemComponent = (props = {}) => {
  const {
    updateBookmarkAction,
    item,
    bookmarks = {},
    route: { name },
    navigation: { navigate },
  } = props;

  const navigateDetails = useCallback(() => {
    if (name === 'DetailsScreen') return;
    navigate('DetailsScreen', { item });
  }, []);

  return (
    <View style={styles.listItem}>
      <View>
          <TouchableOpacity onPress={() => navigateDetails(item)}>
            <Text style={styles.listName}>{item.name}</Text>
            <Text style={styles.listDesc}>{item.description}</Text>
          </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}}>
        <View style={styles.issueWrapper}>
          <TouchableOpacity onPress={() => navigate('CreateIssueScreen', { repoName: item.name, repoUser: item.owner.login })}>
            <Text style={styles.newIssue}>Create new issue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bookmarkBtn}>
          {!bookmarks[item.id] &&
            <TouchableOpacity onPress={() => updateBookmarkAction(item)}>
              <View style={styles.btnWrapper}>
                {/* <Icon name="bookmark" /> */}
                <Text style={styles.addBookmark}>Add Bookmark</Text>
              </View>
            </TouchableOpacity>
          }
          {bookmarks[item.id] &&
            <TouchableOpacity onPress={() => updateBookmarkAction(item)}>
              <View style={styles.btnWrapper}>
                {/* <Icon name="bookmark" /> */}
                <Text style={styles.delBookmark}>Remove Bookmark</Text>
              </View>
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  bookmarks: store.bookmarks,
});

const mapDispatchToProps = (dispatch) => ({
  updateBookmarkAction: (params) => dispatch(updateBookmark(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(ListItemComponent));
