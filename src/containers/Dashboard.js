import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import ProductList from '../shop/OrderSummary'
import { farmerlist } from "../constants";
import axios from "axios";
import { connect } from "react-redux";
import * as information from "../store/actions/vendor"

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Dashboard extends Component {
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
    
      fetchFarm = (token) =>{
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios
          .get('https://trade-backn.herokuapp.com/api/f-list/')
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
          this.fetchFarm(this.props.token);
          this.getLogs(this.props.token)
          this.props.farmerInfo(this.props.token, this.props.userId)
          this.getFarmersProducts(this.props.token)
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.fetchFarm(newProps.token);
            this.getLogs(newProps.token)
            this.props.farmerInfo(newProps.token, newProps.userId)
            this.getFarmersProducts(newProps.token)
          }
        }
      }


      createData =(name, calories, fat, carbs, protein) => {
        return { name, calories, fat, carbs, protein };
      }
      
render() {
      const {data, logistics, products} = this.state;
      const {info, username,name, phone,address,image,verified} = this.props
      // const useStyles = makeStyles({
      //   table: {
      //     minWidth: 650,
      //   },
      // });
      

      function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
      
return (
        <>
    <div className="grid grid-cols-6 gap-4 items-stretch">

    <div className=" col-span-2 sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2">

    <div class="max-w-sm flex p-6 bg-black sm:mx-auto rounded-lg shadow-md mt-12">
      <div class="flex-shrink-0">
         <img src="https://i.ibb.co/vX8pYzZ/logo-only.png" alt="" class="h-12 w-12" />

      </div>
        <div class="">
            <h4 class="text-xl text-white">Account details <hr/> </h4>
            <p class="text-base text-white">Name: {name}</p>
            <p class="text-base text-white">Location: {address} </p>
            <p class="text-base text-white">Phone: {phone} </p>
            <p class="text-base text-white">Acc Status: { verified ? <span> Verified Account. </span> : <span className="text-danger">Pending verification</span> }</p>
        </div>
      </div>
    </div>
 
    <div className="col-span-2 sm:col-span-6 md:col-span-6 lg:col-span-2 xl:col-span-2">
    <div class="max-w-sm flex p-6 bg-black sm:mx-auto rounded-lg shadow-md mt-12">
      <div class="flex-shrink-0">
         <img src="https://i.ibb.co/vX8pYzZ/logo-only.png" alt="" class="h-12 w-12" />

      </div>
        <div class="">
            <h4 class="text-xl text-white"> Products count: {products.length} </h4>
        </div>
      </div>
    </div>

 
    <div className="col-span-2 sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-2">
    <div class="max-w-sm flex p-6 bg-black sm:mx-auto rounded-lg shadow-md mt-12">
      <div class="flex-shrink-0">
         <img src="https://i.ibb.co/vX8pYzZ/logo-only.png" alt="" class="h-12 w-12" />

      </div>
        <div class="">
            <h4 class="text-xl text-white">Account details <hr/> </h4>
            <p class="text-base text-white">Location: James Doe</p>
            <p class="text-base text-white">Location: 10, Samson street, Maryland Lagos</p>
            <p class="text-base text-white">Phone: 09035820022</p>
            <p class="text-base text-white">Acc Status: <span>Pending verification</span></p>
        </div>
      </div>
    </div>

  <div className="my-10 col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">

  <TableContainer component={Paper}>
      <Table className="table"  aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </div>

  {/*  */}
    </div>
     

        </>
        )
    }
}

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
)(Dashboard);
