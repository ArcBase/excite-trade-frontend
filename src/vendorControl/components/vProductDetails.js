import React, { Component } from "react";
import TempoaryDrawer from "../SideBar/SideNav";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const host = 'https://trade-backkn.herokuapp.com'

class vendorProductDetails extends Component {
  state = {
    productsData: [] ,

    chartData : [],
  };

  getProductsData = async(token)=>{
   
    const productID = this.props.match.params.orderID
    const endpoint = host + `/vendor/product-details/${productID}`
    
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    await axios.get(endpoint)
    .then(res =>{
      if (res.status == 200){
        this.setState({
          productsData :res.data
        })
        console.log(res.data)
      }
    })
  }


  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.getProductsData(this.props.token);
    
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.getProductsData(newProps.token);
  
      }
    } 
  }


  render() {
    const  {productsData} = this.state
    return (
      <>
        <TempoaryDrawer />
        <div className="main">

        <div className="fitter">
                    <ul className="display-cards-container">
                      <li className="display-cards-list">
                          <div className="display-cards-box display-green">
                            <h3 className="display-card-title-override">
                            
                            </h3>
                            <p  className="display-card-text">                           
                            1
                            </p>
                          </div>
                      </li>


                      <li className="display-cards-list">
                          <div className="display-cards-box">
                            <h3 className="display-card-title-default">
                             Insights
                            </h3>
                            <p  className="display-card-text-default">
                             2
                            </p>
                          </div>
                      </li>

                      <li className="display-cards-list">
                          <div className="display-cards-box ">
                            <h3 className="display-card-title-default">
                             Date Uploaded
                            </h3>
                            <p  className="display-card-text-default">
                            00
                            </p>
                          </div>
                      </li>
                    </ul>
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
    mapStateToProps,)(vendorProductDetails)