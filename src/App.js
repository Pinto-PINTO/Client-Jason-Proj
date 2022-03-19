import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import { UserAuthContextProvider } from "./Util/UserAuthContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import FormTag from './Components/FormTag';


function App() {
  return (

    <Router>
      <UserAuthContextProvider>
        <Routes>

          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/' element={<Login />} />
          <Route path='/form' element={<ProtectedRoute><FormTag /></ProtectedRoute>} />
          {/* <Route path='*' element={<TableTag />} /> */}

        </Routes>

      </UserAuthContextProvider>
      
    </Router>

  );
}

export default App;
