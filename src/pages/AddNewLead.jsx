import { NavLink } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import axios from "axios";

export default function AddNewLead() {
  const postLeadUrl = "https://anvaya-backend-henna.vercel.app/leads";
  const allAgentsApiUrl = `https://anvaya-backend-henna.vercel.app/agents`;
  const { finalData: allAgentsData, loading: agentDataLoading } =
    useFetch(allAgentsApiUrl);

  const [leadName, setLeadName] = useState("");
  const [salesAgent, setSalesAgent] = useState("");
  const [leadSource, setLeadSource] = useState("Website");
  const [leadStatus, setLeadStatus] = useState("New");
  const [priority, setPriority] = useState("High");
  const [timeToClose, setTimeToClose] = useState(0);
  const [successMessage, setSuccessMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState(false);

  function formHandler() {
    if (leadName.length < 1) return alert("Please Enter Lead Name");
    if (salesAgent.length < 1) return alert("Please Select a Sales Agent.");
    if (timeToClose <= 0) return alert("Please give proper Time To Close Date");

    const requestBody = {
      name: leadName,
      source: leadSource,
      salesAgent: salesAgent,
      status: leadStatus,
      timeToClose: timeToClose,
      priority: priority,
    };
    // console.log(requestBody);
    axios
      .post(postLeadUrl, requestBody)
      .then((response) => {
        if (response.status == 200) {
          setSuccessMessage(true);
          return setFailureMessage(false);
        }
        else {
          setSuccessMessage(false);
          return setFailureMessage(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="" style={{ height: "100vh" }}>
      <h1
        className="text-center m-0 text-bolder py-4"
        style={{ backgroundColor: "#1370bc44" }}
      >
        <strong>Add New Lead</strong>
      </h1>
      <section className="row m-0" style={{ height: "89.7%" }}>
        <div className="col-sm-2 p-0" style={{ backgroundColor: "#1371bc" }}>
          <ul
            className="list-group text-center py-4"
            style={{ listStyle: "none" }}
          >
            <li className="p-3 fs-2">
              <NavLink
                className="text-decoration-none text-white text-center"
                to="/"
              >
                ← Back To Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-sm-10 px-5 py-4">
          <div
            className="rounded py-4 px-5 d-flex flex-column"
            style={{ backgroundColor: "#1370bc44" }}
          >
            <div className="d-flex my-1">
              <h3 className="px-4 py-2" style={{ width: "30%" }}>
                Lead Name:
              </h3>
              <input
                type="text"
                placeholder="Enter A Name..."
                className="bg-white my-1 form-control text-center rounded fs-4 fw-semibold pholder"
                style={{ width: "50%" }}
                onChange={(e) => setLeadName(e.target.value)}
              />
            </div>
            <div className="d-flex my-1">
              <h3 className="px-4 py-2" style={{ width: "30%" }}>
                Sales Agent:
              </h3>
              <select
                className="form-select my-1 bg-white text-center rounded fs-4 fw-semibold pholder"
                style={{ width: "50%" }}
                onChange={(e) => setSalesAgent(e.target.value)}
              >
                <option value="">Select An Agent</option>
                {agentDataLoading ? (
                  <option value="">Loading</option>
                ) : (
                  allAgentsData?.map((agentData) => (
                    <option value={`${agentData._id}`} key={agentData._id}>
                      {agentData.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="d-flex my-1">
              <h3 className="px-4 py-2" style={{ width: "30%" }}>
                Lead Source:
              </h3>
              <select
                className="form-select my-1 bg-white text-center rounded fs-4 fw-semibold pholder"
                style={{ width: "50%" }}
                onChange={(e) => setLeadSource(e.target.value)}
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Email">Email</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="d-flex my-1">
              <h3 className="px-4 py-2" style={{ width: "30%" }}>
                Lead Status:
              </h3>
              <select
                className="form-select my-1 bg-white text-center rounded fs-4 fw-semibold pholder"
                style={{ width: "50%" }}
                onChange={(e) => setLeadStatus(e.target.value)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="d-flex my-1">
              <h3 className="px-4 py-2" style={{ width: "30%" }}>
                Priority:
              </h3>
              <select
                className="form-select my-1 bg-white text-center rounded fs-4 fw-semibold pholder"
                style={{ width: "50%" }}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="d-flex my-1">
              <h3 className="px-4 py-2" style={{ width: "30%" }}>
                Time To Close:
              </h3>
              <input
                type="number"
                placeholder="Enter No. Of Days..."
                className="bg-white form-control my-1 text-center rounded fs-4 fw-semibold pholder"
                style={{ width: "50%" }}
                onChange={(e) => setTimeToClose(e.target.value)}
              />
            </div>
          </div>
          <NavLink
            className="btn btn-primary my-4 fs-4 px-5"
            onClick={formHandler}
          >
            Create Lead
          </NavLink>
          {successMessage && <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>User Agent Added Successfully !</strong>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>}
          {failureMessage && <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Lead couldn't be added. Please check data and try again.</strong>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>}
        </div>
      </section>
    </main>
  );
}
