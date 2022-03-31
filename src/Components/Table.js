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


// Original

const BooksList = ({ getBookId }) => {

    // State to store all book records as an array
    const [books, setBooks] = useState([]);

    // Select React bootstrap trigger (category and subCategory)
    const [selectedOption, setSelectedOption] = useState(null);

    // Select React bootstrap trigger (city and district)
    const [selectedOption2, setSelectedOption2] = useState(null);

    // Filter States
    const [companyName, setcompanyName] = useState("");
    const [Ndistrict, setNDistrict] = useState("");
    const [Ncity, setNCity] = useState("");
    const [street, setstreet] = useState("");
    const [postalCode, setpostalCode] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
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

    const [eNdistrict, setENDistrict] = useState("");
    const [eNcity, setENCity] = useState("");

    const [currentId, setCurrentId] = useState("");

    // State for Total of Results
    const [resultValue, setResultValue] = useState("");
    const [showResults, setShowResults] = React.useState(false)

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

        console.log("New Book: ", newBook);
        await BookDataService.updateBook(currentId, newBook);

        setSelectedOption(null);
        setSelectedOption2(null);

    }


    //Filter Functions
    const Filter = async () => {

        const data = await BookDataService.Filter(companyName, Ncity, Ndistrict, street, postalCode, category, subCategory);
        console.log(data.docs);
        // console.log("Results: ", data.docs.length);
        setlastDoc(data.docs[data.docs.length - 1])
        console.log("LAST DOC ", lastDoc)

        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        // Seting Visibility
        setShowResults(true);
    }

    // Clear Filter Fields
    const handleFilter = () => {

        setNDistrict("");
        setNCity("");
        setCategory("");
        setSubCategory("");

        // Seting Visibility
        setShowResults(false);

    }

    const LoadMore = async () => {
        const data = await BookDataService.GetNext(companyName, Ncity, Ndistrict, street, postalCode, category, subCategory, lastDoc);
        setlastDoc(data.docs[data.docs.length - 1])
        //setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setBooks((books) => [...books, ...data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))])
    }



    // ----------------------- Total Search Results Function START -----------------------

    const TotalResults = async () => {

        const dataResults = await BookDataService.Results(companyName, Ncity, Ndistrict, street, postalCode, category, subCategory);
        setResultValue(dataResults.docs.length)
        console.log("Results: ", dataResults.docs.length);
    }

    const Results = () => (
        <div className="d-flex flex-row-reverse results-count">
            <div className="results-count-edit">{resultValue} results found</div>
        </div>
    )


    // ----------------------- Total Search Results Function END -----------------------



    // 1) Fetch all books as the page is loaded (run only once)
    useEffect(() => {
        getBooks();
        console.log("Getting all books from useEffect");
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

            {/* -------------- Filter Clear Btn START -------------- */}
            <div className="d-flex mt-4 clear-btn-edit">
                <Button className="table-refresh-btn" variant="dark edit" onClick={handleFilter}>
                    <i className="bi bi-x-lg refresh-icon"></i> Clear Filter
                </Button>
            </div>
            {/* -------------- Filter Clear Btn END -------------- */}

            {/* ------------------- Fiter START -------------------- */}
            <div className="filter-container">
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
                    <Row className='mt-3'>
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
                            <Button className="table-filter-btn" variant="success" type="button" onClick={(e) => { Filter(); TotalResults() }}>
                                FILTER
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            {/* ------------------- Fiter END -------------------- */}


            {/* ------------------- Results Count START -------------------- */}
            {showResults ? <Results /> : null}
            {/* ------------------- Results Count END -------------------- */}


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
                                    {/* <td>{doc.Ncity}</td>
                                    <td>{doc.Ndistrict}</td> */}
                                    <td>{doc.postalCode}</td>
                                    <td>{doc.notes}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            className="table-delete-btn"
                                            onClick={(e) => deleteHandler(doc.id)}
                                        >
                                            <i className="bi bi-trash3"></i>
                                        </Button>
                                        {/* -------------- Modal Form START -------------- */}
                                        <Button variant="secondary" onClick={(e) => { getBookId(doc.id); handleOpen(); handleEditClick(doc.id); setCurrentId(doc.id); }}><i className="bi bi-pencil"></i></Button>
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
                                                                <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                    <Form.Label>Category</Form.Label>
                                                                    <Form.Select
                                                                        aria-label="Categories"
                                                                        value={ecategory}
                                                                        onChange={(e) => { setECategory(e.target.value); setSelectedOption(e.target.value) }}
                                                                    >
                                                                        <option value="Eat">Eat</option>
                                                                        <option value="Goods">Goods</option>
                                                                        <option value="Repair and Construction">Repair and Construction</option>
                                                                        <option value="Car Service">Car Service</option>
                                                                        <option value="Medicine">Medicine</option>
                                                                        <option value="Auto Goods">Auto Goods</option>
                                                                        <option value="Beauty">Beauty</option>
                                                                        <option value="Entertainment">Entertainment</option>
                                                                        <option value="Sports">Sports</option>
                                                                        <option value="Services">Services</option>
                                                                        <option value="Special Stores">Special Stores</option>
                                                                        <option value="Tourism">Tourism</option>
                                                                        <option value="Products">Products</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                                {/* -------------- Main Category Dropdown END -------------- */}

                                                            </Col>
                                                            <Col>

                                                                {/* -------------- Sub Category Dropdown START -------------- */}
                                                                <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                    <Form.Label>Sub Category</Form.Label>

                                                                    {ecategory === "Eat" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Coffee Shops">Coffee Shops</option>
                                                                            <option value="Pubs">Pubs</option>
                                                                            <option value="Restaurants">Restaurants</option>
                                                                            <option value="Bar">Bar</option>
                                                                            <option value="Bakeries">Bakeries</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Goods" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Grocery Shops">Grocery Shops</option>
                                                                            <option value="Supermarket">Supermarket</option>
                                                                            <option value="Stationary">Stationary</option>
                                                                            <option value="Pet Shops">Pet Shops</option>
                                                                            <option value="For Homes">For Homes</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Repair and Construction" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Decoration material">Decoration material</option>
                                                                            <option value="Plumbing">Plumbing</option>
                                                                            <option value="Tool">Tool</option>
                                                                            <option value="Services">Services</option>
                                                                            <option value="Building Materials">Building Materials</option>
                                                                            <option value="Windows">Windows</option>
                                                                            <option value="Door">Door</option>
                                                                            <option value="Roof">Roof</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Car Service" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Car Repair">Car Repair</option>
                                                                            <option value="Car Washes">Car Washes</option>
                                                                            <option value="Tire Fitting">Tire Fitting</option>
                                                                            <option value="Refueling">Refueling</option>
                                                                            <option value="Auto Disassembly">Auto Disassembly</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Medicine" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Pharmacies">Pharmacies</option>
                                                                            <option value="Hospital">Hospital</option>
                                                                            <option value="Dispensary">Dispensary</option>
                                                                            <option value="Other">Other</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Auto Goods" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Car Batteries">Car Batteries</option>
                                                                            <option value="Tyres and Wheels">Tyres and Wheels</option>
                                                                            <option value="Oil & Car Chemicals">Oil & Car Chemicals</option>
                                                                            <option value="Motor Transport">Motor Transport</option>
                                                                            <option value="Spare Parts">Spare Parts</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Beauty" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Hairdressers">Hairdressers</option>
                                                                            <option value="Cosmetologist">Cosmetologist</option>
                                                                            <option value="Manicure and Pedicure">Manicure and Pedicure</option>
                                                                            <option value="Cosmetics">Cosmetics</option>
                                                                            <option value="Solariums">Solariums</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Entertainment" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Clubs">Clubs</option>
                                                                            <option value="Night Clubs">Night Clubs</option>
                                                                            <option value="Saunas">Saunas</option>
                                                                            <option value="Baths">Baths</option>
                                                                            <option value="Cinemas">Cinemas</option>
                                                                            <option value="Amusement">Amusement</option>
                                                                            <option value="Children Playrooms">Children Playrooms</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Sports" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Gym">Gym</option>
                                                                            <option value="Fitness Centers">Fitness Centers</option>
                                                                            <option value="Sections">Sections</option>
                                                                            <option value="Other">Other</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Services" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Household">Household</option>
                                                                            <option value="Transport">Transport</option>
                                                                            <option value="Finance">Finance</option>
                                                                            <option value="Real Estate">Real Estate</option>
                                                                            <option value="Legal services">Legal services</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Special Stores" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Furniture">Furniture</option>
                                                                            <option value="Flowers">Flowers</option>
                                                                            <option value="Jewelry">Jewelry</option>
                                                                            <option value="Clothes">Clothes</option>
                                                                            <option value="Shoes">Shoes</option>
                                                                            <option value="Souvenirs">Souvenirs</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Tourism" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Hotels">Hotels</option>
                                                                            <option value="Apartment Offices">Apartment Offices</option>
                                                                            <option value="Travel Agencies">Travel Agencies</option>
                                                                            <option value="Hostels">Hostels</option>
                                                                            <option value="Recreation Centers">Recreation Centers</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecategory === "Products" && (
                                                                        <Form.Select
                                                                            aria-label="Sub Categories"
                                                                            value={esubCategory}
                                                                            onChange={(e) => { setESubCategory(e.target.value) }}
                                                                        >
                                                                            <option value="Fish">Fish</option>
                                                                            <option value="Meat">Meat</option>
                                                                            <option value="Drinks">Drinks</option>
                                                                            <option value="Confectionery">Confectionery</option>
                                                                            <option value="Others">Others</option>
                                                                        </Form.Select>
                                                                    )}

                                                                </Form.Group>
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
                                                            {/* <Col>
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
                                                            </Col> */}
                                                        </Row>
                                                        {/* ---------------------------------City & District--------------------------------- */}
                                                        <Row>
                                                            <Col>
                                                                {/* -------------- Main City Dropdown START -------------- */}

                                                                <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                    <Form.Label>City</Form.Label>
                                                                    <Form.Select
                                                                        aria-label="City"
                                                                        value={ecity}
                                                                        onChange={(e) => { setECity(e.target.value); setSelectedOption2(e.target.value) }}
                                                                    >
                                                                        <option value="Almaty">Almaty</option>
                                                                        <option value="Nur-Sultan">Nur-Sultan</option>
                                                                        <option value="Shymkent">Shymkent</option>
                                                                        <option value="Aktobe">Aktobe</option>
                                                                        <option value="Taraz">Taraz</option>
                                                                        <option value="Karagandy">Karagandy</option>
                                                                        <option value="Pavlodar">Pavlodar</option>
                                                                        <option value="Almaty Qalasy">Almaty Qalasy</option>
                                                                        <option value="Akmola">Akmola</option>
                                                                        <option value="Atyray">Atyray</option>
                                                                        <option value="Turkistan">Turkistan</option>
                                                                        <option value="Kyzylorda">Kyzylorda</option>
                                                                        <option value="North Kazakhstan">North Kazakhstan</option>
                                                                        <option value="East Kazakhstan">East Kazakhstan</option>
                                                                        <option value="Jambyl">Jambyl</option>
                                                                        <option value="Mangystau">Mangystau</option>
                                                                        <option value="Kostanay">Kostanay</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                                {/* -------------- Main City Dropdown END -------------- */}

                                                            </Col>

                                                            <Col>
                                                                {/* -------------- District Dropdown START -------------- */}

                                                                <Form.Group className="mb-3" controlId="formBookAuthor">
                                                                    <Form.Label>District</Form.Label>

                                                                    {ecity === "Almaty" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Alakol">Alakol</option>
                                                                            <option value="Aksu">Aksu</option>
                                                                            <option value="Balkhash">Balkhash</option>
                                                                            <option value="Enbekshikazakh">Enbekshikazakh</option>
                                                                            <option value="BakeEskeldiries">BakeEskeldiries</option>
                                                                            <option value="Ile">Ile</option>
                                                                            <option value="Zhambyl">Zhambyl</option>
                                                                            <option value="Raiymbek">Raiymbek</option>
                                                                            <option value="Kerbulak">Kerbulak</option>
                                                                            <option value="Koksu">Koksu</option>
                                                                            <option value="Panfilov">Panfilov</option>
                                                                            <option value="Kapchagay">Kapchagay</option>
                                                                            <option value="Karasay">Karasay</option>
                                                                            <option value="Karatal">Karatal</option>
                                                                            <option value="Sarkand">Sarkand</option>
                                                                            <option value="Taldykorgan">Taldykorgan</option>
                                                                            <option value="Talgar">Talgar</option>
                                                                            <option value="Tekeli">Tekeli</option>
                                                                            <option value="Uygur">Uygur</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Nur-Sultan" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Almaty district">Almaty district</option>
                                                                            <option value="Esil district">Esil district</option>
                                                                            <option value="Saryarka district">Saryarka district</option>
                                                                            <option value="Baikonyr district">Baikonyr district</option>
                                                                            <option value="Tselinogradsky district">Tselinogradsky district</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Shymkent" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Abai">Abai</option>
                                                                            <option value="Al Farabi">Al Farabi</option>
                                                                            <option value="Enbekshi">Enbekshi</option>
                                                                            <option value="Qaratay">Qaratay</option>+
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Aktobe" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Ayteke B">Ayteke B</option>
                                                                            <option value="Alga">Alga</option>
                                                                            <option value="Aktobe">Aktobe</option>
                                                                            <option value="Bayganin">Bayganin</option>
                                                                            <option value="Khromtau">Khromtau</option>
                                                                            <option value="Martuk">Martuk</option>
                                                                            <option value="Mugalzhar">Mugalzhar</option>
                                                                            <option value="Oiyl">Oiyl</option>
                                                                            <option value="Kargaly">Kargaly</option>
                                                                            <option value="Kobda">Kobda</option>
                                                                            <option value="Shalkar">Shalkar</option>
                                                                            <option value="Temir">Temir</option>
                                                                            <option value="Yrgyz">Yrgyz</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Taraz" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="-">-</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Karagandy" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Abay">Abay</option>
                                                                            <option value="Aktogav">Aktogav</option>
                                                                            <option value="Balkhash">Balkhash</option>
                                                                            <option value="Bukhar-Zhyrau">Bukhar-Zhyrau</option>
                                                                            <option value="Zhanaarka">Zhanaarka</option>
                                                                            <option value="Jezkazgan">Jezkazgan</option>
                                                                            <option value="Nura">Nura</option>
                                                                            <option value="Osakarov">Osakarov</option>
                                                                            <option value="Priozersk">Priozersk</option>
                                                                            <option value="Karaganda">Karaganda</option>
                                                                            <option value="Karazhal">Karazhal</option>
                                                                            <option value="Karkaraly">Karkaraly</option>
                                                                            <option value="Saran">Saran</option>
                                                                            <option value="Satbayev">Satbayev</option>
                                                                            <option value="Shakhtinsk">Shakhtinsk</option>
                                                                            <option value="Shet">Shet</option>
                                                                            <option value="Temirtau">Temirtau</option>
                                                                            <option value="Ulytau">Ulytau</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Pavlodar" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Akkuli">Akkuli</option>
                                                                            <option value="Aksu">Aksu</option>
                                                                            <option value="Aktogay">Aktogay</option>
                                                                            <option value="Bayanaul">Bayanaul</option>
                                                                            <option value="Ekibastuz">Ekibastuz</option>
                                                                            <option value="Ertis">Ertis</option>
                                                                            <option value="Zhelezin">Zhelezin</option>
                                                                            <option value="May">May</option>
                                                                            <option value="Pavlodar">Pavlodar</option>
                                                                            <option value="Sharbakty">Sharbakty</option>
                                                                            <option value="Kashyr">Kashyr</option>
                                                                            <option value="Uspen">Uspen</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Almaty Qalasy" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Alatau">Alatau</option>
                                                                            <option value="Almaly">Almaly</option>
                                                                            <option value="Auezov">Auezov</option>
                                                                            <option value="Bostandyk">Bostandyk</option>
                                                                            <option value="Jetysu">Jetysu</option>
                                                                            <option value="Medau">Medau</option>
                                                                            <option value="Nauryzbay">Nauryzbay</option>
                                                                            <option value="Turksib">Turksib</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Akmola" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Akkol">Akkol</option>
                                                                            <option value="Arshaly">Arshaly</option>
                                                                            <option value="Astrakhan">Astrakhan</option>
                                                                            <option value="Atbasar">Atbasar</option>
                                                                            <option value="Birjan sal">Birjan sal</option>
                                                                            <option value="Bulandy">Bulandy</option>
                                                                            <option value="Byrabai">Byrabai</option>
                                                                            <option value="Celinograd">Celinograd</option>
                                                                            <option value="Egindikol">Egindikol</option>
                                                                            <option value="Ereimentay">Ereimentay</option>
                                                                            <option value="Esil">Esil</option>
                                                                            <option value="Zhaksy">Zhaksy</option>
                                                                            <option value="Zharkain">Zharkain</option>
                                                                            <option value="Kokshetau">Kokshetau</option>
                                                                            <option value="Korgalzh">Korgalzh</option>
                                                                            <option value="Sandyktau">Sandyktau</option>
                                                                            <option value="Shortandy">Shortandy</option>
                                                                            <option value="Stepnogorsk">Stepnogorsk</option>
                                                                            <option value="Zerendi">Zerendi</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Atyray" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Atyrau">Atyrau</option>
                                                                            <option value="Inder">Inder</option>
                                                                            <option value="Isatay">Isatay</option>
                                                                            <option value="Zhulyoi">Zhulyoi</option>
                                                                            <option value="Makhambet">Makhambet</option>
                                                                            <option value="Makat">Makat</option>
                                                                            <option value="Kurmangazy">Kurmangazy</option>
                                                                            <option value="Kyzylkogal">Kyzylkogal</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Turkistan" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Arys">Arys</option>
                                                                            <option value="Baydibek">Baydibek</option>
                                                                            <option value="Maqtaaral">Maqtaaral</option>
                                                                            <option value="Saryagash">Saryagash</option>
                                                                            <option value="Kentau">Kentau</option>
                                                                            <option value="Maktaarak">Maktaarak</option>
                                                                            <option value="Ordabasy">Ordabasy</option>
                                                                            <option value="Otyrar">Otyrar</option>
                                                                            <option value="Kazygurt">Kazygurt</option>
                                                                            <option value="Sayram">Sayram</option>
                                                                            <option value="Saryagash">Saryagash</option>
                                                                            <option value="Shardara">Shardara</option>
                                                                            <option value="Sozak">Sozak</option>
                                                                            <option value="Tole Bi">Tole Bi</option>
                                                                            <option value="Tulkibas">Tulkibas</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Kyzylorda" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Aral">Aral</option>
                                                                            <option value="Baikonur">Baikonur</option>
                                                                            <option value="Zhalagash">Zhalagash</option>
                                                                            <option value="Karmakshy">Karmakshy</option>
                                                                            <option value="Kazaly">Kazaly</option>
                                                                            <option value="Kyzylorda">Kyzylorda</option>
                                                                            <option value="Shieli">Shieli</option>
                                                                            <option value="Syrdariya">Syrdariya</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "North Kazakhstan" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Aiyrtau">Aiyrtau</option>
                                                                            <option value="Akzhar">Akzhar</option>
                                                                            <option value="Akkayin">Akkayin</option>
                                                                            <option value="Esil">Esil</option>
                                                                            <option value="Gabit Musirepov">Gabit Musirepov</option>
                                                                            <option value="Zhambyl">Zhambyl</option>
                                                                            <option value="Magzhan Zumabaev">Magzhan Zumabaev</option>
                                                                            <option value="Mamlyut">Mamlyut</option>
                                                                            <option value="Petropavl">Petropavl</option>
                                                                            <option value="Kyzylzhar">Kyzylzhar</option>
                                                                            <option value="Shalakyn">Shalakyn</option>
                                                                            <option value="Taiynsha">Taiynsha</option>
                                                                            <option value="Timiryaazev">Timiryaazev</option>
                                                                            <option value="Ualikhanov">Ualikhanov</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "East Kazakhstan" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Abay">Abay</option>
                                                                            <option value="Ayagoz">Ayagoz</option>
                                                                            <option value="Beskaragay">Beskaragay</option>
                                                                            <option value="Borodhulikha">Borodhulikha</option>
                                                                            <option value="Glubokoye">Glubokoye</option>
                                                                            <option value="Zharma">Zharma</option>
                                                                            <option value="Katonkaragay">Katonkaragay</option>
                                                                            <option value="Kokpekti">Kokpekti</option>
                                                                            <option value="Kurshim">Kurshim</option>
                                                                            <option value="Kurchatov">Kurchatov</option>
                                                                            <option value="Oskemen">Oskemen</option>
                                                                            <option value="Ridder">Ridder</option>
                                                                            <option value="Semey">Semey</option>
                                                                            <option value="Shemonaikha">Shemonaikha</option>
                                                                            <option value="Tarbagatay">Tarbagatay</option>
                                                                            <option value="Ulan">Ulan</option>
                                                                            <option value="Urzhar">Urzhar</option>
                                                                            <option value="Zaysan">Zaysan</option>
                                                                            <option value="Zyryan">Zyryan</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Jambyl" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Bayzak">Bayzak</option>
                                                                            <option value="Jambyl">Jambyl</option>
                                                                            <option value="Zhualy">Zhualy</option>
                                                                            <option value="Merki">Merki</option>
                                                                            <option value="Moiynkum">Moiynkum</option>
                                                                            <option value="Korday">Korday</option>
                                                                            <option value="Sarysu">Sarysu</option>
                                                                            <option value="Shu">Shu</option>
                                                                            <option value="Talas">Talas</option>
                                                                            <option value="Taraz">Taraz</option>
                                                                            <option value="Turar">Turar</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Mangystau" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Aktau">Aktau</option>
                                                                            <option value="Beyneu">Beyneu</option>
                                                                            <option value="Zhanaozen">Zhanaozen</option>
                                                                            <option value="Mangystau">Mangystau</option>
                                                                            <option value="Munaily">Munaily</option>
                                                                            <option value="Karakiya">Karakiya</option>
                                                                            <option value="Tupkaragan">Tupkaragan</option>
                                                                        </Form.Select>
                                                                    )}
                                                                    {ecity === "Kostanay" && (
                                                                        <Form.Select
                                                                            aria-label="District"
                                                                            value={edistrict}
                                                                            onChange={(e) => { setEDistrict(e.target.value) }}
                                                                        >
                                                                            <option value="Altynsarin">Altynsarin</option>
                                                                            <option value="Amangeldi">Amangeldi</option>
                                                                            <option value="Arkalyk">Arkalyk</option>
                                                                            <option value="Auliekol">Auliekol</option>
                                                                            <option value="Denisov">Denisov</option>
                                                                            <option value="Fyodorov">Fyodorov</option>
                                                                            <option value="Zhangeldi">Zhangeldi</option>
                                                                            <option value="Zhetikara">Zhetikara</option>
                                                                            <option value="Lisakovsk">Lisakovsk</option>
                                                                            <option value="Mendykara">Mendykara</option>
                                                                            <option value="Nauyrzym">Nauyrzym</option>
                                                                            <option value="Kamysty">Kamysty</option>
                                                                            <option value="Karabalyk">Karabalyk</option>
                                                                            <option value="Karasu">Karasu</option>
                                                                            <option value="Kostanay">Kostanay</option>
                                                                            <option value="Rudny">Rudny</option>
                                                                            <option value="Sarykól">Sarykól</option>
                                                                            <option value="Taran">Taran</option>
                                                                            <option value="Uzunkol">Uzunkol</option>
                                                                        </Form.Select>
                                                                    )}

                                                                </Form.Group>

                                                                {/* -------------- District Dropdown END -------------- */}
                                                            </Col>
                                                        </Row>
                                                        {/* ---------------------------------City & District--------------------------------- */}
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