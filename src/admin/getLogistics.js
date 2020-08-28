import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux";
import {AdminLogistics} from '../constants'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class Logistics extends Component {

    getLogistics = (token) =>{
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios
          .get(AdminLogistics)
          .then(res => {
            this.setState({ logistics: res.data, loading: false });
          }).catch(err => {
            this.setState({ error: err, loading: false });
            console.log(err);
            
          });
      }

      componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          this.getLogistics(this.props.token)
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.getLogistics(newProps.token)
          }
        }
      }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logistics