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



export default function VendorListTable(props) {
  const classes = useStyles();
  console.log(props.aff);

  const data = props.vendorListData
  return (

      <>
      <div>
          <h2>Vendor list</h2> <hr />
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Business Name</TableCell>
            <TableCell align="left">Email</TableCell>

            <TableCell align="left">Phone </TableCell>
            <TableCell align="left">Warehouse Location </TableCell>
            <TableCell align="left"> Verification Status  </TableCell>
            <TableCell align="left"> Date Joined </TableCell>
            <TableCell align="left">Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
             
              <TableCell align="left">{row.user}</TableCell>
              <TableCell align="left">{row.BusinessName}</TableCell>
              <TableCell align="left">{row.Email}</TableCell>
              <TableCell align="left">{row.Phone}</TableCell>
              <TableCell align="left">{row.WareHouseBase}</TableCell>
              <TableCell align="left">
              {
                row.Verified ? (
                  <>
                  <p className="completed-task">
                    Completed Verification
                  </p>
                  </>
                ) : (
                  <>
                     <p className="unCompleted-task">
                    Pending Verification
                  </p>   
                  </>
                )
              }
              </TableCell>
              
              <TableCell align="left">{row.DateCreated}</TableCell>
              <TableCell align="left">
                <Link to={`/admin/vendor-details-control/${row.id}/`}>
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
