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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function OrderList(props) {
  const classes = useStyles();
  console.log(props.aff);

  const data = props.orderListData
  return (

      <>
      <div>
          <h2>Client Orders</h2> <hr />
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Product </TableCell>
            <TableCell align="left">Weight</TableCell>

            <TableCell align="left">Port Type</TableCell>
            <TableCell align="left">Port Location</TableCell>
            <TableCell align="left">Delivery Before</TableCell>
            <TableCell align="left">Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.theBuyer}
              </TableCell>
              <TableCell align="left">{row.theProduct}</TableCell>
              <TableCell align="left">{row.Weight}</TableCell>
              <TableCell align="left">{row.PortType}</TableCell>
              <TableCell align="left">{row.PortLocation}</TableCell>
              <TableCell align="left">{row.DeliveryDate}</TableCell>
              <TableCell align="left">
                <Link to={`/orders-detailView/${row.id}/`}>
                  Open 
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </>

  );
}
