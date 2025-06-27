import { NavLink, useParams } from "react-router-dom";

import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LeadManagement() {
  const [finalLeadData, setFinalLeadData] = useState({});
  const [finalCommentData, setFinalCommentData] = useState([]);
  const [addCommentValue, setAddCommentValue] = useState("");
  const [editLeadDetailsStatus, setEditLeadDetailsStatus] = useState(false);

  //Below are the states used in editing lead data
  const [editLeadName, setEditLeadName] = useState("");
  const [editLeadSalesAgent, setEditLeadSalesAgent] = useState("");
  const [editLeadSource, setEditLeadSource] = useState("");
  const [editLeadStatus, setEditLeadStatus] = useState("");
  const [editLeadPriority, setEditLeadPriority] = useState("");
  const [editLeadTimeToClose, setEditLeadTimeToClose] = useState(0);

  const leadId = useParams().leadId;
  const apiUrl = `https://anvaya-backend-henna.vercel.app/leads?leadId=${leadId}`;
  const commentApiUrl = `https://anvaya-backend-henna.vercel.app/leads/${leadId}/comments`;
  const allAgentsApiUrl = `https://anvaya-backend-henna.vercel.app/agents`;
  const { finalData, loading } = useFetch(apiUrl);
  const { finalData: commentData, loading: commentLoading } =
    useFetch(commentApiUrl);
  const { finalData: allAgentsData, loading: agentDataLoading } =
    useFetch(allAgentsApiUrl);

  useEffect(() => {
    if (finalData) {
      setFinalLeadData(finalData[0]);

      setEditLeadName(finalData[0].name);
      setEditLeadSalesAgent(finalData[0].salesAgent._id);
      setEditLeadSource(finalData[0].source);
      setEditLeadStatus(finalData[0].status);
      setEditLeadPriority(finalData[0].priority);
      setEditLeadTimeToClose(finalData[0].timeToClose);
    }
  }, [finalData]);
  useEffect(() => {
    if (commentData) setFinalCommentData(commentData);
  }, [commentData]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const datePart = date.toLocaleDateString("en-US", options);
    const hours = date.getHours().toString().padStart(2, "0");
    const mins = date.getMinutes().toString().padStart(2, "0");
    return `${datePart} ${hours}:${mins}`;
  }

  function submitCommentHandler() {
    if (addCommentValue.length < 1) return alert("Please add some text..");
    const commentApiUrl = `https://anvaya-backend-henna.vercel.app/leads/${leadId}/comments`;
    const commentBody = {
      commentText: addCommentValue,
    };
    axios({
      method: "post",
      url: commentApiUrl,
      data: commentBody,
    })
      .then((response) => {
        setFinalCommentData([
          ...finalCommentData,
          {
            _id: response.data._id,
            author: { name: response.data.author },
            commentText: response.data.commentText,
            createdAt: response.data.createdAt,
          },
        ]);
      })
      .catch((err) => console.log(err));
    setAddCommentValue("");
  }

  function editLeadDetailsHandler() {
    if (editLeadDetailsStatus) {
      const requestBody = {
        name: editLeadName,
        source: editLeadSource,
        salesAgent: editLeadSalesAgent, // Sales Agent ID
        status: editLeadStatus,
        timeToClose: editLeadTimeToClose,
        priority: editLeadPriority,
      };
    //   console.log(requestBody);
    const updateLeadApiUrl = `https://anvaya-backend-henna.vercel.app/leads/${leadId}`;
    axios({
      method: "put",
      url: updateLeadApiUrl,
      data: requestBody,
    })
      .then((response) => {
        console.log(response)
        setFinalLeadData(response.data);
      })
      .catch((err) => console.log(err));
    }
    setEditLeadDetailsStatus(!editLeadDetailsStatus);
  }

  return (
    <main className="" style={{ height: "100vh" }}>
      <h1
        className="text-center m-0 text-bolder py-4"
        style={{ backgroundColor: "#1370bc44" }}
      >
        <strong>
          Lead Management:{" "}
          {loading ? (
            "Loading..."
          ) : (
            <span className="text-primary">
              <i>{finalLeadData.name}</i>
            </span>
          )}
        </strong>
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
              <h2 className="px-4 py-2" style={{ width: "30%" }}>
                Lead Name:
              </h2>
              {editLeadDetailsStatus ? (
                <input
                  type="text"
                  placeholder={finalLeadData?.name}
                  className="bg-white my-1 text-center rounded fs-2 fw-bold pholder"
                  style={{ width: "50%" }}
                  onChange={(e) => setEditLeadName(e.target.value)}
                />
              ) : (
                <h2
                  className="bg-white py-2 text-center rounded"
                  style={{ width: "50%" }}
                >
                  <strong>{loading ? "Loading.." : finalLeadData?.name}</strong>
                </h2>
              )}
            </div>
            <div className="d-flex my-1">
              <h2 className="px-4 py-2" style={{ width: "30%" }}>
                Sales Agent:
              </h2>
              {editLeadDetailsStatus ? (
                <select
                  className="form-select my-1 bg-white text-center rounded fs-2 fw-bold pholder"
                  style={{ width: "50%" }}
                  onChange={(e) => setEditLeadSalesAgent(e.target.value)}
                >
                  {agentDataLoading ? (
                    <option value="">Loading</option>
                  ) : (
                    allAgentsData.map((agentData) => (
                      <option
                        value={`${agentData._id}`}
                        key={agentData._id}
                        selected={
                          finalLeadData?.salesAgent._id == agentData._id
                        }
                      >
                        {agentData.name}
                      </option>
                    ))
                  )}
                </select>
              ) : (
                <h2
                  className="bg-white py-2 text-center rounded"
                  style={{ width: "50%" }}
                >
                  <strong>
                    {loading ? "Loading.." : finalLeadData?.salesAgent?.name}
                  </strong>
                </h2>
              )}
            </div>
            <div className="d-flex my-1">
              <h2 className="px-4 py-2" style={{ width: "30%" }}>
                Lead Source:
              </h2>

              {editLeadDetailsStatus ? (
                <select
                  className="form-select my-1 bg-white text-center rounded fs-2 fw-bold pholder"
                  style={{ width: "50%" }}
                  onChange={(e) => setEditLeadSource(e.target.value)}
                >
                  <option
                    value="Website"
                    selected={finalLeadData?.source == "Website"}
                  >
                    Website
                  </option>
                  <option
                    value="Referral"
                    selected={finalLeadData?.source == "Referral"}
                  >
                    Referral
                  </option>
                  <option
                    value="Cold Call"
                    selected={finalLeadData?.source == "Cold Call"}
                  >
                    Cold Call
                  </option>
                  <option
                    value="Advertisement"
                    selected={finalLeadData?.source == "Advertisement"}
                  >
                    Advertisement
                  </option>
                  <option
                    value="Email"
                    selected={finalLeadData?.source == "Email"}
                  >
                    Email
                  </option>
                  <option
                    value="Other"
                    selected={finalLeadData?.source == "Other"}
                  >
                    Other
                  </option>
                </select>
              ) : (
                <h2
                  className="bg-white py-2 text-center rounded"
                  style={{ width: "50%" }}
                >
                  <strong>
                    {loading ? "Loading.." : finalLeadData?.source}
                  </strong>
                </h2>
              )}
            </div>
            <div className="d-flex my-1">
              <h2 className="px-4 py-2" style={{ width: "30%" }}>
                Lead Status:
              </h2>
              {editLeadDetailsStatus ? (
                <select
                  className="form-select my-1 bg-white text-center rounded fs-2 fw-bold pholder"
                  style={{ width: "50%" }}
                  onChange={(e) => setEditLeadStatus(e.target.value)}
                >
                  <option value="New" selected={finalLeadData?.status == "New"}>
                    New
                  </option>
                  <option
                    value="Contacted"
                    selected={finalLeadData?.status == "Contacted"}
                  >
                    Contacted
                  </option>
                  <option
                    value="Qualified"
                    selected={finalLeadData?.status == "Qualified"}
                  >
                    Qualified
                  </option>
                  <option
                    value="Proposal Sent"
                    selected={finalLeadData?.status == "Proposal Sent"}
                  >
                    Proposal Sent
                  </option>
                  <option
                    value="Closed"
                    selected={finalLeadData?.status == "Closed"}
                  >
                    Closed
                  </option>
                </select>
              ) : (
                <h2
                  className="bg-white py-2 text-center rounded"
                  style={{ width: "50%" }}
                >
                  <strong>
                    {loading ? "Loading.." : finalLeadData?.status}
                  </strong>
                </h2>
              )}
            </div>
            <div className="d-flex my-1">
              <h2 className="px-4 py-2" style={{ width: "30%" }}>
                Priority:
              </h2>
              {editLeadDetailsStatus ? (
                <select
                  className="form-select my-1 bg-white text-center rounded fs-2 fw-bold pholder"
                  style={{ width: "50%" }}
                  onChange={(e) => setEditLeadPriority(e.target.value)}
                >
                  <option
                    value="High"
                    selected={finalLeadData?.priority == "High"}
                  >
                    High
                  </option>
                  <option
                    value="Medium"
                    selected={finalLeadData?.priority == "Medium"}
                  >
                    Medium
                  </option>
                  <option
                    value="Low"
                    selected={finalLeadData?.priority == "Low"}
                  >
                    Low
                  </option>
                </select>
              ) : (
                <h2
                  className="bg-white py-2 text-center rounded"
                  style={{ width: "50%" }}
                >
                  <strong>
                    {loading ? "Loading.." : finalLeadData?.priority}
                  </strong>
                </h2>
              )}
            </div>
            <div className="d-flex my-1">
              <h2 className="px-4 py-2" style={{ width: "30%" }}>
                Time To Close:
              </h2>
              {editLeadDetailsStatus ? (
                <input
                  type="text"
                  placeholder={finalLeadData?.timeToClose}
                  className="bg-white my-1 text-center rounded fs-2 fw-bold pholder"
                  style={{ width: "50%" }}
                  onChange={(e) => setEditLeadTimeToClose(e.target.value)}
                />
              ) : (
                <h2
                  className="bg-white py-2 text-center rounded"
                  style={{ width: "50%" }}
                >
                  <strong>
                    {loading ? "Loading.." : finalLeadData?.timeToClose} Days
                  </strong>
                </h2>
              )}
            </div>
          </div>
          <NavLink
            className="btn btn-primary my-4 fs-3 px-5"
            onClick={editLeadDetailsHandler}
          >
            {!editLeadDetailsStatus ? "Edit Lead Details" : "Submit Changes"}
          </NavLink>
          <div className="rounded py-3 px-5 border border-2 border-primary rounded">
            <h2 className="text-center">
              <strong>Comments Section</strong>
            </h2>
            <hr className="mb-5" />
            <input
              type="text"
              placeholder="Type your comment here.."
              className="form-control fs-4 px-4 py-2 border-black"
              onChange={(e) => setAddCommentValue(e.target.value)}
            />
            <button
              className="btn btn-primary px-4 my-3 fs-5"
              onClick={submitCommentHandler}
            >
              Submit Comment
            </button>
            <hr />
            {commentLoading ? (
              <h4>Loading...</h4>
            ) : (
              finalCommentData?.map((eachComment) => (
                <div
                  className="border border-1 rounded p-2 px-3 my-3"
                  key={eachComment._id}
                >
                  <h5>
                    <strong>
                      {eachComment.author.name} -{" "}
                      {formatDate(eachComment.createdAt)}
                    </strong>
                  </h5>
                  <h5>{eachComment.commentText}</h5>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
