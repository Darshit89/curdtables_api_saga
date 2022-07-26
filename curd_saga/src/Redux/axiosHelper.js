import axios from 'axios';
import { notification } from 'antd';
import { store } from "./store";
import authActions from "../Redux/Auth/actions";

const BASE_URL = process.env.REACT_APP_API_URL;
/**
 * Gets the headers.
 *
 */
const getHeaders = () => {
  let authToken = localStorage.auth_token ? localStorage.auth_token : null;

  let config = {
    headers: {
      Accept: 'application/json'
    }
  };
  if (authToken) {
    config.headers.Authorization = 'Bearer ' + authToken;
  }

  return config;
};

const checkError = (error) => {
  if (error.response && error.response.data) {
    let { data } = error.response;
    if (data.error) {
    } else {
      notification['error']({
        message: data.message
      });
    }
  } else {
    notification['error']({
      message: error.message
    });
  }
  if (error.response) {
    if (error.response.status === 401) {
      store.dispatch(authActions.logout());
    }
  }
};

const successMessage = (message = 'Success') => {
  notification.success({
    message
  });
};

/**
 * Get call from Axios
 */
const axiosGet = async (url) => {
  try {
    return await axios.get(`${BASE_URL}/${url}`, getHeaders());
  } catch (error) {
    checkError(error);
    throw error.response.data;
  }
};
/**
 * Post request from axios
 */
const axiosPost = async (data, url) => {
  try {
    let request = await axios.post(`${BASE_URL}/${url}`, data, getHeaders());
    if (request.data && request.data.message) {
      await successMessage(request.data.message);
    }
    return request;
  } catch (error) {
    checkError(error);
    throw error.response.data;
  }
};

/**
 * Update request from axios.
 */
const axiosPut = async (data, url) => {
  try {
    let request = await axios.put(`${BASE_URL}/${url}`, data, getHeaders());

    if (request.data && request.data.message) {
      await successMessage(request.data.message);
    }
    return request;
  } catch (error) {
    checkError(error);
    throw error.response.data;
  }
};

/**
 * Save request from axios
 */
const axiosSave = async (oldTask, newTask, url) => {
  try {
    let request = await axios.put(
      `${BASE_URL}/${url}`,
      {
        id: oldTask.id,
        task: newTask
      },
      getHeaders()
    );
    if (request.data && request.data.message) {
      await successMessage(request.data.message);
    }
    return request;
  } catch (error) {
    checkError(error);
    throw error.response.data;
  }
};

/**
 * Delete call from axios
 */
const axiosDelete = async (url) => {
  let request = await axios.delete(`${BASE_URL}/${url}`, getHeaders());
  if (request.data && request.data.message) {
    await successMessage(request.data.message);
  }
  return request;
};

export { axiosGet, axiosPost, axiosDelete, axiosSave, axiosPut };
