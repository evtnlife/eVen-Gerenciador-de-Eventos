import React, {createContext, useEffect, useState} from 'react';
const AuthContext = createContext(
    {
        access_token: '',
        token_type: 'bearer',
        expires_in: 3600,
        user: {
            id: 1,
            matricula: '',
            name: '',
            email: '',
            email_verified_at: null,
            created_at: '',
            updated_at: ''
        }
    }
);

export const AuthProvider = ({children}) => {
    const [signed, setSigned] = useState(false);
    const [context, setContext] = useState({
        access_token: '',
        token_type: 'bearer',
        expires_in: 3600,
        user: {
            id: 1,
            matricula: '',
            name: '',
            email: '',
            email_verified_at: null,
            created_at: '',
            updated_at: ''
        }
    });

    return (
        <AuthContext.Provider value={{signed, context, setContext}} >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;
