import 'dotenv/config';
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED,
  MARK_NOTIFICATIONS_READ
} from '../types';
import axios from 'axios';

const { REACT_APP_URL_API } = process.env;

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${REACT_APP_URL_API}/login`, userData)
    .then(res => {
      setAuthorization(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/'); //redirect to the home page
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${REACT_APP_URL_API}/signup`, newUserData)
    .then(res => {
      setAuthorization(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/'); //redirect to the home page
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
    });
};

export const setAuthorization = token => {
  const fBIdToken = `Bearer ${token}`;
  localStorage.setItem('fBIdToken', fBIdToken);
  //seting authorization to the header axios
  axios.defaults.headers.common['Authorization'] = fBIdToken;
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('fBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`${REACT_APP_URL_API}/user`)
    .then(res => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch(err => console.log(err));
};

//upload image
export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post(`${REACT_APP_URL_API}/user/image`, formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

//edit your profile
export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post(`${REACT_APP_URL_API}/user`, userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post(`${REACT_APP_URL_API}/notifications`, notificationIds)
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));
};
