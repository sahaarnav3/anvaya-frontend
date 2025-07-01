import { NavLink } from "react-router-dom";
import "./Home.css";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";

export default function Home() {
  const [finalLeadList, setFinalLeadList] = useState([]);
  const [leadStatusNew, setLeadStatusNew] = useState(0);
  const [leadStatusContacted, setLeadStatusContacted] = useState(0);
  const [leadStatusQualified, setLeadStatusQualified] = useState(0);
  const [leadStatusProposal, setLeadStatusProposal] = useState(0);
  const [leadStatusClosed, setLeadStatusClosed] = useState(0);

  const apiUrl = "https://anvaya-backend-henna.vercel.app/leads";
  const { finalData, loading } = useFetch(apiUrl);

  useEffect(() => {
      if (finalData && finalData.length > 0) {
        setFinalLeadList(finalData);
        let tempStatusCount = [0, 0, 0, 0, 0] // instead of using 5 variables, using an array
        finalData.map((lead) => {
          if (lead.status == "New")
            tempStatusCount[0]++;
          if (lead.status == "Contacted")
            tempStatusCount[1]++;
          if (lead.status == "Qualified")
            tempStatusCount[2]++;
          if (lead.status == "Proposal Sent")
            tempStatusCount[3]++;
          if (lead.status == "Closed")
            tempStatusCount[4]++;
        });
        setLeadStatusNew(tempStatusCount[0]);
        setLeadStatusContacted(tempStatusCount[1]);
        setLeadStatusQualified(tempStatusCount[2]);
        setLeadStatusProposal(tempStatusCount[3]);
        setLeadStatusClosed(tempStatusCount[4]);
      }
  }, [finalData]);

  function finalLeadListHandler(currValue) {
    if (currValue == "All") {
      setFinalLeadList(finalData);
      return;
    }
    setFinalLeadList(
      finalData.filter((leadData) => leadData.status == currValue)
    );
  }

  return (
    <main className="" style={{ height: "100vh" }}>
      <h1 className="text-center m-0 text-bolder py-4" style={{backgroundColor: "#1370bc44"}}>
        <strong>Anvaya CRM Dashboard</strong>
      </h1>
      <section className="row m-0" style={{ height: "89.7%" }}>
        <div className="col-sm-2 p-0" style={{ backgroundColor: "#1371bc" }}>
          <ul
            className="list-group text-center py-4"
            style={{ listStyle: "none" }}
          >
            <li className="py-3 fs-2">
              <NavLink className="text-decoration-none text-white" to="/lead_list">
                Leads
              </NavLink>
            </li>
            <li className="py-3 fs-2">
              <NavLink className="text-decoration-none text-white">
                Sales
              </NavLink>
            </li>
            <li className="py-3 fs-2">
              <NavLink className="text-decoration-none text-white" to="/agent_list">
                Agents
              </NavLink>
            </li>
            <li className="py-3 fs-2">
              <NavLink className="text-decoration-none text-white">
                Reports
              </NavLink>
            </li>
            <li className="py-3 fs-2">
              <NavLink className="text-decoration-none text-white">
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-sm-10 px-5 py-4">
          <div
            className="lead-list rounded p-4 d-flex flex-row flex-wrap align-items-start align-content-start"
            style={{ overflow: "auto" }}
          >
            {loading ? (
              <h1>Data Loading...</h1>
            ) : finalLeadList && finalLeadList.length > 0 ? (
              finalLeadList.map((lead) => (
                <NavLink
                  className="btn btn-primary btn-lg fs-2 border-0 my-3 mx-4 px-4"
                  style={{
                    backgroundColor: "#e8f2fe",
                    color: "#0c68ba",
                    // width: "14rem",
                  }}
                  to={`/lead_management/${lead._id}`}
                  key={lead._id}
                >
                  {lead.name}
                </NavLink>
              ))
            ) : (
              <h1>No Lead Present</h1>
            )}
          </div>
          <div className="my-4 mx-4">
            <h3 className="mb-3">Lead Status:</h3>
            <ul className="px-3">
              <li>
                <p className="fs-5 m-1">
                  <strong>New:</strong> [{leadStatusNew}] Leads
                </p>
              </li>
              <li>
                <p className="fs-5 m-1">
                  <strong>Contacted:</strong> [{leadStatusContacted}] Leads
                </p>
              </li>
              <li>
                <p className="fs-5 m-1">
                  <strong>Qualified:</strong> [{leadStatusQualified}] Leads
                </p>
              </li>
              <li>
                <p className="fs-5 m-1">
                  <strong>Proposal Sent:</strong> [{leadStatusProposal}] Leads
                </p>
              </li>
              <li>
                <p className="fs-5 m-1">
                  <strong>Closed:</strong> [{leadStatusClosed}] Leads
                </p>
              </li>
            </ul>
          </div>
          <select
            className="form-select fw-semibold fs-5 border border-2"
            onChange={(e) => {
              finalLeadListHandler(e.target.value);
            }}
          >
            <option value="All">Quick Filters</option>
            <option value="New">New</option>
            <option value="Contacted">Contact</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
          <NavLink className="mt-4 px-5 btn btn-primary btn-lg" to="/add_new_lead">
            Add New Lead
          </NavLink>
        </div>
      </section>
    </main>
  );
}
