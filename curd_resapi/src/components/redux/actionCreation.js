import axios from "axios";

import {
  GET_AIRLINE,
  GET_PASSENGER,
  SELECT_DATA,
  PASSENGER_UPDATE,
  GET_ALLPASSENGER,
  PASSENGER_ADD,
  PASSENGER_DELETE,
} from "./actionType";

const getPassenger = (passenger) => ({
  type: GET_PASSENGER,
  payload: passenger,
});
const getAllPassenger = (passengerData) => ({
  type: GET_ALLPASSENGER,
  payload: passengerData,
});
const getAirline = (airlineData) => ({
  type: GET_AIRLINE,
  payload: airlineData,
});
const getSelectdata = (id) => ({ type: SELECT_DATA, payload: id });
const passengerAdd = () => ({ type: PASSENGER_ADD });
const passengerUpdate = () => ({ type: PASSENGER_UPDATE });
const passengerDelete = () => ({ type: PASSENGER_DELETE });
const baseurl = process.env.REACT_APP_URL;

export const fetchAllPassanger = () => {
  return (dispatch) => {
    axios
      .get(`${baseurl}/passenger`)
      .then((response) => {
        const passenger = response.data.data;
        dispatch(getAllPassenger(passenger));
      })
      .catch((err) => console.error(err));
  };
};

export const fetchPassanger = (stringified) => {
  window.value = stringified;
  return async (dispatch) => {
    const response = await axios.get(`${baseurl}/passenger?${stringified}`);
    const passengerData = response.data.data;
    dispatch(getPassenger(passengerData));
  };
};

export const fetchAirline = () => {
  return (dispatch) => {
    axios
      .get(`${baseurl}/airlines`)
      .then((response) => {
        const airlineData = response.data;
        dispatch(getAirline(airlineData));
      })
      .catch((err) => console.error(err));
  };
};

export const addPassanger = (data) => {
  return async (dispatch) => {
    const response = await axios.post(`${baseurl}/passenger`, data);
    if (response.status === 200) {
      dispatch(fetchPassanger(window.value));
      dispatch(passengerAdd());
      alert("Add sucessfully");
    } else {
      alert("somthing worng");
    }
  };
};

export const fetchSeclcteddata = (id) => {
  return (dispatch) => {
    axios
      .get(`${baseurl}/passenger/${id}`)
      .then((response) => {
        const selectedata = response.data;
        dispatch(getSelectdata(selectedata));
      })
      .catch((err) => console.error(err));
  };
};

export const updatePassanger = (id, data) => {
  return async (dispatch) => {
    const response = await axios.put(`${baseurl}/passenger/${id}`, data);
    if (response.status === 200) {
      dispatch(fetchPassanger(window.value));
      dispatch(passengerUpdate());
      alert("update sucessfully");
    } else {
      alert("somthing worng");
    }
  };
};

export const deletePassanger = (id) => {
  return async (dispatch) => {
    const response = await axios.delete(`${baseurl}/passenger/${id}`);
    if (response.status === 200) {
      dispatch(fetchPassanger(window.value));
      dispatch(passengerDelete());
      alert("delete sucessfully");
    } else {
      alert("somthing worng");
    }
  };
};
