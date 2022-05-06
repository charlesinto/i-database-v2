import { useCallback, useEffect, useState } from "react";
import { getCoinPairReport } from "../api/report.api";
import moment from "moment";

const Report = () => {
  const [data, setData] = useState([]);
  const getReport = useCallback(async () => {
    try {
      const response = await getCoinPairReport();
      setData(response?.data?.report);
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);
  useEffect(() => {
    getReport();
  }, []);
  return (
    <div className="container">
      <div className="py-4">
        <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
          <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
            <li className="breadcrumb-item">
              <a href="#">
                <svg
                  className="icon icon-xxs"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Report
            </li>
          </ol>
        </nav>
      </div>

      <div className="card border-0 shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-centered table-nowrap mb-0 rounded">
              <thead className="thead-light">
                <tr>
                  <th className="border-0 rounded-start">#</th>
                  <th className="border-0">Coin Pair</th>
                  <th className="border-0">Value</th>
                  <th className="border-0">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <a href="#" className="text-primary fw-bold">
                        {i + 1}
                      </a>{" "}
                    </td>
                    <td className="fw-bold d-flex align-items-center">
                      <svg
                        className="icon icon-xxs text-gray-500 me-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      {item.pair}
                    </td>
                    <td>{item.value}</td>
                    <td>
                      {moment(item.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
