import { POST_START, POST_SUCCESS, POST_FAIL } from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  itemer: [],
  error: null,
  loading: false
};

const postStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const postSuccess = (state, action) => {
  return updateObject(state, {
    itemer: action.data,
    error: null,
    loading: false
  });
};

const postFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_START:
      return postStart(state, action);
    case POST_SUCCESS:
      return postSuccess(state, action);
    case POST_FAIL:
      return postFail(state, action);
    default:
      return state;
  }
};

export default postReducer;
