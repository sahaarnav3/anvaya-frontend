import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LeadManagement from "./pages/LeadManagement"

function App() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lead_management/:leadId" element={<LeadManagement />} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;