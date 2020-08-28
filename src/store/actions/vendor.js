import axios from "axios";
import * as actionTypes from "./actionTypes";


export const getVendorStart = () => {
    return {
      type: actionTypes.GET_VENDOR_START
    };
  };
  
  export const getVendorSuccess = info => {
    return {
      type: actionTypes.GET_VENDOR_SUCCESS,
      info
    };
  };
  
  export const getVendorFail = error => {
    return {
      type: actionTypes.GET_VENDOR_FAIL,
      error: error
    };
  };
  
  export const FarmerDetails = (token,id) => {
    return dispatch => {
      dispatch(getVendorStart());
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`https://trade-backkn.herokuapp.com/api/f-details/${id}/`)
        .then(res => {
          const info = {
                "id": res.data.id,
                "name": res.data.fullName,
                "phone": res.data.phone,
                "address": res.data.address,
                "image": res.data.profilePicture,
                "status": res.data.verified,
                "user": res.data.user
            }
          localStorage.setItem("info", JSON.stringify(info));
          dispatch(getVendorSuccess(info))
        })
        .catch(err => {
          dispatch(getVendorFail(err));
        });
    };
  };
  