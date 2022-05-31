import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const getOrderByStatus = async (status) => {
    try {
        let data = { status: status}
        let result = await api.post(Apis.GetOrderByStatus,data);
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

const getAllStatusOrder = async () => {
    try {
        let result = await api.get(Apis.GetAllStatusOrder);
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
export default {
    getOrderByStatus,
    getAllStatusOrder
};