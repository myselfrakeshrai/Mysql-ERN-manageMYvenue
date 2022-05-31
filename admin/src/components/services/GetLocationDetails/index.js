import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const getLocation = async (name,status) => {
    try {
        // data.date = moment().format();
        let data = {name: name, status:status}
        let result = await api.post(Apis.GetAllLocationCreate,data);
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
const getLocationList = async () => {
    try {
        let result = await api.get(Apis.GetAllLocationList);
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
const getLocationDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetLocationDeleteById,{params: {id}});
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

const getLocationUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetLocationUpdate,data);
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

// area api 
const getAreaList = async () => {
    try {
        let result = await api.get(Apis.GetAllAreaList);
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

const createAreaList = async (data) => {
    try {
        let result = await api.post(Apis.CreateAreaList,data);
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

const getAreaDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetAreaDeleteById,{params: {id}});
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

const getareaUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetAreaUpdate,data);
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
const getAllAreaByLocation = async (id) => {
    try {
        let result = await api.get(Apis.GetAllAreaByLocation+ `${id}`);
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

export default {
    getLocation,
    getLocationList,
    getLocationDeleteById,
    getLocationUpdate,
    createAreaList,
    getAreaList,
    getAreaDeleteById,
    getareaUpdate,
    getAllAreaByLocation
};