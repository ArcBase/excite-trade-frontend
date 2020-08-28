import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    farmerID: null,
    username: null,
    name:null,
    phone:null,
    address:null,
    image: null,
    verified: null,
    info:null,
    error: null,
    loading: false
};


const getVendorStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
  
  const getVendorSuccess = (state, action) => {
    return updateObject(state, {
      farmerID: action.info.id,
      username: action.info.user,
      name:action.info.name,
      phone:action.info.phone,
      address:action.info.address,
      image: action.info.profilePicture,
      verified: action.info.status,
      info:action.info,
      error: null,
      loading: false
    });
  };
  
  const getVendorFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };
  

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_VENDOR_START:
        return getVendorStart(state, action);
      case actionTypes.GET_VENDOR_SUCCESS:
        return getVendorSuccess(state, action);
      case actionTypes.GET_VENDOR_FAIL:
        return getVendorFail(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;
  