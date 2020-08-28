import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import ProductList from '../shop/OrderSummary'
import { farmerlist, productListURL, AdminLogistics, pendingVendors } from "../constants";
import axios from "axios";
import { connect } from "react-redux";
import * as information from "../store/actions/vendor"

import ProductAnalysisReport from './comps/analysis'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TemporaryDrawer from './sideBar'

import { Statistic, Row, Col, Button, Card , Descriptions, Avatar} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, LikeOutlined,ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const { Meta } = Card;


class AdminBase extends Component {
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
    
      fetchFarmers = (token) =>{
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios
          .get(pendingVendors)
          .then(res => {
            this.setState({ data: res.data, loading: false });
            console.log(res.data);
            
          }).catch(err => {
            this.setState({ error: err, loading: false });
            console.log(err);
            
          });
      }

      getFarmersProducts = (token) =>{
        this.setState({ loading: true });
        axios
          .get(productListURL)
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
          this.fetchFarmers(this.props.token);
          this.getFarmersProducts(this.props.token)
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.fetchFarmers(newProps.token);
            this.getFarmersProducts(newProps.token)
          }
        }
      }

render() {
      const {data, logistics, products} = this.state;
      console.log(data);
      console.log(logistics);
      console.log(products);
      
      const {info, username,name, phone,address,image,verified} = this.props
      
return (
        <>
        <TemporaryDrawer />
                
    <div className="container mx-auto">
        <div className="grid grid-cols-6 gap-4 items-stretch">

          <div className=" col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-2 xl:col-span-2">

          <div class="max-w-sm flex p-6 rounded-lg shadow-md mt-12">

              <div class="">
                  <h4 class="text-base">Logged in as: {username}</h4>
              </div>
            </div>
          </div>

        <div className="col-span-2 sm:col-span-3 md:col-span-6 lg:col-span-2 xl:col-span-2">
          <div class="max-w-sm flex p-6 rounded-lg shadow-md mt-12">
              <div class="">
                  <p class="text-"> Products count: {products.length} </p>
              </div>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-2">
        <div class="max-w-sm flex p-6 rounded-lg shadow-md mt-12">
            <div class="">
              <h4 class="text-base "> You have {data.length} pending account</h4>
            </div>
          </div>
        </div>


        <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
                <div className="">
                <ProductAnalysisReport />
                </div>
        </div>

        </div>

          </div>

        </>
        )
    }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    username: state.auth.username
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
)(AdminBase);
