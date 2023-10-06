import Axios from "./axios";

const AuthService = {
    async signIn(data) {
        const response = await Axios.post(
            '/auth/login', data
        );
        if (response !== undefined) {
            return response.data;
        }
        return undefined;
    }
};

export default AuthService;
