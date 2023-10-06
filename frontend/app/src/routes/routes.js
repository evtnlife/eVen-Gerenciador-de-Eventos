import React, {useContext} from 'react';
import AuthContext from '../contexts/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import Storage from '../global/storage';

export const Routes = () => {
    const {signed, context, setContext} = useContext(AuthContext);
    try {
        Storage.load({
            key: 'user'
        })
        .then(ret => {
            setContext(ret);
        })
        .catch(err => {

            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    Storage.remove({
                        key: 'user'
                    });
                    break;
            }
        });
    } catch (e) {
        console.log(e);
    }
    return (context.access_token !== '' ? <AppRoutes/> : <AuthRoutes/>);
};
export default Routes;
