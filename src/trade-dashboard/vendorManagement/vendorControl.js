import React, { Component } from "react";
import SideDrawer from "../Sidebar/SideNav";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// import SimpleTable from "./components/table";
import VendorListTable from '../components/vListTables'
import {Bar, Line ,Radar} from 'react-chartjs-2';

const host = 'https://trade-backkn.herokuapp.com'

class adminVendorManagement extends Component {
  state = {
   
    profileList : [] ,
    verifiedProfiles:[] ,
    pendingProfiles: []

  };

  getVendorProfile = async(token)=>{
    const endpoint = host + `/eAdmin/v-list/`
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    await axios.get(endpoint)
    .then(res =>{
      if (res.status == 200){
        this.setState({
            profileList:res.data ,
          
        })
        console.log(res.data)
      }
    })
  }
 
  getVendorVerificationCount = async(token)=>{
    const endpoint = host + `/eAdmin/v-counter/`
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    await axios.get(endpoint)
    .then(res =>{
      if (res.status == 200){
        this.setState({
            pendingProfiles:res.data['pendingProfiles'] ,
            verifiedProfiles:res.data['verifiedProfiles']
          
        })
        console.log(res.data)
      }
    })
  }
  

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.getVendorProfile(this.props.token);
      this.getVendorVerificationCount(this.props.token);
    
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.getVendorProfile(newProps.token);
        this.getVendorVerificationCount(newProps.token)

      }
    } 
  }


  render() {
    const  {orderList ,profileList ,pendingProfiles ,verifiedProfiles} = this.state
    return (
      <>
        <SideDrawer />
        <div className="main">

        <div className="fitter">
                    <ul className="display-cards-container">
                      <li className="display-cards-list">
                          <div className="display-cards-box display-green">
                            <h3 className="display-card-title-override">
                            Vendors
                            </h3>
                            <p  className="display-card-text">                           
                            {profileList.length}
                            </p>
                          </div>
                      </li>


                      <li className="display-cards-list">
                          <div className="display-cards-box">
                            <h3 className="display-card-title-default">
                             Verified
                            </h3>
                            <p  className="display-card-text-default">
                            {verifiedProfiles}
                            </p>
                          </div>
                      </li>

                      <li className="display-cards-list">
                          <div className="display-cards-box ">
                            <h3 className="display-card-title-default">
                             Pending
                            </h3>
                            <p  className="display-card-text-default">
                            {pendingProfiles}
                            </p>
                          </div>
                      </li>
                    </ul>
             </div>  

             <div className="fitter">
               <VendorListTable vendorListData={profileList} />
             </div>

              <div className="fitter">

                  <div className="page-grid">
                 
                  <div className="left">
                      
                  </div>

                  <div className="right">

                  </div>

                  </div>



              </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null,
    };
};

export default connect(mapStateToProps, null)(adminVendorManagement)
