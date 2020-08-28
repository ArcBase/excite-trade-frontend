import React, { Component } from "react";
import  TempoaryDrawer from './SideBar/SideNav'

import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import {Bar, Line ,Radar} from 'react-chartjs-2';
import {message} from 'antd'
import VendorProductsListTable from './Tables/ProductTables'

const host = 'https://trade-backn.herokuapp.com'
const vendorProfileURL  = host + `/stream/get_profileID/`


class vendorDashboard extends Component {
  state = {
    vendorProducts :[],
    vendorProfile : [],
    profileID:'',
    isVerified:true,
  };

  


  getProfileDetails = (token,profileID) =>{
    const endpoint = host + `/vendor/getProfileData/`
    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      
      axios.get(endpoint)
      .then(res =>{
        this.setState({
          profile: res.data
        })
        console.log('profile details',res.data['Edited'])
        const CheckEdit = res.data['Edited']
        const checkVerification = res.data['Verified']
        if (CheckEdit == false){
          // message.error('Please Edit Your profle, For Us to Process Your Data', 10)
          //this.props.history.push("/edit_profile/")
         // this.props.history.push("/edit_profile/")
        }
        if(checkVerification == false){
          this.setState({
            isVerified:true
          })
        }
      })

    
} 

getProfileID = async (token) =>{
  const endpoint = host + `/vendor/getUserIDandEmail/`
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`
  };
  await axios.get(endpoint)
  .then(res =>{
    this.setState({
      profileID: res.data['userID']
    })
  });

  await this.getProfileDetails(token, this.state.profileID)

}



  getVendorProducts = async(token) =>{
    const endpoint = host + `/vendor/product-list/`
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    await axios.get(endpoint)
    .then(res =>{
      if (res.status == 200){
        this.setState({
          vendorProducts : res.data
        })
        console.log(res.data)
      }
    })
  }


  polulateChart = ()=>{
    this.setState({
      chartData:{
        labels: ['*','Revenue' ,'Total Products' ,'Orders'],
        datasets:[
          {
            label:'Impressions',
            data: [0,'230', '260','300'],
            backgroundColor:[
              
              'rgb(9, 173, 50)',
              'rgb(9, 173, 50)',
              'rgb(9, 173, 50)',
            ]
          }
        ]
      }
    })
    }
  
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.getVendorProducts(this.props.token)
      this.getProfileID(this.props.token)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.getVendorProducts(newProps.token)
        this.getProfileID(newProps.token)
      }
    } 
  }


  render() {
    const  {vendorProducts ,vendorProfile} = this.state
    return (
      <>
        <TempoaryDrawer />
        <div className="main">

        <div className="fitter">
                    <ul className="display-cards-container">
                      <li className="display-cards-list">
                          <div className="display-cards-box display-green">
                            <h3 className="display-card-title-override">
                            Products
                            </h3>
                            <p  className="display-card-text">                           
                            {vendorProducts.length}
                            </p>
                          </div>
                      </li>


                      <li className="display-cards-list">
                          <div className="display-cards-box">
                            <h3 className="display-card-title-default">
                             Upload Product
                            </h3>
                           <Link to="/vendor/create-product/">
                           <p  className="display-card-text-default">
                            Get Started
                            </p>
                            </Link>
                          </div>
                      </li>

                      <li className="display-cards-list">
                          <div className="display-cards-box ">
                            <h3 className="display-card-title-default">
                             Verifcation Status
                            </h3>
                           {
                             vendorProfile.Verified ? (
                              <p  className="display-card-text-default">
                                Verified
                              </p>
                             ) : (
                              <p  className="display-card-text-default">
                            Pending Verification
                              </p>
                             )
                           }
                          </div>
                      </li>
                    </ul>
             </div>  

              <div className="fitter">
              <VendorProductsListTable productList = {vendorProducts} />
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
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
     
    };
};


  
export default connect(
    mapStateToProps,)(vendorDashboard)