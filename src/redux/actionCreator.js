import { UPDATE_BOOKMARK, GET_DATA, FILTER_BOOKMARK } from "./actionTypes";
import api from '../api';
import Storage from '../helpers/storage';
import toaster from '../helpers/toaster';


async function fetchAndUpdateBookmark(item = {}) {
  let bookmarks = {};
  bookmarks = await Storage.get('bookmarks') || {};
  if (bookmarks[item.id]) {
    // remove from bookmark
    delete bookmarks[item.id];
    await Storage.set('bookmarks', { ...bookmarks });
    toaster('Removed from bookmark');
    return bookmarks;
  } else if (item.id) {
    // add to bookmark
    bookmarks[item.id] = item;
    bookmarks[item.id].timestampAdded = parseInt((new Date().getTime() / 1000), 10);
    // update storage
    await Storage.set('bookmarks', { ...bookmarks });
    toaster('Added bookmark!');
    return bookmarks;
  } else {
    // if it is neither add or delete, then update bookmark from storage to redux
    await Storage.set('bookmarks', { ...bookmarks });
    // toaster('synced bookmark!');
    return {...bookmarks};
  }
}

async function fetchAndFilterBookmark(str) {
  let bookmarks = {};
  bookmarks = await Storage.get('bookmarks') || {};
  // case to reset search results to all bookmarks
  if (str === '') return bookmarks;
  
  const bookmarkArr = Object.entries(bookmarks);

  // check if bookmarks available
  if (bookmarkArr.length === 0) return [];
  
  const output = {}
  bookmarkArr.filter((item) => {
    // check for string matching to name or description
    if (item[1]['name'].includes(str) || item[1]['description'].includes(str)) {
      output[item[0]] = item[1];
      return true;
    }
  });

  return output;
}

// https://api.github.com/search/repositories?q=java&sort=stars&order=desc
const getApiData = (str) => {
  return {
    type: GET_DATA,
    promise: api.get('https://api.github.com/search/repositories', {
      params: {
        q: str,
        sort: 'stars',
        order: 'desc',
        per_page: 15,
      },
    }),
  };
};

const updateBookmark = (item) => {
  return {
    type: UPDATE_BOOKMARK,
    promise: fetchAndUpdateBookmark(item),
  };
};

const filterBookmark = (str) => {
  return {
    type: FILTER_BOOKMARK,
    promise: fetchAndFilterBookmark(str),
  };
};

export { updateBookmark, getApiData, filterBookmark };