import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'

const HomePage = lazy(() => import('../pages/homePage/HomePage'));


const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<>Loading</>}>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
                <Footer/>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
