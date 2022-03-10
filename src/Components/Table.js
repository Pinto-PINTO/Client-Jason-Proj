import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Container, InputGroup } from "react-bootstrap";
import '../App.css';
import BookDataService from "../Util/BookDataContext";

// Imports from MUI
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

// MUI Imports
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';



const BooksList = ({ getBookId }) => {

    // State to store all book records as an array
    const [books, setBooks] = useState([]);

    // States
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");


    // Filter States
    const [companyName, setcompanyName] = useState("");
    const [city, setcity] = useState("");
    const [district, setdistrict] = useState("");
    const [street, setstreet] = useState("");
    const [postalCode, setpostalCode] = useState("")
    const [lastDoc, setlastDoc] = useState();


    // Edit States
    const [ename, setEName] = useState("");
    const [edescription, setEDescription] = useState("");
    const [econtact, setEContact] = useState("");
    const [eemail, setEEmail] = useState("");
    const [ecategory, setECategory] = useState("");
    const [esubCategory, setESubCategory] = useState("");
    const [ehouseNo, setEHouseNo] = useState("");
    const [estreet, setEStreet] = useState("");
    const [edistrict, setEDistrict] = useState("");
    const [ecity, setECity] = useState("");
    const [epostalCode, setEPostalCode] = useState("");
    const [enotes, setENotes] = useState("");

    const [currentId, setCurrentId] = useState("");

    // MUI
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // Handling Edit
    const handleEditClick = async (id) => {
        const docSnap = await BookDataService.getBook(id);
        console.log("the record is here:", docSnap.data());
        setEName(docSnap.data().name);
        setEDescription(docSnap.data().description);
        setEContact(docSnap.data().contact);
        setEEmail(docSnap.data().email);
        setECategory(docSnap.data().category);
        setESubCategory(docSnap.data().subCategory);
        setEHouseNo(docSnap.data().houseNo);
        setEStreet(docSnap.data().street);
        setEDistrict(docSnap.data().district);
        setECity(docSnap.data().city);
        setEPostalCode(docSnap.data().postalCode);
        setENotes(docSnap.data().notes);

    }


    const handleEdit = async () => {

        const newBook = {
            name: ename,
            description: edescription,
            contact: econtact,
            email: eemail,
            category: ecategory,
            subCategory: esubCategory,
            houseNo: ehouseNo,
            street: estreet,
            district: edistrict,
            city: ecity,
            postalCode: epostalCode,
            notes: enotes,
        };

        console.log(currentId);

        console.log(newBook);
        await BookDataService.updateBook(currentId, newBook);

    }


    //Filter Functions
    const Filter = async () => {

        const data = await BookDataService.Filter(companyName, city, district, street, postalCode, category, subCategory);
        console.log(data.docs);
        setlastDoc(data.docs[data.docs.length - 1])
        console.log("LAST DOC ", lastDoc)

        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const LoadMore = async () => {
        const data = await BookDataService.GetNext(companyName, city, district, street, postalCode, category, subCategory, lastDoc);
        setlastDoc(data.docs[data.docs.length - 1])
        //setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setBooks((books) => [...books, ...data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))])
    }


    // 1) Fetch all books as the page is loaded (run only once)
    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {

        const data = await BookDataService.getAllBooks();
        setlastDoc(data.docs[data.docs.length - 1])
        console.log(data.docs);
        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    // 2) Delete Handler to delete a record
    const deleteHandler = async (id) => {
        await BookDataService.deleteBook(id);
        getBooks();  // refresh after delete
    };






    return (
        <div className="table-wrapper">
            {/* ------------------- Fiter START -------------------- */}
            <div>
                <Form className='p-4 p-sm-4 filter-section filter-form'>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Company Name"
                                onChange={(e) => { setcompanyName(e.target.value) }}
                            />
                        </Col>                    
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                onChange={(e) => { setcity(e.target.value) }}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="District"
                                onChange={(e) => { setdistrict(e.target.value) }}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Street"
                                onChange={(e) => { setstreet(e.target.value) }}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Postal Code"
                                onChange={(e) => { setpostalCode(e.target.value) }}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        {/* ------------ Main Dropdown START ------------ */}
                        <Col>
                            <FormControl fullWidth className="mt-1">
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Category"
                                    onChange={(e) => { setCategory(e.target.value) }}
                                >
                                    <MenuItem value={"Eat"} >Eat</MenuItem>
                                    <MenuItem value={"Goods"}>Goods</MenuItem>
                                    <MenuItem value={"Repair and Construction"}>Repair and Construction</MenuItem>
                                    <MenuItem value={"Car Service"}>Car Service</MenuItem>
                                    <MenuItem value={"Medicine"}>Medicine</MenuItem>
                                    <MenuItem value={"Auto Goods"}>Auto Goods</MenuItem>
                                    <MenuItem value={"Beauty"}>Beauty</MenuItem>
                                    <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                                    <MenuItem value={"Sports"}>Sports</MenuItem>
                                    <MenuItem value={"Services"}>Services</MenuItem>
                                    <MenuItem value={"Special Stores"}>Special Stores</MenuItem>
                                    <MenuItem value={"Tourism"}>Tourism</MenuItem>
                                    <MenuItem value={"Products"}>Products</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                        {/* ------------ Main Dropdown END ------------ */}

                        {/* ------------ Sub Dropdown START ------------ */}
                        <Col>
                            <FormControl fullWidth className="mt-1">
                                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                {
                                    category === "Eat" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Coffee Shops"}>Coffee Shops</MenuItem>
                                        <MenuItem value={"Pubs"}>Pubs</MenuItem>
                                        <MenuItem value={"Restaurants"}>Restaurants</MenuItem>
                                        <MenuItem value={"Bar"}>Bar</MenuItem>
                                        <MenuItem value={"Bakeries"}>Bakeries</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Goods" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Grocery Shops"}>Grocery Shops</MenuItem>
                                        <MenuItem value={"Supermarket"}>Supermarket</MenuItem>
                                        <MenuItem value={"Stationary"}>Stationary</MenuItem>
                                        <MenuItem value={"Pet Shops"}>Pet Shops</MenuItem>
                                        <MenuItem value={"For Homes"}>For Homes</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Repair and Construction" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Decoration material"}>Decoration material</MenuItem>
                                        <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                                        <MenuItem value={"Tool"}>Tool</MenuItem>
                                        <MenuItem value={"Services"}>Services</MenuItem>
                                        <MenuItem value={"Building Materials"}>Building Materials</MenuItem>
                                        <MenuItem value={"Windows"}>Windows</MenuItem>
                                        <MenuItem value={"Door"}>Door</MenuItem>
                                        <MenuItem value={"Roof"}>Roof</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Car Service" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Car Repair"}>Car Repair</MenuItem>
                                        <MenuItem value={"Car Washes"}>Car Washes</MenuItem>
                                        <MenuItem value={"Tire Fitting"}>Tire Fitting</MenuItem>
                                        <MenuItem value={"Refueling"}>Refueling</MenuItem>
                                        <MenuItem value={"Auto Disassembly"}>Auto Disassembly</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Medicine" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Pharmacies"}>Pharmacies</MenuItem>
                                        <MenuItem value={"Hospital"}>Hospital</MenuItem>
                                        <MenuItem value={"Dispensary"}>Dispensary</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select> : category === "Auto Goods" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Car Batteries"}>Car Batteries</MenuItem>
                                        <MenuItem value={"Tyres and Wheels"}>Tyres and Wheels</MenuItem>
                                        <MenuItem value={"Oil & Car Chemicals"}>Oil & Car Chemicals</MenuItem>
                                        <MenuItem value={"Motor Transport"}>Motor Transport</MenuItem>
                                        <MenuItem value={"Spare Parts"}>Spare Parts</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Beauty" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Hairdressers"}>Hairdressers</MenuItem>
                                        <MenuItem value={"Cosmetologist"}>Cosmetologist</MenuItem>
                                        <MenuItem value={"Manicure and Pedicure"}>Manicure and Pedicure</MenuItem>
                                        <MenuItem value={"Cosmetics"}>Cosmetics</MenuItem>
                                        <MenuItem value={"Solariums"}>Solariums</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Entertainment" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Clubs"}>Clubs</MenuItem>
                                        <MenuItem value={"Night Clubs"}>Night Clubs</MenuItem>
                                        <MenuItem value={"Saunas"}>Saunas</MenuItem>
                                        <MenuItem value={"Baths"}>Baths</MenuItem>
                                        <MenuItem value={"Cinemas"}>Cinemas</MenuItem>
                                        <MenuItem value={"Amusement"}>Amusement</MenuItem>
                                        <MenuItem value={"Children Playrooms"}>Children Playrooms</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Sports" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Gym"}>Gym</MenuItem>
                                        <MenuItem value={"Fitness Centers"}>Fitness Centers</MenuItem>
                                        <MenuItem value={"Sections"}>Sections</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select> : category === "Special Stores" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Furniture"}>Furniture</MenuItem>
                                        <MenuItem value={"Flowers"}>Flowers</MenuItem>
                                        <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                        <MenuItem value={"Clothes"}>Clothes</MenuItem>
                                        <MenuItem value={"Shoes"}>Shoes</MenuItem>
                                        <MenuItem value={"Souvenirs"}>Souvenirs</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : category === "Tourism" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Hotels"}>Hotels</MenuItem>
                                        <MenuItem value={"Apartment Offices"}>Apartment Offices</MenuItem>
                                        <MenuItem value={"Travel Agencies"}>Travel Agencies</MenuItem>
                                        <MenuItem value={"Hostels"}>Hostels</MenuItem>
                                        <MenuItem value={"Recreation Centers"}>Recreation Centers</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select> : <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={(e) => { setSubCategory(e.target.value) }}
                                    >
                                        <MenuItem value={"Fish"}>Fish</MenuItem>
                                        <MenuItem value={"Meat"}>Meat</MenuItem>
                                        <MenuItem value={"Drinks"}>Drinks</MenuItem>
                                        <MenuItem value={"Confectionery"}>Confectionery</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                    </Select>
                                }
                            </FormControl>

                        </Col>
                        {/* ------------ Sub Dropdown END ------------ */}
                    </Row>
                    <Row className='mt-3'>
                        <Col className="d-grid gap-2">
                            <Button className="table-filter-btn" variant="success" type="button" onClick={(e) => { Filter() }}>
                                FILTER
                            </Button>
                        </Col>

                    </Row>
                </Form>
            </div>
            {/* ------------------- Fiter END -------------------- */}



            {/* -------------- Refresh Btn START -------------- */}

            <div className="d-flex mb-2">
                <Button className="table-refresh-btn" variant="dark edit" onClick={getBooks}>
                <i className="bi bi-arrow-clockwise refresh-icon"></i> Refresh Table
                </Button>
            </div>

            {/* -------------- Refresh Btn END -------------- */}

            {/* -------------- Table START -------------- */}
            {/* <div className="table-responsive"></div> */}
            <div className="table-responsive">
                <Table striped size="sm" className="table table-bordered table-edit">
                    <thead>
                        <tr className="text-center p-2">
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>S/Category</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>H/No</th>
                            <th>Street</th>
                            <th>City</th>
                            <th>District</th>
                            <th>P/Code</th>
                            <th>Notes</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((doc, index) => {
                            return (
                                <tr key={doc.id} className="text-center p-2">
                                    <td>{index + 1}</td>
                                    <td>{doc.name}</td>
                                    <td>{doc.description}</td>
                                    <td>{doc.category}</td>
                                    <td>{doc.subCategory}</td>
                                    <td>{doc.contact}</td>
                                    <td>{doc.email}</td>
                                    <td>{doc.houseNo}</td>
                                    <td>{doc.street}</td>
                                    <td>{doc.city}</td>
                                    <td>{doc.district}</td>
                                    <td>{doc.postalCode}</td>
                                    <td>{doc.notes}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            className="table-delete-btn"
                                            onClick={(e) => deleteHandler(doc.id)}
                                        >
                                            <i class="bi bi-trash3"></i>
                                        </Button>
                                        {/* -------------- Modal Form START -------------- */}
                                        <Button variant="secondary" onClick={(e) => { getBookId(doc.id); handleOpen(); handleEditClick(doc.id); setCurrentId(doc.id); }}><i class="bi bi-pencil"></i></Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>

                                                {/* ------------- Form Inside Modal START ------------- */}
                                                <Container className="table-modal-container">
                                                    <Form className='rounded p-4 p-sm-4 border table-modal-form'>
                                                        <h1 className='font-weight-bold text-center pb-4 update-form-title'>
                                                            UPDATE FORM
                                                        </h1>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBookTitle">
                                                                    <Form.Label>Name</Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Company Name"
                                                                            value={ename}
                                                                            onChange={(e) => setEName(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                    <Form.Label>Description</Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Description"
                                                                            value={edescription}
                                                                            onChange={(e) => setEDescription(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                {/* -------------- Main Category Dropdown START -------------- */}
                                                                <FormControl fullWidth className="mb-3">
                                                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={ecategory}
                                                                        label="Category"
                                                                        onChange={(e) => { setECategory(e.target.value) }}
                                                                    >
                                                                        <MenuItem value={"Eat"}>Eat</MenuItem>
                                                                        <MenuItem value={"Goods"}>Goods</MenuItem>
                                                                        <MenuItem value={"Repair and Construction"}>Repair and Construction</MenuItem>
                                                                        <MenuItem value={"Car Service"}>Car Service</MenuItem>
                                                                        <MenuItem value={"Medicine"}>Medicine</MenuItem>
                                                                        <MenuItem value={"Auto Goods"}>Auto Goods</MenuItem>
                                                                        <MenuItem value={"Beauty"}>Beauty</MenuItem>
                                                                        <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                                                                        <MenuItem value={"Sports"}>Sports</MenuItem>
                                                                        <MenuItem value={"Services"}>Services</MenuItem>
                                                                        <MenuItem value={"Special Stores"}>Special Stores</MenuItem>
                                                                        <MenuItem value={"Tourism"}>Tourism</MenuItem>
                                                                        <MenuItem value={"Products"}>Products</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                                {/* -------------- Main Category Dropdown END -------------- */}
                                                            </Col>
                                                            <Col>
                                                                {/* -------------- Sub Category Dropdown START -------------- */}
                                                                <FormControl fullWidth className="mb-3">
                                                                    <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                                                    {
                                                                        ecategory === "Eat" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Coffee Shops"}>Coffee Shops</MenuItem>
                                                                            <MenuItem value={"Pubs"}>Pubs</MenuItem>
                                                                            <MenuItem value={"Restaurants"}>Restaurants</MenuItem>
                                                                            <MenuItem value={"Bar"}>Bar</MenuItem>
                                                                            <MenuItem value={"Bakeries"}>Bakeries</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select> : ecategory === "Goods" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Grocery Shops"}>Grocery Shops</MenuItem>
                                                                            <MenuItem value={"Supermarket"}>Supermarket</MenuItem>
                                                                            <MenuItem value={"Stationary"}>Stationary</MenuItem>
                                                                            <MenuItem value={"Pet Shops"}>Pet Shops</MenuItem>
                                                                            <MenuItem value={"For Homes"}>For Homes</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select> : ecategory === "Repair and Construction" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Decoration material"}>Decoration material</MenuItem>
                                                                            <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                                                                            <MenuItem value={"Tool"}>Tool</MenuItem>
                                                                            <MenuItem value={"Services"}>Services</MenuItem>
                                                                            <MenuItem value={"Building Materials"}>Building Materials</MenuItem>
                                                                            <MenuItem value={"Windows"}>Windows</MenuItem>
                                                                            <MenuItem value={"Door"}>Door</MenuItem>
                                                                            <MenuItem value={"Roof"}>Roof</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select> : ecategory === "Car Service" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Car Repair"}>Car Repair</MenuItem>
                                                                            <MenuItem value={"Car Washes"}>Car Washes</MenuItem>
                                                                            <MenuItem value={"Tire Fitting"}>Tire Fitting</MenuItem>
                                                                            <MenuItem value={"Refueling"}>Refueling</MenuItem>
                                                                            <MenuItem value={"Auto Disassembly"}>Auto Disassembly</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select> : ecategory === "Medicine" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Pharmacies"}>Pharmacies</MenuItem>
                                                                            <MenuItem value={"Hospital"}>Hospital</MenuItem>
                                                                            <MenuItem value={"Dispensary"}>Dispensary</MenuItem>
                                                                            <MenuItem value={"Other"}>Other</MenuItem>
                                                                        </Select> : ecategory === "Auto Goods" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Car Batteries"}>Car Batteries</MenuItem>
                                                                            <MenuItem value={"Tyres and Wheels"}>Tyres and Wheels</MenuItem>
                                                                            <MenuItem value={"Oil & Car Chemicals"}>Oil & Car Chemicals</MenuItem>
                                                                            <MenuItem value={"Motor Transport"}>Motor Transport</MenuItem>
                                                                            <MenuItem value={"Spare Parts"}>Spare Parts</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select> : ecategory === "Beauty" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Hairdressers"}>Hairdressers</MenuItem>
                                                                            <MenuItem value={"Cosmetologist"}>Cosmetologist</MenuItem>
                                                                            <MenuItem value={"Manicure and Pedicure"}>Manicure and Pedicure</MenuItem>
                                                                            <MenuItem value={"Cosmetics"}>Cosmetics</MenuItem>
                                                                            <MenuItem value={"Solariums"}>Solariums</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select> : ecategory === "Entertainment" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Clubs"}>Clubs</MenuItem>
                                                                            <MenuItem value={"Night Clubs"}>Night Clubs</MenuItem>
                                                                            <MenuItem value={"Saunas"}>Saunas</MenuItem>
                                                                            <MenuItem value={"Baths"}>Baths</MenuItem>
                                                                            <MenuItem value={"Cinemas"}>Cinemas</MenuItem>
                                                                            <MenuItem value={"Amusement"}>Amusement</MenuItem>
                                                                            <MenuItem value={"Children Playrooms"}>Children Playrooms</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select> : ecategory === "Sports" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Gym"}>Gym</MenuItem>
                                                                            <MenuItem value={"Fitness Centers"}>Fitness Centers</MenuItem>
                                                                            <MenuItem value={"Sections"}>Sections</MenuItem>
                                                                            <MenuItem value={"Other"}>Other</MenuItem>
                                                                        </Select> : ecategory === "Services" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Household"}>Household</MenuItem>
                                                                            <MenuItem value={"Transport"}>Transport</MenuItem>
                                                                            <MenuItem value={"Finance"}>Finance</MenuItem>
                                                                            <MenuItem value={"Real Estate"}>Real Estate</MenuItem>
                                                                            <MenuItem value={"Legal services"}>Legal services</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select> : ecategory === "Special Stores" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Furniture"}>Furniture</MenuItem>
                                                                            <MenuItem value={"Flowers"}>Flowers</MenuItem>
                                                                            <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                                                            <MenuItem value={"Clothes"}>Clothes</MenuItem>
                                                                            <MenuItem value={"Shoes"}>Shoes</MenuItem>
                                                                            <MenuItem value={"Souvenirs"}>Souvenirs</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select> : ecategory === "Tourism" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Hotels"}>Hotels</MenuItem>
                                                                            <MenuItem value={"Apartment Offices"}>Apartment Offices</MenuItem>
                                                                            <MenuItem value={"Travel Agencies"}>Travel Agencies</MenuItem>
                                                                            <MenuItem value={"Hostels"}>Hostels</MenuItem>
                                                                            <MenuItem value={"Recreation Centers"}>Recreation Centers</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select> : <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={esubCategory}
                                                                            label="Sub Category"
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Fish"}>Fish</MenuItem>
                                                                            <MenuItem value={"Meat"}>Meat</MenuItem>
                                                                            <MenuItem value={"Drinks"}>Drinks</MenuItem>
                                                                            <MenuItem value={"Confectionery"}>Confectionery</MenuItem>
                                                                            <MenuItem value={"Others"}>Others</MenuItem>
                                                                        </Select>
                                                                    }

                                                                </FormControl>
                                                                {/* -------------- Sub Category Dropdown END -------------- */}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBookTitle">
                                                                    <Form.Label>Contact Number</Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Contact Number"
                                                                            value={econtact}
                                                                            onChange={(e) => setEContact(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                    <Form.Label>Email</Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Email"
                                                                            value={eemail}
                                                                            onChange={(e) => setEEmail(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBookTitle">
                                                                    <Form.Label>House Number</Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Number"
                                                                            value={ehouseNo}
                                                                            onChange={(e) => setEHouseNo(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                    <Form.Label>Street</Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Street"
                                                                            value={estreet}
                                                                            onChange={(e) => setEStreet(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                    <Form.Label>City</Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="City"
                                                                            value={ecity}
                                                                            onChange={(e) => setECity(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBookTitle">
                                                                    <Form.Label>District</Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => setEDistrict(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBookTitle">
                                                                    <Form.Label>Postal Code</Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Postal Code"
                                                                            value={epostalCode}
                                                                            onChange={(e) => setEPostalCode(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group className="mb-3" controlId="formBookTitle">
                                                                    <Form.Label>Notes</Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Notes"
                                                                            value={enotes}
                                                                            onChange={(e) => setENotes(e.target.value)}
                                                                        />
                                                                    </InputGroup>
                                                                </Form.Group>
                                                            </Col>        
                                                        </Row>

                                                        <div className="d-grid gap-2">
                                                            <Button className="insert-btn" variant="primary" type="button" onClick={(e) => { handleClose(); handleEdit() }} >
                                                                Update
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </Container>
                                                {/* ------------- Form Inside Modal END ------------- */}
                                            </Box>
                                        </Modal>
                                        {/* -------------- Modal Form END -------------- */}

                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            <Button
                variant="secondary"
                onClick={(e) => LoadMore()}
                className="table-load-btn mt-3 mb-4"
            >
                Load More
            </Button>
            {/* -------------- Table END -------------- */}
        </div>
    );
};

export default BooksList;