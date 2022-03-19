import '../App.css';
import AddBook from './Form';
import { Container, Navbar, Row, Col, Nav, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from '../Util/UserAuthContext';

function FormTag() {

    // State to grab the book id
    const [bookId, setBookId] = useState("");

    const getBookIdHandler = (id) => {
        console.log("The id of doc to be edited: ", id);
        setBookId(id);
    }

    // Handling Logout
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
    // const scrollToTop = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     });
    // };

    return (

        <div className='backdrop'>
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
                            <Link to="/home" className="btn btn-primary mr-2 nav-component nav-link-btn">Home</Link>
                            {/* <Button className="btn btn-primary mr-2 nav-component nav-link-btn" onClick={scrollToTop}>UP</Button> */}
                            {/* <Button onClick={handleLogout} className="nav-component"><i className="bi bi-box-arrow-left"></i> Logout</Button> */}
                            <i onClick={handleLogout} className="bi bi-box-arrow-left nav-component nav-logout" style={{ fontSize: 22 }}></i>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* ------------- Navigation Bar END ------------- */}


            <div className='d-flex justify-content-center align-items-center'>

                <AddBook id={bookId} setBookId={setBookId} />

            </div>

        </div>

    )
}

export default FormTag