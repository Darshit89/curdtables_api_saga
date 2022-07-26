import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deletePassanger,
  fetchAirline,
  fetchAllPassanger,
  fetchPassanger,
} from "./redux/actionCreation";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import queryString from "query-string";
import { confirm } from "react-confirm-box";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
console.log(process.env);

function Home() {
  const { allPassenger } = useSelector((state) => state);
  const { passanger } = useSelector((state) => state);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const parsed = { page: page, size: 10 };
  const stringified = queryString.stringify(parsed);

  useEffect(() => {
    dispatch(fetchPassanger(stringified));
  }, [parsed.page, dispatch]);
  useEffect(() => {
    dispatch(fetchAllPassanger());
  }, []);
  useEffect(() => {
    dispatch(fetchAirline());
  }, []);

  const PagginationHandler = (e) => {
    setPage(e.target.textContent);
  };

  const deleteHandler = async (_id) => {
    const result = await confirm("Are you sure?");
    if (result) {
      dispatch(deletePassanger(_id));
      return;
    }
  };
  const count = Math.floor(allPassenger.length / 10);

  return (
    <Container>
      <Box sx={{ textAlign: "right", m: 2 }}>
        <Link to="/addpassenger">
          <Button variant="contained">Add New Passenger</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Trips</StyledTableCell>
              <StyledTableCell align="left">Filght Name</StyledTableCell>
              <StyledTableCell align="left">Filght Id</StyledTableCell>
              <StyledTableCell align="left">Update</StyledTableCell>
              <StyledTableCell align="left">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passanger.map((user) => {
              const { _id, name, trips, airline } = user;
              return (
                <StyledTableRow key={_id}>
                  <StyledTableCell align="left">{name}</StyledTableCell>
                  <StyledTableCell align="left">{trips}</StyledTableCell>
                  <StyledTableCell align="left">
                    {airline[0].name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {airline[0].id}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Link to={`/updatepassenger/${_id}`}>
                      <Button variant="contained">update</Button>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      onClick={() => deleteHandler(_id)}
                      variant="outlined"
                      sx={{ color: "red", borderColor: "red" }}
                    >
                      delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} sx={{ margin: "10px " }}>
        <Pagination
          onChange={(e) => PagginationHandler(e)}
          count={count}
          color="primary"
        />
      </Stack>
    </Container>
  );
}

export default Home;
