import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authSlice';
import './Nav.css';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowOffcanvas(false);
    navigate('/');
  };

  useEffect(() => {
    setShowOffcanvas(false);
  }, [location]);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/" className="logo">Task Manage App</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShowOffcanvas} />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showOffcanvas}
            onHide={handleCloseOffcanvas}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel" className='logo'>Task Manage App</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto links">
                <NavLink to="/" className="navLink" onClick={handleCloseOffcanvas}>Home</NavLink>
                <NavLink to="/manage-tasks" className="navLink" onClick={handleCloseOffcanvas}>Manage Blogs</NavLink>
                {user ? (
                  <>
                    <span className="navLink">Welcome, {user.fullName}</span>
                    <Button variant="outline-danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className="navLink" onClick={handleCloseOffcanvas}>Login</NavLink>
                    <NavLink to="/register" className="navLink" onClick={handleCloseOffcanvas}>Register</NavLink>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default React.memo(AppNavbar);
