import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AddNewSalesAgent() {
  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState(false);

  const postSalesAgentUrl = "https://anvaya-backend-henna.vercel.app/agents";

  function createLeadHandler() {
    if (agentName.length < 1) return alert("Please give proper agent name.");
    if (
      agentEmail.length < 1 ||
      !agentEmail.includes("@") ||
      !agentEmail.includes(".com") ||
      !(agentEmail.indexOf(".com") > agentEmail.indexOf("@"))
    ) {
      setSuccessMessage(false);
      return setFailureMessage(true);
    }

    const requestBody = {
      name: agentName,
      email: agentEmail,
    };

    axios
      .post(postSalesAgentUrl, requestBody)
      .then((response) => {
        if (response.status == 200) {
          setSuccessMessage(true);
          return setFailureMessage(false);
        } else {
          setSuccessMessage(false);
          return setFailureMessage(true);
        }
      })
      .catch((err) => console.log("Error Adding Sales Agent -", err));
  }

  return (
    <main className="" style={{ height: "100vh" }}>
      <h1
        className="text-center m-0 text-bolder py-4"
        style={{ backgroundColor: "#1370bc44" }}
      >
        <strong>Add New Sales Agent</strong>
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
                Agent Name:
              </h3>
              <input
                type="text"
                placeholder="Enter Agent Name"
                className="bg-white my-1 form-control text-center rounded fs-4 fw-semibold pholder"
                style={{ width: "50%" }}
                onChange={(e) => setAgentName(e.target.value)}
              />
            </div>
            <div className="d-flex my-1">
              <h3 className="px-4 py-2" style={{ width: "30%" }}>
                Email Address:
              </h3>
              <input
                type="email"
                placeholder="Enter Agent Email"
                className="bg-white my-1 form-control text-center rounded fs-4 fw-semibold pholder"
                style={{ width: "50%" }}
                onChange={(e) => setAgentEmail(e.target.value)}
              />
            </div>
          </div>
          <NavLink
            className="btn btn-primary my-4 fs-4 px-5"
            onClick={createLeadHandler}
          >
            Create New Agent
          </NavLink>
          {successMessage && (
            <div
              class="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>Sales Agent Added Successfully !</strong>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          {failureMessage && (
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>
                Sales Agent couldn't be added. Please check data and try again.
              </strong>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
