import axios from "axios";
import * as actionTypes from "./actionTypes";

export const postStart = () => {
  return {
    type: actionTypes.POST_START
  };
};

export const postSuccess = postData => {
  return {
    type: actionTypes.POST_SUCCESS,
    postData
  };
};

export const postFail = error => {
  return {
    type: actionTypes.POST_FAIL,
    error: error
  };
};

export const createProduct = (token, postData) => {
    return dispatch => {
      dispatch(postStart());
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`
      };
      axios
        .post(`https://trade-backn.herokuapp.com/api/posts/`, postData)
        .then(res => {
          dispatch(postSuccess(postData));
        })
        .catch(err => {
          dispatch(postFail());
        });
    }
  }
  