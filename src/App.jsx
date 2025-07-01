import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LeadManagement from "./pages/LeadManagement";
import LeadList from "./pages/LeadList";
import AddNewLead from './pages/AddNewLead';
import SalesAgentManagement from './pages/SalesAgentManagement';

function App() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lead_management/:leadId" element={<LeadManagement />} />
            <Route path="/lead_list" element={<LeadList />} />
            <Route path="/add_new_lead" element={<AddNewLead />} />
            <Route path="/agent_list" element={<SalesAgentManagement />} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;