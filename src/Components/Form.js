import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, Row, Col } from "react-bootstrap";
import '../App.css';
import BookDataService from "../Util/BookDataContext";

// Imports from MUI
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



const AddBook = ({ id, setBookId }) => {

    // States for the form fields
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");


    // State to handle error messages
    const [message, setMessage] = useState({ error: false, msg: "" });



    // 1) Handling Form Submit    
    const handleSubmit = async (e) => {
        e.preventDefault();  // prevents the page refreshing on submit
        setMessage("");
        if (name === "" || description === "" || contact === "" || email === "" || category === "" || subCategory === "" || houseNo === "" || street === "" || district === "" || city === "" || postalCode === "" || country === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }
        const newBook = {
            name,
            description,
            contact,
            email,
            category,
            subCategory,
            houseNo,
            street,
            district,
            city,
            postalCode,
            country,
        };
        console.log(newBook);

        // if id is empty or undefined -> insert
        // if id is defined -> update

        try {
            if (id !== undefined && id !== "") {
                await BookDataService.updateBook(id, newBook);
                setBookId("");
                setMessage({ error: false, msg: "Updated successfully!" });
            } else {
                await BookDataService.addBooks(newBook);
                setMessage({ error: false, msg: "New Record added successfully!" });
            }
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }

        setName("");
        setDescription("");
        setContact("");
        setEmail("");
        setCategory("");
        setSubCategory("");
        setHouseNo("");
        setStreet("");
        setDistrict("");
        setCity("");
        setPostalCode("");
        setCountry("");
    };

    // 2) Update

    // 2.1) Fetch the record from the id
    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await BookDataService.getBook(id);
            console.log("the record is :", docSnap.data());
            setName(docSnap.data().name);
            setDescription(docSnap.data().description);
            setContact(docSnap.data().contact);
            setEmail(docSnap.data().email);
            setCategory(docSnap.data().category);
            setSubCategory(docSnap.data().subCategory);
            setHouseNo(docSnap.data().houseNo);
            setStreet(docSnap.data().street);
            setDistrict(docSnap.data().district);
            setCity(docSnap.data().city);
            setPostalCode(docSnap.data().postalCode);
            setCountry(docSnap.data().country);

        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }
    };

    // 2.2) Insert or Update indentifier
    // If id is undefined or empty -> The form acts as 'insert'
    // If id is defined -> The form acts as 'update'
    useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
            editHandler();
        }
    }, [id]);


    return (
        <div>
            <div className="form-wrapper-container">

                {/* -------------- Alert Box START -------------- */}
                {message?.msg && (
                    <Alert
                        variant={message?.error ? "danger" : "success"}
                        dismissible
                        onClose={() => setMessage("")}
                        className="alert-insert-form text-center mb-3"
                    >
                        {message?.msg}
                    </Alert>
                )}
                {/* -------------- Alert Box END -------------- */}

                {/* --------------Form START -------------- */}
                <Form onSubmit={handleSubmit} className='insert-form p-4 p-sm-4 m-0 rounded'>
                    <div className="form-header">
                        <h1 className="form-title text-center">Company Registeration</h1>
                        <h3 className="form-subtitle text-center">Tell something about the company</h3>
                    </div>
                    {/* <div class="row header">
                        <h1>CONTACT US &nbsp;</h1>
                        <h3>Fill out the form below to learn more!</h3>
                    </div> */}

                    <Form.Group className="mb-3" controlId="formBookTitle">
                        <Form.Label>Name</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Company Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBookAuthor">
                        <Form.Label>Description</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    {/* -------------- Main Category Dropdown START -------------- */}
                    <FormControl fullWidth className="mb-4 mt-2">
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={(e) => { setCategory(e.target.value) }}
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

                    {/* -------------- Sub Category Dropdown START -------------- */}
                    <FormControl fullWidth className="mb-3">
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
                            </Select> : category === "Services" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Household"}>Household</MenuItem>
                                <MenuItem value={"Transport"}>Transport</MenuItem>
                                <MenuItem value={"Finance"}>Finance</MenuItem>
                                <MenuItem value={"Real Estate"}>Real Estate</MenuItem>
                                <MenuItem value={"Legal services"}>Legal services</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
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
                    {/* -------------- Category Dropdown END -------------- */}

                    <Form.Group className="mb-3" controlId="formBookTitle">
                        <Form.Label>Contact Number</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="tel"
                                placeholder="Contact Number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBookAuthor">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Row className="mb-1">
                        <Form.Group as={Col} className="mb-3" controlId="formBookTitle">
                            <Form.Label>House Number</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    placeholder="Number"
                                    value={houseNo}
                                    onChange={(e) => setHouseNo(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formBookAuthor">
                            <Form.Label>Street</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Street"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Row className="mb-1">
                        <Form.Group as={Col} className="mb-3" controlId="formBookAuthor">
                            <Form.Label>City</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formBookTitle">
                            <Form.Label>District</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="District"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formBookTitle">
                        <Form.Label>Postal Code</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBookAuthor">
                        <Form.Label>Country</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit" className="insert-btn">
                            Insert
                        </Button>
                    </div>
                </Form>
                {/* --------------Form END -------------- */}
            </div>
        </div>
    );
};

export default AddBook;