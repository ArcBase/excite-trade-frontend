import React, { Component } from 'react'

import * as information from "../store/actions/vendor"
import { Link, withRouter } from 'react-router-dom';
//import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";

//import TemporaryDrawer from './Sidebar/SideNav'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class ProfileDashboard extends Component {
 
    // The User Proifle State

    state = {
        collapsed: false,
        data: [],
        logistics: [],
        products: []
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    
      fetchFarm = (token, id) =>{
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios
          .get(`https://trade-backn.herokuapp.com/api/f-details/${id}/`)
          .then(res => {
            this.setState({ data: res.data, loading: false });
          }).catch(err => {
            this.setState({ error: err, loading: false });
            console.log(err);
            
          });
      }

      getLogs = (token) =>{
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios
          .get('https://trade-backn.herokuapp.com/api/logistics/')
          .then(res => {
            this.setState({ logistics: res.data, loading: false });
            console.log(res.data);
            
          }).catch(err => {
            this.setState({ error: err, loading: false });
            console.log(err);
            
          });
      }

      getFarmersProducts = (token) =>{
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios
          .get('https://trade-backn.herokuapp.com/api/f-items-list/')
          .then(res => {
            this.setState({ products: res.data, loading: false });
            console.log(this.state.products);
            
          }).catch(err => {
            this.setState({ error: err, loading: false });
            console.log(err);
            
          });
      }

      componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          this.fetchFarm(this.props.token, this.props.userId);
          this.getLogs(this.props.token)
          this.props.farmerInfo(this.props.token, this.props.userId)
          this.getFarmersProducts(this.props.token)
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.fetchFarm(newProps.token, newProps.userId);
            this.getLogs(newProps.token)
            this.props.farmerInfo(newProps.token, newProps.userId)
            this.getFarmersProducts(newProps.token)
          }
        }
      }


render() {
             
      const {data, logistics, products} = this.state;
      const {info, username,name, phone,address,image,verified} = this.props
      console.log(verified);
      console.log(data.user);

return (          
      <>  
            <div
                style={{paddingLeft:20}}
                 className="container mt-12">
                  
                  <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
                  <div className="shift20">
                          <div className="top-card">
                              
                          <div className="top-card-title">
                              <h3 className="top-card-title">
                                Account Type status: {verified ? <span>Verified</span> : <span>Pending verification</span>}
                              </h3>
                          </div>
                          </div>
                      </div>

                  <div className="shift20">
                      <div className="top-card">
                          
                      <div className="top-card-title">
                          <h3 className="top-card-title">
                            Inmpressions
                          </h3>
                      </div>
                        <div className="top-card-text">
                             
                        </div>
                      </div>
                  </div> 

                  <div className="shift20">
                      <div className="top-card">
                          
                      <div className="top-card-title">
                          <h3 className="top-card-title">
                            Product counts : {products.length}
                          </h3>
                      </div>
                      </div>
                  </div>

                  <div className="shift20">
                      <div className="top-card">
                          
                      <div className="top-card-title">
                          <h3 className="top-card-title">
                            Quotes
                          </h3>
                      </div>
                      </div>
                  </div>

                  </div>

                </div>   


               

                <div className="flex-container">
                    
                    <div className="shift20">
                    
                    <div className="snip1336 ">
                    <img src={data.profilePicture} alt="sample87" />
                    <figcaption>
                      <img src={data.profilePicture} alt="profile-sample4" className="profile" />
                      <h2>
                      {name}
                      </h2>
                      <ul>
                      <h2>
                      {address}
                      </h2>

                      <h2>
                      {phone}
                      </h2>
                      </ul>
                    <a s href="" className="follow">
                        Edit Profile
                      </a>
                      <a href="#" className="info">More Info</a>
                    </figcaption>
                  </div>
                      </div>
                      
                  
                    <div className="shift50">
               
                    <div className="">
                <TableContainer component={Paper}>
      <Table className="table"  aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

                    </div>
                   </div>
                </div> 
            </>
            
        )
    };

};

const mapStateToProps = state => {
    return {
      token: state.auth.token,
      userId: state.auth.userId,
      username: state.vendor.username,
      name:state.vendor.name,
      phone:state.vendor.phone,
      address:state.vendor.address,
      image:state.vendor.image,
      verified:state.vendor.verified,
      info: state.vendor.info
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      farmerInfo: (token, userId) => dispatch(information.FarmerDetails(token,userId))
    };
  };
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfileDashboard);
  