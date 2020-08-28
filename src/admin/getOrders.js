import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux";
import {PendingOrders} from '../constants'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class Orders extends Component {
    
    state = {
        pData: [],
        dData: []
    }

    getPendingOrders = (token) =>{
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios
          .get(PendingOrders)
          .then(res => {
            this.setState({ pData: res.data, loading: false });
            console.log(res.data);
            
          }).catch(err => {
            this.setState({ error: err, loading: false });
            console.log(err);
            
          });
      }

      getDeliveredOrders = (token) =>{
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios
          .get(PendingOrders)
          .then(res => {
            this.setState({ dData: res.data, loading: false });
            console.log(res.data);
            
          }).catch(err => {
            this.setState({ error: err, loading: false });
            console.log(err);
            
          });
      }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
