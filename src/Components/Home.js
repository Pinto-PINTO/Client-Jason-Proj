import React from "react";
import { Button, Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap-icons/font/bootstrap-icons.css";
import FormTag from "./FormTag";
import TableTag from "./TableTag";
import Filter from "./Filter";
import { useNavigate } from "react-router";
import { useUserAuth } from '../Util/UserAuthContext';
import { Link } from "react-router-dom";
import '../App.css';

export default function Home() {

  // Handling Logout Field
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Scroll to Top Implementation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  return (
    <div className="home-wrapper">
      {/* ------------- Navigation Bar START ------------- */}
      <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Navbar.Text className="nav-component nav-user-name">
                <b>Signed as: </b> {user.email}
              </Navbar.Text>
              <Link to="/form" className="btn btn-primary mr-2 nav-component nav-link-btn">Form</Link>
              <Button className="btn btn-primary mr-2 nav-component nav-link-btn" onClick={scrollToTop}>UP</Button>
              {/* <Button onClick={handleLogout} className="nav-component"><i className="bi bi-box-arrow-left"></i> Logout</Button> */}
              <i onClick={handleLogout} className="bi bi-box-arrow-left nav-component nav-logout" style={{ fontSize: 22 }}></i>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* ------------- Navigation Bar END ------------- */}

      <div>
        <TableTag />
      </div>

    </div>
  )
}
