import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";
import Dashboard from './containers/Dashboard'
import NormalLoginForm from "./containers/Login";
// import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import RegistrationForm from "./authentication/registration"

//Auth
import AdminLoginForm from './authentication/AdminLogin'
import LoginForm from './authentication/Login'


//Admin Dashboard
import AdminBase from './admin/Base'
import ProfileDashboard from './containers/Dashboard222'
import PendingFarmers from "./admin/getPendingVendors";
import VerifyAccount from "./admin/verifyDetails"
import Transactions from './admin/transactions'
import Vendors from './admin/getVendors'
import Products from './admin/getProducts'
import Logistics from './admin/getLogistics'
import Orders from './admin/getOrders'

// import ProductCreate from './vendor/createProduct'

//Vendor
import FarmerDashboard from './vendor/dashboard'
import ProfileUpdate from './vendor/updateProfile'
import New_Upload from './vendor/Vendor_Create_Product'
import FarmerProducts from "./vendor/products"
import AnalysisReport from './vendor/analysis'

//Shop
import ProductList from "./shop/ProductList";
import OrderSummary from "./shop/OrderSummary";
import ProductDetail from "./shop/ProductDetail";
import CheckOutPage from "./shop/CheckoutPage";

//User
import resetPassword from "./authentication/resetPassword"
import ChangePassword from "./authentication/changePassword"
import PasswordResetConfirm from './authentication/resetPasswordConfirm'

// New Trade
import TradeMain from './trade-dashboard/main'
import OrderPage from './trade/order-page'

//New Admin Order  Control
import adminOrderDetail from './trade-dashboard/components/orderDetails'

//Admin Vendor Management
import adminVendorManagement from './trade-dashboard/vendorManagement/vendorControl'
import adminVendorDetailsManagement from './trade-dashboard/vendorManagement/vendorsDetail'

//vendor section
import vendorDashboard from './vendorControl/dashoard'
import vendorProductList from './vendorControl/components/vProductsList'
import vendorProductDetails from './vendorControl/components/vProductDetails'
import createProduct from './vendorControl/Actions/createProduct'

//vendors  Profile actions
import vendorSetupProfile from './vendorControl/Actions/setupProfile'
import vendorEditProfile from './vendorControl/Actions/editProfile'



//HOEme
import MainLayout from './Trade-ui/main'
//
// import Layout from './Trade-ui/components/main'
import ProductPage from './Trade-ui/product-page'
import ProductDetailTwo from './Trade-ui/components/product-detail'
 import AgricPage from './Trade-ui/components/agric-page'


const BaseRouter = () => (
  <Hoc>
    {/* Home */}
    <Route exact path="/" component={MainLayout} />
    <Route exact path="/dash" component={ProfileDashboard} />

    {/* Vendor */}
    <Route exact path="/farmer-dashboard" component={FarmerDashboard} />
    <Route exact path="/f-update-profile" component={ProfileUpdate} />{" "}
    <Route exact path="/f-products" component={FarmerProducts} />{" "}
    <Route exact path="/f-analysis" component={AnalysisReport} />{" "}
    {/* <Route exact path="/create" component={ProductCreate} /> */}
    <Route exact path="/upload" component={New_Upload} />

    {/* Shop */}
    <Route exact path="/products" component={ProductList} />
    <Route exact path="/p-detail/:productID" component={ProductDetail} />
    <Route exact path="/cart" component={OrderSummary} />
    <Route exact path="/checkout" component={CheckOutPage} />{" "}

    {/* Admin */}
    <Route exact path="/admin" component={AdminBase} />
    <Route exact path="/a-transactions" component={Transactions} />
    <Route exact path="/a-vendors" component={Vendors} />
    <Route exact path="/pending-farmers" component={PendingFarmers} />
    <Route exact path="/pending/:farmerID" component={VerifyAccount} />{" "}
    <Route exact path="/a-products" component={Products} />{" "}
    <Route exact path="/a-logistics" component={Logistics} />{" "}
    <Route exact path="/a-orders" component={Orders} />{" "}

    {/* Authentication */}
    <Route exact path="/register/" component={RegistrationForm} />    
    <Route exact path="/login/" component={LoginForm} />
    {/* <Route exact path="/signup/" component={Signup} /> */}
    <Route exact path="/reset" component={resetPassword} />
    <Route exact path="/change" component={ChangePassword} />
    <Route path="/reset/:uid/:token/" component={PasswordResetConfirm}/>
    {/* <Route exact path="/reset-pass" component={PasswordReset} /> */}
    {/* <Route path="/account/confirm-email/:key" component={AccountActivation}/>
    <Route path="/signup_done" component={SignupDone}/>
    <Route path="/reset_password" component={PasswordReset}/>
    <Route path="/reset_password_done" component={PasswordResetDone}/>
    <Route path="/reset/:uid/:token/" component={PasswordResetConfirm}/> */}

     {/* Excite Adminstration */}
    <Route exact path="/trade-admin" component={TradeMain} />
    <Route exact path='/admin-login/' component={AdminLoginForm} />

    <Route exact path='/orders-detailView/:orderID/' component={adminOrderDetail}/>
    <Route exact path="/order-page/:orderID" component={OrderPage} />
    
    <Route exact path="/admin/vendor-control/" component={adminVendorManagement} />
    
    <Route exact path="/admin/vendor-details-control/:vendorID" component={adminVendorDetailsManagement} />
     {/* Excite Adminstration ends here */}

    {/* Vendor Section starts here */}
    <Route exact path="/vendor/dashboard/" component={vendorDashboard} />
    <Route exact path="/vendor/products/" component={vendorProductList} />
    
    <Route exact path="/vendor/products-detail/:productID/" component={vendorProductDetails} />
    <Route exact path="/vendor/setup-profile/" component={vendorSetupProfile} />
    
    <Route exact path="/vendor/edit-profile/" component={vendorEditProfile} />
    
    <Route exact path="/vendor/create-product/" component={createProduct} />

    <Route exact path="/e-p-detail/:productID" component={ProductDetailTwo} />
    <Route exact path="/eproducts" component={AgricPage} /> 

    {/* Vendor Section starts here */}



  </Hoc>
);

export default BaseRouter;
 