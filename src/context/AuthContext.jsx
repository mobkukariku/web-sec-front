import { createContext, useContext, useState, useEffect } from 'react';
import {authAPI} from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem('token')
    );
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Проверяем токен при загрузке
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // Декодируем токен для получения userId (базовая проверка)
            try {
                const payload = JSON.parse(atob(storedToken.split('.')[1]));
                setUserId(payload.userId);
            } catch (e) {
                // Если токен невалидный, удаляем его
                localStorage.removeItem('token');
                setToken(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const result = await authAPI.login(email, password);
        if (result.token) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.userId);
            setToken(result.token);
            setUserId(result.userId);
        }
        return result;
    };

    const register = async (name, email, password) => {
        const result = await authAPI.register(name, email, password);
        if (result.token) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.userId);
            setToken(result.token);
            setUserId(result.userId);
        }
        return result;
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setToken(null);
        setUserId(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ 
            token, 
            userId, 
            isAuthenticated,
            loading,
            login, 
            logout, 
            register 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
