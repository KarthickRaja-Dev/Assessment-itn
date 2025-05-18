import React, { useState, useEffect } from "react";
import { Search, MapPin, Users } from "lucide-react"; // or use any icon library
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filter = ({ onFilterChange, tamilNaduTopCities }) => {
  const [filters, setFilters] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    salaryRange: [0, 80000],
  });
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSalaryChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      salaryRange: value,
    }));
  };
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-xl mt-3 shadow-md max-w-full mx-auto">
      <div className="flex items-center gap-6 border border-gray-200 rounded-xl p-4 px-6">
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4 flex-1">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="jobTitle"
            placeholder="Search By Job Title, Role"
            value={filters.jobTitle}
            onChange={handleChange}
            className="outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4 flex-1">
          <MapPin className="w-5 h-5 text-gray-400" />
          <select
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="outline-none w-full text-gray-700 placeholder-gray-400 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Preferred Location</option>
            {tamilNaduTopCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4 flex-1">
          <Users className="w-5 h-5 text-gray-400" />
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleChange}
            className="outline-none w-full text-gray-700"
          >
            <option value="">Job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="flex items-center gap-4 flex-1 min-w-[220px]">
          <span className="text-gray-600 text-sm whitespace-nowrap">
            Salary Per Month
          </span>
          <div className="flex-1  min-w-[30px]">
            <Slider
              range
              min={0}
              max={200000}
              step={1000}
              value={filters.salaryRange}
              onChange={handleSalaryChange}
              trackStyle={[{ backgroundColor: "#000000" }]}
              handleStyle={[
                { borderColor: "#000000" },
                { borderColor: "#000000" },
              ]}
            />
          </div>
          <span className="text-gray-600 text-sm whitespace-nowrap">
            ₹{(filters.salaryRange[0] / 1000).toFixed(0)}k - ₹
            {(filters.salaryRange[1] / 1000).toFixed(0)}k
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
