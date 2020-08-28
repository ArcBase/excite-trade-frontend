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



export default function VendorProductsListTable(props) {
  const classes = useStyles();
  console.log(props.aff);

  const data = props.productList
  return (

      <>
      <div>
          <h2>Vendor list</h2> <hr />
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Product Name</TableCell>
            <TableCell align="left">Category</TableCell>

            <TableCell align="left">Date Uploaded </TableCell>

            <TableCell align="left">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
             
              <TableCell align="left">{row.Name}</TableCell>
              <TableCell align="left">{row.ProductCategory}</TableCell>
              <TableCell align="left">{row.PostDate}</TableCell>
             
              <TableCell align="left">
                <Link to={`/vendor/products-detail/${row.id}/`}>
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
