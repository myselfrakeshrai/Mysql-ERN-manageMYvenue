import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';
import { setCookie,getCookie, eraseCookie } from '../../../function';

const getUserLogin = async (data) => {
    try {
        let result = await api.post(Apis.GetUserLogin,data,{
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserRegister = async (data) => {
    try {
        let result = await api.post(Apis.GetUserRegsiter,data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getAllUserList = async () => {
    try {
        let result = await api.get(Apis.GetAllUserList);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetUserUpdate,data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getDeleteUserList = async (id) => {
    try {
        let result = await api.post(Apis.GetDeleteUserList,{
            id: id
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const authenticate = (user, next) => {
    if(typeof window !=="undefined"){
        setCookie('token', user.token, 30);
        setCookie('role', user.role, 30);
        next();
    }
};
const logout = ( next) => {
    if(typeof window !=="undefined"){
        eraseCookie('token');
        eraseCookie('role');
        eraseCookie('XSRF-token');
        window.location.reload();
        // window.location.href="/auth/login";
        // next();
    }
};

const isAuthenticate = ( next) => {
    if(typeof window !=="undefined"){
        return false
    }
    if(getCookie('token')){
        return JSON.stringify(getCookie('token'));
    }else{
        false
    }
};

export default {
    getUserLogin,
    getAllUserList,
    getUserUpdate,
    getDeleteUserList,
    authenticate,
    getUserRegister,
    logout,
    isAuthenticate
};