import React, { useEffect } from "react";
import JobCard from "./JobCard";
import Filter from "./Filters";
import Nav from "./Nav";

const JobDashboard = ({
  tamilNaduTopCities,
  getJobs,
  handleFilterChange,
  filters,
  jobs,
}) => {
  useEffect(() => {
    getJobs();
  }, [filters]);

  return (
    <div className="p-6 max-w-full mx-auto">
      <Nav tamilNaduTopCities={tamilNaduTopCities} getJobs={getJobs} />
      <Filter
        onFilterChange={handleFilterChange}
        tamilNaduTopCities={tamilNaduTopCities}
      />
      {jobs.length === 0 ? (
        <p className="mt-6 text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobDashboard;
