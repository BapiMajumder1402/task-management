import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'
import LoadingPage from '../pages/loading/Loading';
import ProtectedRoute from '../utils/ProtectedRoutes';

const HomePage = lazy(() => import('../pages/homePage/HomePage'));
const TasksManagePage  = lazy(() => import('../pages/tasksManagePage/TasksManagePage'));
const LoginPage = lazy(() => import('../pages/loginPage/LoginPage'));
const RegisterPage = lazy(() => import('../pages/registerPage/RegisterPage'));

const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingPage/>}>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/manage-tasks" element={<ProtectedRoute><TasksManagePage/></ProtectedRoute>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
                <Footer/>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
