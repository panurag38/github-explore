import { handle } from 'redux-pack';
import { UPDATE_BOOKMARK, GET_DATA, FILTER_BOOKMARK } from "./actionTypes";

const initialState = {
  searchResults: [],
  bookmarks: {},
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case UPDATE_BOOKMARK: {
      return handle(state, action, {
        start: (_state) => ({ ..._state }),
        success: (_state) => ({
          ..._state,
          bookmarks: payload,
        }),
        failure: (_state) => ({ ..._state }),
        finish: (_state) => ({ ..._state }),
      });
    }
    case FILTER_BOOKMARK: {
      return handle(state, action, {
        start: (_state) => ({ ..._state }),
        success: (_state) => ({
          ..._state,
          bookmarks: payload,
        }),
        failure: (_state) => ({ ..._state }),
        finish: (_state) => ({ ..._state }),
      });
    }
    case GET_DATA:
      return handle(state, action, {
        start: (_state) => ({ ..._state, loaded: false, loading: true, }),
        success: (_state) => ({
          ..._state,
          searchResults: payload.items || [],
        }),
        failure: (_state) => ({ ..._state, loaded: true, loading: false, }),
        finish: (_state) => ({ ..._state, loaded: true, loading: false }),
      });

    default: return state;
  }
};

export default rootReducer;