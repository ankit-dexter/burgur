import * as actionType from './actionTypes';
import axios from 'axios';

export const setAuthRedirectPath = (path) => {
    return {
        type : actionType.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}


export const authStart = () => {
    return {
        type : actionType.AUTH_START
    }
}

export const authSuccess = (userId,idToken) => {
    return {
        type : actionType.AUTH_SUCCESS,
        userId : userId,
        idToken : idToken
    }
}

export const authFail = (error) => {
    return {
        type : actionType.AUTH_FAIL,
        error : error
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    //console.log('[ LOGOUT ACTION ]');
    return {
        type : actionType.LOG_OUT
    }
}

export const checkAuthTimeOut = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
            //
        },3600 * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email : email,
            password :password
        }
        let url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhQUyToZdYlYkHbl5_AjI2sKp2m2kq6JA';
        if(!isSignUp){
            //console.log('[ SIGN IN ]' , isSignUp);
            url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhQUyToZdYlYkHbl5_AjI2sKp2m2kq6JA'
        }
        axios.post(url,authData)
        .then(response => {
            const expirationtime = new Date(new Date().getTime() + (3600 * 1000));
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationTime', expirationtime);
            localStorage.setItem('userId',response.data.localId);
           // console.log(response);
            dispatch(authSuccess(response.data.localId,response.data.idToken));
            dispatch(checkAuthTimeOut())
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    }
}

export const checkValidAuthantication = (token) => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logOut());
        }
        else {
            const expirationTime= new Date(localStorage.getItem('expirationTime'));
            if(expirationTime < new Date()){
                dispatch(logOut());
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(userId,token));
                dispatch(checkAuthTimeOut(expirationTime.getTime()- new Date()));
            }
        }
    }
}