import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function OrderDetailTable(props) {
  const classes = useStyles();
  console.log(props.aff);

  const row = props.orderData
  return (

      <>
      <div>
          <h2>Orders </h2> <hr />
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Product </TableCell>
            <TableCell align="left">Weight(Tonnes)</TableCell>
            <TableCell align="left">Cost</TableCell>
  
            <TableCell align="left">Port Type</TableCell>
            <TableCell align="left">Port Location</TableCell>
            <TableCell align="left">Delivery Before</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.theBuyer}
              </TableCell>
              <TableCell align="left">{row.theProduct}</TableCell>
              <TableCell align="left">{row.Weight}<sub>
                Tn
                </sub></TableCell>
              
              <>
                {
                  row.updatedCost ? (
                    <TableCell align="left"> ₦{row.Cost}</TableCell>
                  ) : (
                    <TableCell align="left">
                      Pending Review
                    </TableCell>
                  )
                }
              </>

              <TableCell align="left">{row.PortType}</TableCell>
              <TableCell align="left">{row.PortLocation}</TableCell>
              <TableCell align="left">{row.DeliveryDate}</TableCell>
              
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      </>

  );
}
