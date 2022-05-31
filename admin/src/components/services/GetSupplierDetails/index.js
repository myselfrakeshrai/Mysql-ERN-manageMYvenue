import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const createSupplierList = async (data) => {
    try {
        let result = await api.post(Apis.CreateSupplierList,data);
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

const createSupplierProductList = async (data) => {
    try {
        let result = await api.post(Apis.CreateSupplierProduct,data);
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


const getAllSellerList = async () => {
    try {
        let result = await api.get(Apis.GetAllSellerList);
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

const getUpdateSellerList = async (data) => {
    try {
        let result = await api.post(Apis.GetUpdateSellerList,data);
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

const getDeleteSellerList = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteSellerList,{params: {id}});
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
    createSupplierList,
    createSupplierProductList,
    getAllSellerList,
    getUpdateSellerList,
    getDeleteSellerList
};