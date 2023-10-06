import Axios from "./axios";
import {useContext} from "react";
import AuthContext from '../contexts/auth';
import Storage from '../global/storage';

const DashboardService = {
    async getDashboardData() {
        let context = await Storage.load({key: 'user'});
        Axios.defaults.headers['Authorization'] = 'Bearer ' + context.access_token;
        const response = await Axios.get(
            '/auth/dashboard');
        if (response !== undefined) {
            return response.data;
        }
        return undefined;
    }
};

export default DashboardService;
