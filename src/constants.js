//const localhost = "https://trade-backn.herokuapp.com";
const localhost = "https://trade-backn.herokuapp.com";
const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

//Shop
export const productListURL = `${endpoint}/product-list/`;
export const productDetailURL = id => `${endpoint}/products/${id}/`;
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const userIDURL = `${endpoint}/user-id/`;
export const postURL = `${endpoint}/posts/`;
export const orderItemDeleteURL = id => `${endpoint}/order-items/${id}/delete/`;
export const orderItemUpdateQuantityURL = `${endpoint}/order-item/update-quantity/`;
export const checkoutURL = `${endpoint}/checkout-form/`;

export const userDetail = `${endpoint}/rest-auth/user/`;
export const farmerlist = `${endpoint}/farmers-list/`

//Admin
export const PendingOrders = `${endpoint}/pending-orders/`
export const DeliveredPending = `${endpoint}/delivered-orders/`
export const AdminLogistics = `${endpoint}/logistics/`
export const logUpdate =`${endpoint}/log-update/`
export const transactions = `${endpoint}/transactions`
export const vendorVerification = id => `${endpoint}/f-verify/${id}/`;
export const pendingVendors =  `${endpoint}/f-list/`

//Farmer
export const vendorItems = `${endpoint}/vendor-list/`;
export const verifyURL = `${endpoint}/verify/`;
export const vendorURL = `${endpoint}/vendor-profile/1/`;
export const vendorUpdateURL = `${endpoint}/f-update/`
export const vendorCheckURL = `${endpoint}/f-check/`
export const vendorProducts = `${endpoint}/f-items-list/`

//Authorization
export const loginURL = `${localhost}/rest-auth/login/`
export const registrationURL = `${localhost}/rest-auth/registration/`
export const changePasswordUrl = `${localhost}/rest-auth/password/change/`;
export const resetPasswordUrl = `${localhost}/rest-auth/password/reset/`;
export const resetPasswordConfirmUrl = `${localhost}/rest-auth/password/reset/confirm/`;
export const activateUserUrl = `${localhost}/rest-auth/registration/verify-email/`;
export const userProfileUrl = `${localhost}/rest-auth/user/`;

//misc
//export const countryListURL = `${endpoint}/countries/`;
// export const addressCreateURL = `${endpoint}/addresses/create/`;
// export const addressUpdateURL = id => `${endpoint}/addresses/${id}/update/`;
// export const addressDeleteURL = id => `${endpoint}/addresses/${id}/delete/`;
// export const addressListURL = addressType =>
//   `${endpoint}/addresses/?address_type=${addressType}`;
