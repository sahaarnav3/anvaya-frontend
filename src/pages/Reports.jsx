import { NavLink } from "react-router-dom";

export default function Reports() {

//   const postSalesAgentUrl = "https://anvaya-backend-henna.vercel.app/leads";

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
          
        </div>
      </section>
    </main>
  );
}
