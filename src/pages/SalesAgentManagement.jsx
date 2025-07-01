import { NavLink } from "react-router-dom";

import useFetch from "../useFetch";
import { useEffect, useState } from "react";

export default function SalesAgentManagement() {
  const [finalAgentList, setFinalAgentList] = useState([]);

  const apiUrl = "https://anvaya-backend-henna.vercel.app/agents";
  const { finalData, loading } = useFetch(apiUrl);

  useEffect(() => {
    if (finalData && finalData.length > 0) {
      setFinalAgentList(finalData);
    }
  }, [finalData]);

  return (
    <main className="" style={{ height: "100vh" }}>
      <h1
        className="text-center m-0 text-bolder py-4"
        style={{ backgroundColor: "#1370bc44" }}
      >
        <strong>Sales Agent Management</strong>
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
            className="lead-list-two bg-body-secondary rounded p-4 d-flex flex-row flex-wrap align-items-start align-content-start"
            style={{ overflow: "auto" }}
          >
            <table className="table fs-5 text-center">
              <thead>
                <tr className="border-bottom fs-4 border-black">
                  <th scope="col" className="py-3">
                    Agent Name
                  </th>
                  <th scope="col" className="py-3">
                    Agent Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-3">Loading...</td>
                    <td className="py-3">Loading...</td>
                  </tr>
                ) : finalAgentList?.length > 0 ? (
                  finalAgentList.map((agent) => (
                    <tr key={agent._id}>
                      <td className="py-3">{agent.name}</td>
                      <td className="py-3">{agent.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-3">No Data</td>
                    <td className="py-3">No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <NavLink
            className="mt-4 px-5 btn btn-primary btn-lg"
            to="/add_new_lead"
          >
            Add New Agent
          </NavLink>
        </div>
      </section>
    </main>
  );
}
