import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const loginUser = (user, dispatch) => {
    fetch(`https://tht-api.nutech-integrasi.app/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRzNRajhyYnFReU9nQ1J1TUtjLTBzRHNtOTBwWUg2Y0JmVDRidUJkNXRIVE5FNWZjeGFISkNnZVdZZ2tNQ2xoN242TERlbnZFYWpDT0V6WElaeDdUM01SWWtFamdSUmpOdDBoaFZJTlRHWkxZZDMzV0FneTRuRlZuVDRTc3czWHpUQVZoQ19hc1JNMW40ZC1rX2VhTDRnPT0iLCJpYXQiOjE2NjI3MjA5NDgsImV4cCI6MjU1NjExODc5OH0.6vqqgO7T7kEihDqlKxVRAvI6egXNBE3NyqwRei9WIT8';
            AsyncStorage.setItem('jwt', token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, user))
        } else {
            logoutUser(dispatch)
        }
    })
    .catch((err) => {
        Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Please provide correct credentials',
            text2: ''
        });
        logoutUser(dispatch)
    });
}

export const getUserProfile = (id) => {
    fetch(`https://tht-api.nutech-integrasi.app/getProfile${id}`, {
        method: 'GET',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem('jwt');
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}