import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        authen : false
    };
};

export const authSuccess = (email, fullname, username, group, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        email: email,
        fullname: fullname,
        username: username,
        group: group,
        id : id,
        authen : true
    };
};


export const auth = () => {
    return (dispatch) => {
        let email = localStorage.getItem('email'),
            token = localStorage.getItem('token');
        if (!!email && !!token) {
             axios.get('/users/')
                .then(response => {
                    const data = response.data[0];
                    dispatch(authSuccess(data.email,
                        `${data.first_name} ${data.last_name}`,
                                data.username,
                                data.groups[0],
                                data.id));})
                .catch(error => {
                dispatch(authFail(error = error.response.data))
            });
        } else {
            dispatch(authFail(null))
        }


    };
};