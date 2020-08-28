import React, { Component } from "react";
import TempoaryDrawer from "../SideBar/SideNav";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Bar, Line, Radar } from "react-chartjs-2";

class vendorProductList extends Component {
  state = {
    products: [],
    loading: true,
    error: false,
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <TempoaryDrawer />

          <div className="main">
           
          <div className="fitter">
                  
                  <div className="page-grid">
                       <div className="left">
                      
                          <div className="">
                                <h3 className="intro-header ">
                                Start Selling Online for Free
                            </h3>

                              <p className="pText">
                              Join hundreds of thousands of small businesses
                              who trust Ecwid E-commerce to sell online. 
                              </p>

                              <button
                            onClick={this.redirect_page}
                              class="custom-button" >

                               Get Started
                            </button>
                          </div>

                       </div>


                          <div className="right">
                              
                          </div>
                   </div>
               </div>

            <div className="fitter">

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
     TempoaryDrawer
    };
};


  
export default connect(
    mapStateToProps,)(vendorProductList)