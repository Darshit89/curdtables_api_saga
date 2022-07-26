import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSeclcteddata, updatePassanger } from "./redux/actionCreation";

function UpdatePassenger() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { airline } = useSelector((state) => state);
  const { selecteData } = useSelector((state) => state);
  const [updateData, setupdateData] = useState({});
  const navigate = useNavigate();
  const data = {
    name: selecteData.name,
    trips: selecteData.trips,
    airline: selecteData.airline && selecteData.airline[0].id,
  };

  useEffect(() => {
    dispatch(fetchSeclcteddata(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selecteData) {
      setupdateData({ ...data });
    }
  }, [selecteData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setupdateData({
      ...updateData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassanger(id, updateData));
    navigate("/");
  };
  return (
    <Container sx={{ m: "auto", p: 3 }}>
      <Typography
        variant="h4"
        sx={{ backgroundColor: "#1976d2", color: "white" }}
      >
        Update Passenger
      </Typography>
      <form>
        <Paper sx={{ p: 5 }}>
          <Box>
            <TextField
              sx={{ m: 2 }}
              fullWidth
              id="outlined-basic"
              label="Name"
              name="name"
              type="text"
              value={updateData.name || " "}
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              sx={{ m: 2 }}
              fullWidth
              name="trips"
              id="outlined-basic"
              label="Trips"
              value={updateData.trips || " "}
              variant="outlined"
              onChange={handleChange}
            />
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Airline
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name="airline"
                value={updateData.airline || ""}
                label="Airline"
                onChange={handleChange}
              >
                {airline.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Update Passenger
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default UpdatePassenger;
