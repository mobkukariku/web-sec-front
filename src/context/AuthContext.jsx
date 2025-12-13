import { createContext, useContext, useState } from 'react';
import {authAPI} from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(
        localStorage.getItem('userId')
    );

    const login = async (email, password) => {

        const result = await authAPI.login(email, password);
        localStorage.setItem('userId', result.userId);

        setUserId(result.userId);

        return result;
    };

    const logout = () => {
        localStorage.removeItem('userId');

        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
