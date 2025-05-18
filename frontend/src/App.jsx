import { useState } from "react";
import "./App.css";
import JobDashboard from "./components/JobDashboard";
import { useCallback } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const handleFilterChange = useCallback(
    (newFilters) => {
      const { salaryRange, ...rest } = newFilters;

      const cleanedFilters = Object.fromEntries(
        Object.entries({
          ...rest,
          minSalary: salaryRange ? salaryRange[0] : undefined,
          maxSalary: salaryRange ? salaryRange[1] : undefined,
        }).filter(([_, v]) => v !== "" && v !== undefined)
      );
      const areFiltersEqual =
        JSON.stringify(cleanedFilters) === JSON.stringify(filters);
      if (!areFiltersEqual) {
        setFilters(cleanedFilters);
      }
    },
    [filters]
  );

  const tamilNaduTopCities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Erode",
    "Vellore",
    "Thoothukudi",
    "Nagercoil",
  ];
  const getJobs = async () => {
    try {
      const response = await axios.get("https://assessment-itn.onrender.com/api/jobs", {
        params: filters,
      });
      setJobs(response.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  return (
    <>
      <ToastContainer />
      <JobDashboard
        tamilNaduTopCities={tamilNaduTopCities}
        getJobs={getJobs}
        jobs={jobs}
        handleFilterChange={handleFilterChange}
        filters={filters}
      />
    </>
  );
}

export default App;
