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
    // const [edistrict, setEDistrict] = useState("");
    // const [ecity, setECity] = useState("");
    const [epostalCode, setEPostalCode] = useState("");
    const [enotes, setENotes] = useState("");

    // Edit States New District and City
    const [eNdistrict, setENDistrict] = useState("");
    const [eNcity, setENCity] = useState("");

    const [currentId, setCurrentId] = useState("");

    // State for Total of Results
    const [resultValue, setResultValue] = useState();

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
        setENDistrict(docSnap.data().Ndistrict);
        setENCity(docSnap.data().Ncity);
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
            Ndistrict: eNdistrict,
            Ncity: eNcity,
            postalCode: epostalCode,
            notes: enotes,
        };

        console.log(currentId);

        console.log(newBook);
        await BookDataService.updateBook(currentId, newBook);

    }


    //Filter Functions
    const Filter = async () => {

        const data = await BookDataService.Filter(companyName, Ncity, Ndistrict, street, postalCode, category, subCategory);
        console.log(data.docs);
        // console.log("Results: ", data.docs.length);
        setlastDoc(data.docs[data.docs.length - 1])
        console.log("LAST DOC ", lastDoc)

        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    // Clear Filter Fields
    const handleFilter = async () => {

        setcompanyName("");
        setNDistrict("");
        setNCity("");
        setstreet("");
        setpostalCode("");
        setCategory("");
        setSubCategory("");

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
            <div className="d-flex flex-row-reverse results-count">
                <div className="">Filtered Results: {resultValue}</div>
            </div>
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
                                    {/* <td>{doc.city}</td>
                                    <td>{doc.district}</td> */}
                                    <td>{doc.Ncity}</td>
                                    <td>{doc.Ndistrict}</td>
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
                                                        <Row className="mt-3">
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
                                                        <Row className='mt-2 mb-3'>
                                                            <Col>
                                                                {/* -------------- Main City Dropdown START -------------- */}
                                                                <FormControl fullWidth className="mt-1">
                                                                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={eNcity}
                                                                        label="City"
                                                                        onChange={(e) => { setENCity(e.target.value) }}
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
                                                                        eNcity === "Almaty" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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
                                                                        </Select> : eNcity === "Nur-Sultan" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Almaty"}>Almaty</MenuItem>
                                                                            <MenuItem value={"Esil"}>Esil</MenuItem>
                                                                            <MenuItem value={"Saryarqa"}>Saryarqa</MenuItem>
                                                                            <MenuItem value={"Baikonyr"}>Baikonyr</MenuItem>
                                                                            <MenuItem value={"Tselinogradsky"}>Tselinogradsky</MenuItem>
                                                                        </Select> : eNcity === "Shymkent" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Abai"}>Abai</MenuItem>
                                                                            <MenuItem value={"Al Farabi"}>Al Farabi</MenuItem>
                                                                            <MenuItem value={"Enbekshi"}>Enbekshi</MenuItem>
                                                                            <MenuItem value={"Qaratay"}>Qaratay</MenuItem>
                                                                        </Select> : eNcity === "Aktobe" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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
                                                                        </Select> : eNcity === "Taraz" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"-"}>-</MenuItem>
                                                                        </Select> : eNcity === "Karagandy" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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
                                                                        </Select> : eNcity === "Pavlodar" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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
                                                                        </Select> : eNcity === "Almaty Qalasy" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Alatau"}>Alatau</MenuItem>
                                                                            <MenuItem value={"Almaly"}>Almaly</MenuItem>
                                                                            <MenuItem value={"Auezov"}>Auezov</MenuItem>
                                                                            <MenuItem value={"Bostandyk"}>Bostandyk</MenuItem>
                                                                            <MenuItem value={"Jetysu"}>Jetysu</MenuItem>
                                                                            <MenuItem value={"Medau"}>Medau</MenuItem>
                                                                            <MenuItem value={"Nauryzbay"}>Nauryzbay</MenuItem>
                                                                            <MenuItem value={"Turksib"}>Turksib</MenuItem>
                                                                        </Select> : eNcity === "Akmola" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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
                                                                        </Select> : eNcity === "Atyray" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Atyrau"}>Atyrau</MenuItem>
                                                                            <MenuItem value={"Inder"}>Inder</MenuItem>
                                                                            <MenuItem value={"Isatay"}>Isatay</MenuItem>
                                                                            <MenuItem value={"Zhulyoi"}>Zhulyoi</MenuItem>
                                                                            <MenuItem value={"Makhambet"}>Makhambet</MenuItem>
                                                                            <MenuItem value={"Makat"}>Makat</MenuItem>
                                                                            <MenuItem value={"Kurmangazy"}>Kurmangazy</MenuItem>
                                                                            <MenuItem value={"Kyzylkogal"}>Kyzylkogal</MenuItem>
                                                                        </Select> : eNcity === "Turkistan" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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
                                                                        </Select> : eNcity === "Kyzylorda" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
                                                                        >
                                                                            <MenuItem value={"Aral"}>Aral</MenuItem>
                                                                            <MenuItem value={"Baikonur"}>Baikonur</MenuItem>
                                                                            <MenuItem value={"Zhalagash"}>Zhalagash</MenuItem>
                                                                            <MenuItem value={"Karmakshy"}>Karmakshy</MenuItem>
                                                                            <MenuItem value={"Kazaly"}>Kazaly</MenuItem>
                                                                            <MenuItem value={"Kyzylorda"}>Kyzylorda</MenuItem>
                                                                            <MenuItem value={"Shieli"}>Shieli</MenuItem>
                                                                            <MenuItem value={"Syrdariya"}>Syrdariya</MenuItem>
                                                                        </Select> : eNcity === "North Kazakhstan" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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
                                                                        </Select> : eNcity === "East Kazakhstan" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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
                                                                        </Select> : eNcity === "Jambyl" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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
                                                                        </Select> : eNcity === "Mangystau" ? <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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
                                                                            value={eNdistrict}
                                                                            label="District"
                                                                            onChange={(e) => { setENDistrict(e.target.value) }}
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