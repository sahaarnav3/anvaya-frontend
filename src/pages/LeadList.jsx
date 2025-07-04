import { NavLink } from "react-router-dom";

import useFetch from "../useFetch";
import { useEffect, useState } from "react";

export default function LeadList() {
  const [finalLeadList, setFinalLeadList] = useState([]);
  const [salesAgentList, setSalesAgentList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [salesAgentFilter, setSalesAgentFilter] = useState("All");

  const apiUrl = "https://anvaya-backend-henna.vercel.app/leads";
  const allSalesAgentUrl = "https://anvaya-backend-henna.vercel.app/agents";
  const { finalData, loading } = useFetch(apiUrl);
  const { finalData: allSalesAgents } = useFetch(allSalesAgentUrl);

  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  } 

  useEffect(() => {
    if (finalData && finalData.length > 0) {
      setFinalLeadList(finalData);
    }
  }, [finalData]);

  useEffect(() => {
    let temp = [];
    if(allSalesAgents)
      allSalesAgents.map(agent => temp.push(agent.name));
    setSalesAgentList(temp);
  }, [allSalesAgents]);

  function statusFilterHandler(e) {
    setStatusFilter(e.target.value);
  }

  function agentFilterHandler(e) {
    setSalesAgentFilter(e.target.value);
  }

  //Below function is used to make both the filters work simultaneously.
  useEffect(() => {
    if (!finalData) return;
    // console.log("actual filter -- ", statusFilter, salesAgentFilter);
    if (statusFilter === "All" && salesAgentFilter === "All") {
      setFinalLeadList(finalData);
      return;
    }
    if (statusFilter === "All") {
      setFinalLeadList(
        finalData.filter((lead) => lead.salesAgent.name === salesAgentFilter)
      );
      return;
    }
    if (salesAgentFilter === "All") {
      setFinalLeadList(
        finalData.filter((lead) => lead.status === statusFilter)
      );
      return;
    }
    setFinalLeadList(
      finalData.filter(
        (lead) =>
          lead.status === statusFilter &&
          lead.salesAgent.name === salesAgentFilter
      )
    );
  }, [statusFilter, salesAgentFilter, finalData]);

  function priorityHandler(e) {
    const value = e.target.value;
    if(value === 'none')
        return setStatusFilter(statusFilter);
    
    if(value === "HighToLow")
        return setFinalLeadList([...finalLeadList].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]));
    
    if(value === "LowToHigh") 
        return setFinalLeadList([...finalLeadList].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]));
    
    if(value === 'MoreToLess')
        return setFinalLeadList([...finalLeadList].sort((a, b) => b.timeToClose - a.timeToClose));

    if(value === 'LessToMore')
        return setFinalLeadList([...finalLeadList].sort((a, b) => a.timeToClose - b.timeToClose));
  }

  return (
    <main className="" style={{ height: "100vh" }}>
      <h1
        className="text-center m-0 text-bolder py-4"
        style={{ backgroundColor: "#1370bc44" }}
      >
        <strong>Lead List</strong>
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
                    Lead
                  </th>
                  <th scope="col" className="py-3">
                    Status
                  </th>
                  <th scope="col" className="py-3">
                    Sales Agent
                  </th>
                  <th scope="col" className="py-3">
                    Priority
                  </th> 
                  <th scope="col" className="py-3">
                    Time to Close
                  </th> 
                  {/* Uncomment the above while demonstrating.. */}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-3">Loading...</td>
                    <td className="py-3">Loading...</td>
                    <td className="py-3">Loading...</td>
                    <td className="py-3">Loading...</td>
                    <td className="py-3">Loading...</td>
                  </tr>
                ) : finalLeadList?.length > 0 ? (
                  finalLeadList.map((lead) => (
                    <tr key={lead._id}>
                      <td className="py-3">{lead.name}</td>
                      <td className="py-3">{lead.status}</td>
                      <td className="py-3">{lead.salesAgent.name}</td>
                      <td className="py-3">{lead.priority}</td>
                      <td className="py-3">{lead.timeToClose}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-3">No Data</td>
                    <td className="py-3">No Data</td>
                    <td className="py-3">No Data</td>
                    <td className="py-3">No Data</td>
                    <td className="py-3">No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="my-4">
            <label className="form-label fs-5" style={{ width: "4em" }}>
              Filters:
            </label>
            <select
              className="bg-white border-1 border-dark rounded p-2 px-5 mx-3"
              style={{ width: "17em" }}
              onChange={statusFilterHandler}
            >
              <option value="All">Select Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
            <select
              className="bg-white border-1 border-dark rounded p-2 px-5 mx-3"
              style={{ width: "17em" }}
              onChange={agentFilterHandler}
            >
              <option value="All">Select Sales Agent</option>
              {loading ? (
                <option value="All">Loading...</option>
              ) : (
                salesAgentList.map((lead) => (
                  <option value={lead} key={lead}>
                    {lead}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="my-4">
            <label className="form-label fs-5" style={{ width: "4em" }}>
              Sort By:
            </label>
            <select
              className="bg-white border-1 border-dark rounded p-2 px-5 mx-3"
              style={{ width: "17em" }}
              onChange={priorityHandler}
            >
              <option value="none">Priority</option>
              <option value="HighToLow">High To Low</option>
              <option value="LowToHigh">Low To High</option>
            </select>
            <select
              className="bg-white border-1 border-dark rounded p-2 px-5 mx-3"
              style={{ width: "17em" }}
              onChange={priorityHandler}
            >
              <option value="none">Time To Close</option>
              <option value="MoreToLess">More To Less</option>
              <option value="LessToMore">Less To More</option>
            </select>
          </div>
          <NavLink className="mt-2 px-5 btn btn-primary btn-lg" to="/add_new_lead">
            Add New Lead
          </NavLink>
        </div>
      </section>
    </main>
  );
}
