import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addPassanger } from "./redux/actionCreation";

function Addpassenger() {
  const dispatch = useDispatch();
  const [addData, setaddData] = useState({
    name: "",
    trips: "",
    airline: "",
  });
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setaddData({
      ...addData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    dispatch(addPassanger(addData));
    navigate("/");
    setaddData({});
    e.preventDefault();
  };
  return (
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ backgroundColor: "#1976d2", color: "white" }}
      >
        Add New Passenger
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Paper sx={{ p: 5 }}>
          <Box>
            <TextField
              sx={{ m: 2 }}
              fullWidth
              id="outlined-basic"
              label="Name"
              type="text"
              name="name"
              value={addData.name}
              variant="outlined"
              onChange={handlerChange}
            />
            <TextField
              sx={{ m: 2 }}
              fullWidth
              id="outlined-basic"
              label="Trips"
              type="text"
              name="trips"
              value={addData.trips}
              variant="outlined"
              onChange={handlerChange}
            />
            <TextField
              sx={{ m: 2 }}
              fullWidth
              id="outlined-basic"
              label="Airline Number"
              type="text"
              name="airline"
              value={addData.airline}
              variant="outlined"
              onChange={handlerChange}
            />
          </Box>
        </Paper>
        <Box sx={{ textAlign: "right", m: 2 }}>
          <Link to="/">
            <Button
              variant="outlined"
              sx={{ color: "red", borderColor: "red", margin: 2 }}
            >
              Exit
            </Button>
          </Link>
          <Button type="submit" variant="contained">
            Add New Passenger
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Addpassenger;
