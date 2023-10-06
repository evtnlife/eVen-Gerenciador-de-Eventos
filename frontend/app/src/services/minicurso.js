import Axios from "./axios";
import {useContext} from "react";
import AuthContext from '../contexts/auth';
import Storage from '../global/storage';

const MinicursoService = {
    async getMeusMinicursos() {
        let context = await Storage.load({key: 'user'});
        Axios.defaults.headers['Authorization'] = 'Bearer ' + context.access_token;
        const response = await Axios.get(
            '/auth/course/my_courses');
        if (response !== undefined) {
            return response.data;
        }
        return undefined;
    },
    async create(data) {
        let context = await Storage.load({key: 'user'});
        Axios.defaults.headers['Authorization'] = 'Bearer ' + context.access_token;
        const response = await Axios.post(
            '/auth/course/store', data);
        if (response !== undefined) {
            return response.data;
        }
        return undefined;
    },
    async edit(data) {
        let context = await Storage.load({key: 'user'});
        Axios.defaults.headers['Authorization'] = 'Bearer ' + context.access_token;
        const response = await Axios.post(
            '/auth/course/update', data);
        if (response !== undefined) {
            return response.data;
        }
        return undefined;
    },
    async getAll() {
        let context = await Storage.load({key: 'user'});
        Axios.defaults.headers['Authorization'] = 'Bearer ' + context.access_token;
        const response = await Axios.get(
            '/auth/course/available_courses');
        if (response !== undefined) {
            return response.data;
        }
        return undefined;
    },
    async inscrever(data) {
        let context = await Storage.load({key: 'user'});
        Axios.defaults.headers['Authorization'] = 'Bearer ' + context.access_token;
        console.log(context);
        const response = await Axios.post('/auth/course/subscribe', data);
        if (response !== undefined) {
            return response.data;
        }
        return undefined;
    }
};

export default MinicursoService;
