import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, Row, Col, Container } from "react-bootstrap";

// Imports from MUI
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


function Filter() {

    // States
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");

    return (

        <Container>
            <Form className='rounded p-4 p-sm-4 border'>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Company Name"
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Country"
                        />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="City"
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="District"
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Street"
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Postal Code"
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
                        <Button variant="success" type="Submit">
                            Filter
                        </Button>
                    </Col>

                </Row>
            </Form>
        </Container>
    )
}

export default Filter;
