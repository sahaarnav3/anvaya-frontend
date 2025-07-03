import { NavLink } from "react-router-dom";

import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";

export default function Reports() {
  const [leadClosedLastWeek, setLeadClosedLastWeek] = useState(0);
  const [leadPresentInPipeline, setLeadPresentInPipeline] = useState(0);
  const [allLeadClosedByAgent, setAllLeadClosedByAgent] = useState({});
  const [leadDistributionByStatusData, setLeadDistributionByStatusData] =
    useState({});

  const leadClosedLastWeekUrl =
    "https://anvaya-backend-henna.vercel.app/report/last-week";
  const leadPresentInPipelineUrl =
    "https://anvaya-backend-henna.vercel.app/report/pipeline";
  const leadClosedByEachAgentUrl =
    "https://anvaya-backend-henna.vercel.app/report/lead_closed_by_agent";
  const leadDistributionByStatusUrl =
    "https://anvaya-backend-henna.vercel.app/report/lead_distribution_by_status";

  const { finalData } = useFetch(leadClosedLastWeekUrl);
  const { finalData: leadPresentInPipelineData } = useFetch(
    leadPresentInPipelineUrl
  );
  const { finalData: allLeadData } = useFetch(leadClosedByEachAgentUrl);
  const { finalData: leadDistributionStatus } = useFetch(leadDistributionByStatusUrl);

  useEffect(() => {
    if (finalData) setLeadClosedLastWeek(finalData.length);
  }, [finalData]);

  useEffect(() => {
    if (leadPresentInPipelineData)
      setLeadPresentInPipeline(leadPresentInPipelineData.totalLeadsInPipeline);
  }, [leadPresentInPipelineData]);

  useEffect(() => {
    if (allLeadData) setAllLeadClosedByAgent(allLeadData);
  }, [allLeadData]);

  useEffect(() => {
    if(leadDistributionStatus) setLeadDistributionByStatusData(leadDistributionStatus);
  }, [leadDistributionStatus]);

  const totalLeadsClosedAndInPipeline = {
    labels: ["Total Leads Closed", "Total Leads In Pipeline (except Closed)"],
    datasets: [
      {
        label: "Number of Leads",
        data: [leadClosedLastWeek, leadPresentInPipeline],
        backgroundColor: ["#0072c6", "#ff9800"],
        borderWidth: 3,
      },
    ],
  };
  const leadDistributionByStatus = {
    labels: ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"],
    datasets: [
      {
        label: "Number of Leads",
        data: Object.values(leadDistributionByStatusData),
        backgroundColor: [
          "#0072c6",
          "#ff9800",
          "#4caf50",
          "#673ab7",
          "#00bcd4",
        ],
        borderWidth: 3,
      },
    ],
  };

  const totalLeadsClosedBySalesAgent = {
    labels: Object.keys(allLeadClosedByAgent),
    datasets: [
      {
        label: "Number of Leads",
        data: Object.values(allLeadClosedByAgent),
        backgroundColor: ["#0072c6"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <main className="" style={{ height: "100vh" }}>
      <h1
        className="text-center m-0 text-bolder py-4"
        style={{ backgroundColor: "#1370bc44" }}
      >
        <strong>Anvaya CRM Reports</strong>
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
        <div className="col-sm-10 px-5 py-4 text-center">
          <div className="my-4">
            <h2>Total Leads Closed And In Pipeline:</h2>
            <div className="mt-4" style={{ width: "20em", margin: "auto" }}>
              <PieChart finalData={totalLeadsClosedAndInPipeline} />
            </div>
          </div>
          <hr className="border-3" />
          <div className="my-4">
            <h2>Leads Closed by Sales Agent:</h2>
            <div className="mt-4" style={{ width: "30em", margin: "auto" }}>
              <BarChart finalData={totalLeadsClosedBySalesAgent} />
            </div>
          </div>
          <hr className="border-3" />
          <div className="my-4">
            <h2>Lead Status Distribution:</h2>
            <div className="mt-4" style={{ width: "20em", margin: "auto" }}>
              <PieChart finalData={leadDistributionByStatus} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
