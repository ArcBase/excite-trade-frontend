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

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function OrderTable(props) {
  const classes = useStyles();

  return (

      <>
      <div>
          <h2>My Orders</h2> <hr />
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Product Name</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Weight</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.theProduct}
              </TableCell>
          <TableCell align="left">{row.Quantity}</TableCell>
          <TableCell align="left">{row.Weight}</TableCell>
          <TableCell align="left">{row.DeliveryDate}</TableCell>
              <TableCell align="left">
                <Link to={`/buyer-detail/${row.id}`}>
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
