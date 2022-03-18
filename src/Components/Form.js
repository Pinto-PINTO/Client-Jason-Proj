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
    const [postalCode, setPostalCode] = useState("");
    const [notes, setNotes] = useState("");

    // New Dropdown states
    const [Ndistrict, setNDistrict] = useState("");
    const [Ncity, setNCity] = useState("");

    // State to handle error messages
    const [message, setMessage] = useState({ error: false, msg: "" });



    // 1) Handling Form Submit    
    const handleSubmit = async (e) => {
        e.preventDefault();  // prevents the page refreshing on submit
        setMessage("");
        if (name === "" || description === "" || contact === "" || email === "" || category === "" || subCategory === "" || houseNo === "" || street === "" || Ndistrict === "" || Ncity === "" || postalCode === "" || notes === "") {
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
            Ndistrict,
            Ncity,
            postalCode,
            notes,
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
        setNDistrict("");
        setNCity("");
        setPostalCode("");
        setNotes("");
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
            setNDistrict(docSnap.data().Ndistrict);
            setNCity(docSnap.data().Ncity);
            setPostalCode(docSnap.data().postalCode);
            setNotes(docSnap.data().notes);

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
                                type="text"
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
                                type="text"
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
                                    type="text"
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

                    {/* ---------------------------------City & District--------------------------------- */}
                    <Row className='mt-2 mb-3'>
                        <Col>
                            {/* -------------- Main City Dropdown START -------------- */}
                            <FormControl fullWidth className="mt-1">
                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Ncity}
                                    label="City"
                                    onChange={(e) => { setNCity(e.target.value) }}
                                >
                                    <MenuItem value={"Almaty"}>Almaty</MenuItem>
                                    <MenuItem value={"Nur-Sultan"}>Nur-Sultan</MenuItem>
                                    <MenuItem value={"Shymkent"}>Shymkent</MenuItem>
                                    <MenuItem value={"Aktobe"}>Aktobe</MenuItem>
                                    <MenuItem value={"Taraz"}>Taraz</MenuItem>
                                    <MenuItem value={"Karagandy"}>Karagandy</MenuItem>
                                    <MenuItem value={"Pavlodar"}>Pavlodar</MenuItem>
                                    <MenuItem value={"Almaty Qalasy"}>Almaty Qalasy</MenuItem>
                                    <MenuItem value={"Akmola"}>Akmola</MenuItem>
                                    <MenuItem value={"Atyray"}>Atyray</MenuItem>
                                    <MenuItem value={"Turkistan"}>Turkistan</MenuItem>
                                    <MenuItem value={"Kyzylorda"}>Kyzylorda</MenuItem>
                                    <MenuItem value={"North Kazakhstan"}>North Kazakhstan</MenuItem>
                                    <MenuItem value={"East Kazakhstan"}>East Kazakhstan</MenuItem>
                                    <MenuItem value={"Jambyl"}>Jambyl</MenuItem>
                                    <MenuItem value={"Mangystau"}>Mangystau</MenuItem>
                                    <MenuItem value={"Kostanay"}>Kostanay</MenuItem>

                                </Select>
                            </FormControl>
                            {/* -------------- Main City Dropdown END -------------- */}
                        </Col>

                        <Col>
                            {/* -------------- District Dropdown START -------------- */}
                            <FormControl fullWidth className="mt-1">
                                <InputLabel id="demo-simple-select-label">District</InputLabel>
                                {
                                    Ncity === "Almaty" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Alakol"}>Alakol</MenuItem>
                                        <MenuItem value={"Aksu"}>Aksu</MenuItem>
                                        <MenuItem value={"Balkhash"}>Balkhash</MenuItem>
                                        <MenuItem value={"Enbekshikazakh"}>Enbekshikazakh</MenuItem>
                                        <MenuItem value={"BakeEskeldiries"}>Eskeldi</MenuItem>
                                        <MenuItem value={"Ile"}>Ile</MenuItem>
                                        <MenuItem value={"Zhambyl"}>Zhambyl</MenuItem>
                                        <MenuItem value={"Raiymbek"}>Raiymbek</MenuItem>
                                        <MenuItem value={"Kerbulak"}>Kerbulak</MenuItem>
                                        <MenuItem value={"Koksu"}>Koksu</MenuItem>
                                        <MenuItem value={"Panfilov"}>Panfilov</MenuItem>
                                        <MenuItem value={"Kapchagay"}>Kapchagay</MenuItem>
                                        <MenuItem value={"Karasay"}>Karasay</MenuItem>
                                        <MenuItem value={"Karatal"}>Karatal</MenuItem>
                                        <MenuItem value={"Sarkand"}>Sarkand</MenuItem>
                                        <MenuItem value={"Taldykorgan"}>Taldykorgan</MenuItem>
                                        <MenuItem value={"Talgar"}>Talgar</MenuItem>
                                        <MenuItem value={"Tekeli"}>Tekeli</MenuItem>
                                        <MenuItem value={"Uygur"}>Uygur</MenuItem>
                                    </Select> : Ncity === "Nur-Sultan" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Almaty"}>Almaty</MenuItem>
                                        <MenuItem value={"Esil"}>Esil</MenuItem>
                                        <MenuItem value={"Saryarqa"}>Saryarqa</MenuItem>
                                        <MenuItem value={"Baikonyr"}>Baikonyr</MenuItem>
                                        <MenuItem value={"Tselinogradsky"}>Tselinogradsky</MenuItem>
                                    </Select> : Ncity === "Shymkent" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Abai"}>Abai</MenuItem>
                                        <MenuItem value={"Al Farabi"}>Al Farabi</MenuItem>
                                        <MenuItem value={"Enbekshi"}>Enbekshi</MenuItem>
                                        <MenuItem value={"Qaratay"}>Qaratay</MenuItem>
                                    </Select> : Ncity === "Aktobe" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Ayteke B"}>Ayteke B</MenuItem>
                                        <MenuItem value={"Alga"}>Alga</MenuItem>
                                        <MenuItem value={"Aktobe"}>Aktobe</MenuItem>
                                        <MenuItem value={"Bayganin"}>Bayganin</MenuItem>
                                        <MenuItem value={"Khromtau"}>Khromtau</MenuItem>
                                        <MenuItem value={"Martuk"}>Martuk</MenuItem>
                                        <MenuItem value={"Mugalzhar"}>Mugalzhar</MenuItem>
                                        <MenuItem value={"Oiyl"}>Oiyl</MenuItem>
                                        <MenuItem value={"Kargaly"}>Kargaly</MenuItem>
                                        <MenuItem value={"Kobda"}>Kobda</MenuItem>
                                        <MenuItem value={"Shalkar"}>Shalkar</MenuItem>
                                        <MenuItem value={"Temir"}>Temir</MenuItem>
                                        <MenuItem value={"Yrgyz"}>Yrgyz</MenuItem>
                                    </Select> : Ncity === "Taraz" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"-"}>-</MenuItem>
                                    </Select> : Ncity === "Karagandy" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Abay"}>Abay</MenuItem>
                                        <MenuItem value={"Aktogav"}>Aktogav</MenuItem>
                                        <MenuItem value={"Balkhash"}>Balkhash</MenuItem>
                                        <MenuItem value={"Bukhar-Zhyrau"}>Bukhar-Zhyrau</MenuItem>
                                        <MenuItem value={"Zhanaarka"}>Zhanaarka</MenuItem>
                                        <MenuItem value={"Jezkazgan"}>Jezkazgan</MenuItem>
                                        <MenuItem value={"Nura"}>Nura</MenuItem>
                                        <MenuItem value={"Osakarov"}>Osakarov</MenuItem>
                                        <MenuItem value={"Priozersk"}>Priozersk</MenuItem>
                                        <MenuItem value={"Karaganda"}>Karaganda</MenuItem>
                                        <MenuItem value={"Karazhal"}>Karazhal</MenuItem>
                                        <MenuItem value={"Karkaraly"}>Karkaraly</MenuItem>
                                        <MenuItem value={"Saran"}>Saran</MenuItem>
                                        <MenuItem value={"Satbayev"}>Satbayev</MenuItem>
                                        <MenuItem value={"Shakhtinsk"}>Shakhtinsk</MenuItem>
                                        <MenuItem value={"Shet"}>Shet</MenuItem>
                                        <MenuItem value={"Temirtau"}>Temirtau</MenuItem>
                                        <MenuItem value={"Ulytau"}>Ulytau</MenuItem>
                                    </Select> : Ncity === "Pavlodar" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Akkuli"}>Akkuli</MenuItem>
                                        <MenuItem value={"Aksu"}>Aksu</MenuItem>
                                        <MenuItem value={"Aktogay"}>Aktogay</MenuItem>
                                        <MenuItem value={"Bayanaul"}>Bayanaul</MenuItem>
                                        <MenuItem value={"Ekibastuz"}>Ekibastuz</MenuItem>
                                        <MenuItem value={"Ertis"}>Ertis</MenuItem>
                                        <MenuItem value={"Zhelezin"}>Zhelezin</MenuItem>
                                        <MenuItem value={"May"}>May</MenuItem>
                                        <MenuItem value={"Pavlodar"}>Pavlodar</MenuItem>
                                        <MenuItem value={"Sharbakty"}>Sharbakty</MenuItem>
                                        <MenuItem value={"Kashyr"}>Kashyr</MenuItem>
                                        <MenuItem value={"Uspen"}>Uspen</MenuItem>
                                    </Select> : Ncity === "Almaty Qalasy" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Alatau"}>Alatau</MenuItem>
                                        <MenuItem value={"Almaly"}>Almaly</MenuItem>
                                        <MenuItem value={"Auezov"}>Auezov</MenuItem>
                                        <MenuItem value={"Bostandyk"}>Bostandyk</MenuItem>
                                        <MenuItem value={"Jetysu"}>Jetysu</MenuItem>
                                        <MenuItem value={"Medau"}>Medau</MenuItem>
                                        <MenuItem value={"Nauryzbay"}>Nauryzbay</MenuItem>
                                        <MenuItem value={"Turksib"}>Turksib</MenuItem>
                                    </Select> : Ncity === "Akmola" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Akkol"}>Akkol</MenuItem>
                                        <MenuItem value={"Arshaly"}>Arshaly</MenuItem>
                                        <MenuItem value={"Astrakhan"}>Astrakhan</MenuItem>
                                        <MenuItem value={"Atbasar"}>Atbasar</MenuItem>
                                        <MenuItem value={"Birjan sal"}>Birjan sal</MenuItem>
                                        <MenuItem value={"Bulandy"}>Bulandy</MenuItem>
                                        <MenuItem value={"Byrabai"}>Byrabai</MenuItem>
                                        <MenuItem value={"Celinograd"}>Celinograd</MenuItem>
                                        <MenuItem value={"Egindikol"}>Egindikol</MenuItem>
                                        <MenuItem value={"Ereimentay"}>Ereimentay</MenuItem>
                                        <MenuItem value={"Esil"}>Esil</MenuItem>
                                        <MenuItem value={"Zhaksy"}>Zhaksy</MenuItem>
                                        <MenuItem value={"Zharkain"}>Zharkain</MenuItem>
                                        <MenuItem value={"Kokshetau"}>Kokshetau</MenuItem>
                                        <MenuItem value={"Korgalzh"}>Korgalzh</MenuItem>
                                        <MenuItem value={"Sandyktau"}>Sandyktau</MenuItem>
                                        <MenuItem value={"Shortandy"}>Shortandy</MenuItem>
                                        <MenuItem value={"Stepnogorsk"}>Stepnogorsk</MenuItem>
                                        <MenuItem value={"Zerendi"}>Zerendi</MenuItem>
                                    </Select> : Ncity === "Atyray" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Atyrau"}>Atyrau</MenuItem>
                                        <MenuItem value={"Inder"}>Inder</MenuItem>
                                        <MenuItem value={"Isatay"}>Isatay</MenuItem>
                                        <MenuItem value={"Zhulyoi"}>Zhulyoi</MenuItem>
                                        <MenuItem value={"Makhambet"}>Makhambet</MenuItem>
                                        <MenuItem value={"Makat"}>Makat</MenuItem>
                                        <MenuItem value={"Kurmangazy"}>Kurmangazy</MenuItem>
                                        <MenuItem value={"Kyzylkogal"}>Kyzylkogal</MenuItem>
                                    </Select> : Ncity === "Turkistan" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Arys"}>Arys</MenuItem>
                                        <MenuItem value={"Baydibek"}>Baydibek</MenuItem>
                                        <MenuItem value={"Maqtaaral"}>Maqtaaral</MenuItem>
                                        <MenuItem value={"Saryagash"}>Saryagash</MenuItem>
                                        <MenuItem value={"Kentau"}>Kentau</MenuItem>
                                        <MenuItem value={"Maktaarak"}>Maktaarak</MenuItem>
                                        <MenuItem value={"Ordabasy"}>Ordabasy</MenuItem>
                                        <MenuItem value={"Otyrar"}>Otyrar</MenuItem>
                                        <MenuItem value={"Kazygurt"}>Kazygurt</MenuItem>
                                        <MenuItem value={"Sayram"}>Sayram</MenuItem>
                                        <MenuItem value={"Saryagash"}>Saryagash</MenuItem>
                                        <MenuItem value={"Shardara"}>Shardara</MenuItem>
                                        <MenuItem value={"Sozak"}>Sozak</MenuItem>
                                        <MenuItem value={"Tole Bi"}>Tole Bi</MenuItem>
                                        <MenuItem value={"Tulkibas"}>Tulkibas</MenuItem>
                                    </Select> : Ncity === "Kyzylorda" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Aral"}>Aral</MenuItem>
                                        <MenuItem value={"Baikonur"}>Baikonur</MenuItem>
                                        <MenuItem value={"Zhalagash"}>Zhalagash</MenuItem>
                                        <MenuItem value={"Karmakshy"}>Karmakshy</MenuItem>
                                        <MenuItem value={"Kazaly"}>Kazaly</MenuItem>
                                        <MenuItem value={"Kyzylorda"}>Kyzylorda</MenuItem>
                                        <MenuItem value={"Shieli"}>Shieli</MenuItem>
                                        <MenuItem value={"Syrdariya"}>Syrdariya</MenuItem>
                                    </Select> : Ncity === "North Kazakhstan" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Aiyrtau"}>Aiyrtau</MenuItem>
                                        <MenuItem value={"Akzhar"}>Akzhar</MenuItem>
                                        <MenuItem value={"Akkayin"}>Akkayin</MenuItem>
                                        <MenuItem value={"Esil"}>Esil</MenuItem>
                                        <MenuItem value={"Gabit Musirepov"}>Gabit Musirepov</MenuItem>
                                        <MenuItem value={"Zhambyl"}>Zhambyl</MenuItem>
                                        <MenuItem value={"Magzhan Zumabaev"}>Magzhan Zumabaev</MenuItem>
                                        <MenuItem value={"Mamlyut"}>Mamlyut</MenuItem>
                                        <MenuItem value={"Petropavl"}>Petropavl</MenuItem>
                                        <MenuItem value={"Kyzylzhar"}>Kyzylzhar</MenuItem>
                                        <MenuItem value={"Shalakyn"}>Shalakyn</MenuItem>
                                        <MenuItem value={"Taiynsha"}>Taiynsha</MenuItem>
                                        <MenuItem value={"Timiryaazev"}>Timiryaazev</MenuItem>
                                        <MenuItem value={"Ualikhanov"}>Ualikhanov</MenuItem>
                                    </Select> : Ncity === "East Kazakhstan" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Abay"}>Abay</MenuItem>
                                        <MenuItem value={"Ayagoz"}>Ayagoz</MenuItem>
                                        <MenuItem value={"Beskaragay"}>Beskaragay</MenuItem>
                                        <MenuItem value={"Borodhulikha"}>Borodhulikha</MenuItem>
                                        <MenuItem value={"Glubokoye"}>Glubokoye</MenuItem>
                                        <MenuItem value={"Zharma"}>Zharma</MenuItem>
                                        <MenuItem value={"Katonkaragay"}>Katonkaragay</MenuItem>
                                        <MenuItem value={"Kokpekti"}>Kokpekti</MenuItem>
                                        <MenuItem value={"Kurshim"}>Kurshim</MenuItem>
                                        <MenuItem value={"Kurchatov"}>Kurchatov</MenuItem>
                                        <MenuItem value={"Oskemen"}>Oskemen</MenuItem>
                                        <MenuItem value={"Ridder"}>Ridder</MenuItem>
                                        <MenuItem value={"Semey"}>Semey</MenuItem>
                                        <MenuItem value={"Shemonaikha"}>Shemonaikha</MenuItem>
                                        <MenuItem value={"Tarbagatay"}>Tarbagatay</MenuItem>
                                        <MenuItem value={"Ulan"}>Ulan</MenuItem>
                                        <MenuItem value={"Urzhar"}>Urzhar</MenuItem>
                                        <MenuItem value={"Zaysan"}>Zaysan</MenuItem>
                                        <MenuItem value={"Zyryan"}>Zyryan</MenuItem>
                                    </Select> : Ncity === "Jambyl" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Bayzak"}>Bayzak</MenuItem>
                                        <MenuItem value={"Jambyl"}>Jambyl</MenuItem>
                                        <MenuItem value={"Zhualy"}>Zhualy</MenuItem>
                                        <MenuItem value={"Merki"}>Merki</MenuItem>
                                        <MenuItem value={"Moiynkum"}>Moiynkum</MenuItem>
                                        <MenuItem value={"Korday"}>Korday</MenuItem>
                                        <MenuItem value={"Sarysu"}>Sarysu</MenuItem>
                                        <MenuItem value={"Shu"}>Shu</MenuItem>
                                        <MenuItem value={"Talas"}>Talas</MenuItem>
                                        <MenuItem value={"Taraz"}>Taraz</MenuItem>
                                        <MenuItem value={"Turar"}>Turar</MenuItem>
                                    </Select> : Ncity === "Mangystau" ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Aktau"}>Aktau</MenuItem>
                                        <MenuItem value={"Beyneu"}>Beyneu</MenuItem>
                                        <MenuItem value={"Zhanaozen"}>Zhanaozen</MenuItem>
                                        <MenuItem value={"Mangystau"}>Mangystau</MenuItem>
                                        <MenuItem value={"Munaily"}>Munaily</MenuItem>
                                        <MenuItem value={"Karakiya"}>Karakiya</MenuItem>
                                        <MenuItem value={"Tupkaragan"}>Tupkaragan</MenuItem>
                                    </Select> : <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Ndistrict}
                                        label="District"
                                        onChange={(e) => { setNDistrict(e.target.value) }}
                                    >
                                        <MenuItem value={"Altynsarin"}>Altynsarin</MenuItem>
                                        <MenuItem value={"Amangeldi"}>Amangeldi</MenuItem>
                                        <MenuItem value={"Arkalyk"}>Arkalyk</MenuItem>
                                        <MenuItem value={"Auliekol"}>Auliekol</MenuItem>
                                        <MenuItem value={"Denisov"}>Denisov</MenuItem>
                                        <MenuItem value={"Fyodorov"}>Fyodorov</MenuItem>
                                        <MenuItem value={"Zhangeldi"}>Zhangeldi</MenuItem>
                                        <MenuItem value={"Zhetikara"}>Zhetikara</MenuItem>
                                        <MenuItem value={"Lisakovsk"}>Lisakovsk</MenuItem>
                                        <MenuItem value={"Mendykara"}>Mendykara</MenuItem>
                                        <MenuItem value={"Nauyrzym"}>Nauyrzym</MenuItem>
                                        <MenuItem value={"Kamysty"}>Kamysty</MenuItem>
                                        <MenuItem value={"Karabalyk"}>Karabalyk</MenuItem>
                                        <MenuItem value={"Karasu"}>Karasu</MenuItem>
                                        <MenuItem value={"Kostanay"}>Kostanay</MenuItem>
                                        <MenuItem value={"Rudny"}>Rudny</MenuItem>
                                        <MenuItem value={"Sarykól"}>Sarykól</MenuItem>
                                        <MenuItem value={"Taran"}>Taran</MenuItem>
                                        <MenuItem value={"Uzunkol"}>Uzunkol</MenuItem>
                                    </Select>
                                }

                            </FormControl>
                            {/* -------------- District Dropdown END -------------- */}
                        </Col>
                    </Row>
                    {/* ---------------------------------City & District--------------------------------- */}

                    <Form.Group className="mb-3" controlId="formBookTitle">
                        <Form.Label>Postal Code</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBookAuthor">
                        <Form.Label>Notes</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
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