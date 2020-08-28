import React, { Component } from "react";
import SideDrawer from "../Sidebar/SideNav";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {message} from 'antd'
import VendorDetailsTable from '../components/vDetailsTable'
import {Bar, Line ,Radar} from 'react-chartjs-2';

const host = 'http://127.0.0.1:8000'

class adminVendorDetailsManagement extends Component {
  state = {
   
    profileDetail : [] ,
    verifiedProfiles:[] ,
    pendingProfiles: []

  };

  getVendorProfile = async(token)=>{
    const profileID = this.props.match.params.vendorID
    const endpoint = host + `/eAdmin/v-details/${profileID}`
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    await axios.get(endpoint)
    .then(res =>{
      if (res.status == 200){
        this.setState({
            profileDetail:res.data ,
          
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


  updateVerification = async()=>{
    const vendorID = this.props.match.params.vendorID
    const endpoint = host + `/eAdmin/vendor-verification/${vendorID}`
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };

    await axios.get(endpoint)
    .then(res => {
      if (res.status == 200){
        message.success('Vendor Verified Succussfully')
        this.getVendorProfile(this.props.token)
      } else{
        message.success('Error Verifying vendor')
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
    const  {orderList ,profileDetail ,pendingProfiles ,verifiedProfiles} = this.state
    return (
      <>
        <SideDrawer />
        <div className="main">

        <div className="fitter">
                    <ul className="display-cards-container">
                      <li className="display-cards-list">
                          <div className="display-cards-box display-green">
                            <h3 className="display-card-title-override">
                            Username
                            </h3>
                            <p  className="display-card-text">                           
                            {profileDetail.user}
                            </p>
                          </div>
                      </li>


                      <li className="display-cards-list">
                          <div className="display-cards-box">
                            <h3 className="display-card-title-default">
                             Verification Status
                            </h3>
                           {
                               profileDetail.Verified ? (
                                <p  className="display-card-text-default completed-task">
                                Verified
                            </p>
                               ) :(
                                <p  className="display-card-text-default unCompleted-task ">
                                Pending
                            </p>
                               )
                           }
                          </div>
                      </li>

                      <li className="display-cards-list">
                          <div className="display-cards-box ">
                            <h3 className="display-card-title-default">
                             Date Joined
                            </h3>
                            <p  className="display-card-text-default">
                           {profileDetail.DateCreated}
                            </p>
                          </div>
                      </li>
                    </ul>
             </div>  

             <div className="fitter">
               <VendorDetailsTable vendorData={profileDetail} />
             </div>

              <div className="fitter">

                  <div className="page-grid">
                 
                  <div className="left">
                  <div className="">
                        {
                            profileDetail.Verified ? (
                                <button
                        onClick={this.updateVerification}
                        className="custom-button">
                          
                          Disable Account
                        </button>
                            ) : (
                                <button
                                onClick={this.updateVerification}
                                className="custom-button">
                               Verify
                                </button>
                            )
                        }
                      </div>
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

export default connect(mapStateToProps, null)(adminVendorDetailsManagement)
