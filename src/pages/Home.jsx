import { NavLink } from 'react-router-dom';
import "./Home.css";

export default function Home() {
    return(
        <main className="" style={{height: "100vh"}}>
            <h1 className="text-center m-0 text-bolder py-4"><strong>Anvaya CRM Dashboard</strong></h1>
            <section className="row m-0" style={{height: "89.7%"}}>
                <div className="col-sm-2 p-0" style={{backgroundColor: "#1371bc"}}>
                    <ul className='list-group text-center py-4' style={{listStyle: "none"}}>
                        <li className='py-3 fs-2'><NavLink className="text-decoration-none text-white">Leads</NavLink></li>
                        <li className='py-3 fs-2'><NavLink className="text-decoration-none text-white">Sales</NavLink></li>
                        <li className='py-3 fs-2'><NavLink className="text-decoration-none text-white">Agents</NavLink></li>
                        <li className='py-3 fs-2'><NavLink className="text-decoration-none text-white">Reports</NavLink></li>
                        <li className='py-3 fs-2'><NavLink className="text-decoration-none text-white">Settings</NavLink></li>
                    </ul>
                </div>
                <div className="col-sm-10 px-5 py-4">
                    <div className='lead-list rounded p-4 d-flex flex-row flex-wrap align-items-start align-content-start' style={{ "overflow": "auto"}}>
                        <NavLink className="btn btn-primary btn-lg fs-2 border-0 m-3" style={{backgroundColor: "#e8f2fe", color: "#0c68ba", width: "14rem"}}>Lead 1</NavLink>
                        <NavLink className="btn btn-primary btn-lg fs-2 border-0 m-3" style={{backgroundColor: "#e8f2fe", color: "#0c68ba", width: "14rem"}}>Lead 2</NavLink>
                        <NavLink className="btn btn-primary btn-lg fs-2 border-0 m-3" style={{backgroundColor: "#e8f2fe", color: "#0c68ba", width: "14rem"}}>Lead 3</NavLink>
                        <NavLink className="btn btn-primary btn-lg fs-2 border-0 m-3" style={{backgroundColor: "#e8f2fe", color: "#0c68ba", width: "14rem"}}>Lead 4</NavLink>
                        <NavLink className="btn btn-primary btn-lg fs-2 border-0 m-3" style={{backgroundColor: "#e8f2fe", color: "#0c68ba", width: "14rem"}}>Lead 5</NavLink>
                        <NavLink className="btn btn-primary btn-lg fs-2 border-0 m-3" style={{backgroundColor: "#e8f2fe", color: "#0c68ba", width: "14rem"}}>Lead 6</NavLink>
                    </div>
                    <div className='my-4 mx-4'>
                        <h3 className='mb-3'>Lead Status:</h3>
                        <ul className='px-3'>
                            <li><p className='fs-5 m-1'><strong>New:</strong> [5] Leads</p></li>
                            <li><p className='fs-5 m-1'><strong>Contacted:</strong> [5] Leads</p></li>
                            <li><p className='fs-5 m-1'><strong>Qualified:</strong> [5] Leads</p></li>
                            <li><p className='fs-5 m-1'><strong>Proposal Sent:</strong> [5] Leads</p></li>
                            <li><p className='fs-5 m-1'><strong>Closed:</strong> [5] Leads</p></li>
                        </ul>
                    </div>
                    <select className='form-select fw-semibold fs-5 border border-2'>
                        <option value="All" selected>Quick Filters</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contact</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <NavLink className="mt-4 px-5 btn btn-primary btn-lg">Add New Lead</NavLink>
                </div>
            </section>
        </main>
    )
}