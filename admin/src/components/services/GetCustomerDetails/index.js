import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const getAllCustomerList = async () => {
    try {
        let result = await api.get(Apis.GetAllCustomerDetails);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCustomerDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetCustomerDeleteById,{params: {id}});
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
    getAllCustomerList,
    getCustomerDeleteById
};