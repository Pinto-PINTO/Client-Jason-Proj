import '../App.css';
import AddBook from './Form';
import BooksList from './Table';
import { Container, Navbar, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function TableTag() {

    // State to grab the book id
    const [bookId, setBookId] = useState("");

    const getBookIdHandler = (id) => {
        console.log("The id of doc to be edited: ", id);
        setBookId(id);
    }

    return (

        <Container>
            <Row>
                <Col>
                    <BooksList getBookId={getBookIdHandler} />
                </Col>
            </Row>
        </Container>

    )
}

export default TableTag