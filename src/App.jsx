import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LeadManagement from "./pages/LeadManagement";
import LeadList from "./pages/LeadList";
import AddNewLead from './pages/AddNewLead';
import SalesAgentManagement from './pages/SalesAgentManagement';
import AddNewSalesAgent from './pages/AddNewSalesAgent';
import Reports from './pages/Reports';

function App() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lead_management/:leadId" element={<LeadManagement />} />
            <Route path="/lead_list" element={<LeadList />} />
            <Route path="/add_new_lead" element={<AddNewLead />} />
            <Route path="/agent_list" element={<SalesAgentManagement />} />
            <Route path="/add_new_sales_agent" element={<AddNewSalesAgent />} />
            <Route path="/reports" element={<Reports />} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;