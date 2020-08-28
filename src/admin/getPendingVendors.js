import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux";

import {pendingVendors} from '../constants'
 
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class PendingFarmers extends Component {

    state = {
        data: []
    }
    
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

      
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          this.fetchFarmers(this.props.token);
 
        }
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.fetchFarmers(newProps.token);
          }
        }
    }

    render() {

        const {data} = this.state
        console.log(data);

        return (
            <div className="container mx-auto my-10">
                
<TableContainer component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow className="bg-black ">
            <TableCell className="text-white"><span className="text-white"> Name </span></TableCell>
            <TableCell className="text-white" align="right"><span className="text-white">Phone</span></TableCell>
            <TableCell className="text-white" align="right"><span className="text-white">Username</span></TableCell>
         </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <a href={`/pending/${row.id}`}>{row.user}</a>
              </TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      token: state.auth.token,
      userId: state.auth.userId,
    };
  };
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       farmerInfo: (token, userId) => dispatch(information.FarmerDetails(token,userId))
//     };
//   };
  
  
  export default connect(
    mapStateToProps,
    null
  )(PendingFarmers);