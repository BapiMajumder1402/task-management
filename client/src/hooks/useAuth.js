import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/authSlice';

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const loginUser = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, values);
            toast.success(`Login Successful! Welcome ${response.data.data.user.fullName}`);
            dispatch(login({
                user: response.data.data.user,
                accessToken: response.data.data.accessToken,
            }));
            localStorage.setItem('token', response.data.data.accessToken);
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed!');
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`, values);
            toast.success('Registration successful! You can now log in.');
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed!');
        } finally {
            setLoading(false);
        }
    };

    return { loginUser, registerUser, loading };
};

export default useAuth;
