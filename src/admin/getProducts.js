import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux";

import {productListURL} from '../constants'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class Products extends Component {

    state = {
        data: []
    }

    getFarmersProducts = (token) =>{
        this.setState({ loading: true });
        axios
          .get(productListURL)
          .then(res => {
            this.setState({ data: res.data, loading: false });
            console.log(this.state.data);
            
          }).catch(err => {
            this.setState({ error: err, loading: false });
            console.log(err);
            
          });
      }

      componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          this.getFarmersProducts(this.props.token)
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.getFarmersProducts(newProps.token)
          }
        }
      }


    render() {

      const  {data} = this.state

        return (
            <div>
            <TableContainer component={Paper}>
                    <Table className="table"  aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="">Farmer's username</TableCell>
                        <TableCell align="">Product Category</TableCell>
                        <TableCell align="">Product Price</TableCell>
                        <TableCell align="">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell component="th" scope="row">
                            {item.title}
                            </TableCell>
                            <TableCell align="">{item.user}</TableCell>
                            <TableCell align="">{item.category}</TableCell>
                            <TableCell align="">{item.price}</TableCell>
                            <TableCell align="">{item.phone}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
