import {
  GET_AIRLINE,
  GET_ALLPASSENGER,
  GET_PASSENGER,
  PASSENGER_ADD,
  PASSENGER_DELETE,
  PASSENGER_UPDATE,
  SELECT_DATA,
} from "./actionType";

const initialState = {
  allPassenger: [],
  passanger: [],
  airline: [],
  selecteData: {},
};

const passengerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALLPASSENGER:
      return { ...state, allPassenger: payload };
    case GET_PASSENGER:
      return { ...state, passanger: payload };
    case GET_AIRLINE:
      return { ...state, airline: payload };
    case SELECT_DATA:
      return { ...state, selecteData: { ...payload } };
    case PASSENGER_ADD:
    case PASSENGER_UPDATE:
    case PASSENGER_DELETE:
      return { ...state };
    default:
      return state;
  }
};

export default passengerReducer;
