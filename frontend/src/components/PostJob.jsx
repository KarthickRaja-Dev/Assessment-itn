import React, { useState } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const PostJob = ({ isOpen, onClose, tamilNaduTopCities }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salaryStart: "",
    salaryEnd: "",
    expRange: "",
    requirements: "",
    deadLine: "",
    jobDescription: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e, draft) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const config = {
      position: "top-center",
      autoClose: 3000,
    };
    try {
      console.log({ ...formData, status: draft });
      const response = await axios.post("http://localhost:5000/api/job/post", {
        ...formData,
        status: draft,
      });
      onClose();
      toast.success("Job Posted Successfully", config);
      setFormData({
        jobTitle: "",
        companyName: "",
        location: "",
        jobType: "",
        salaryStart: "",
        salaryEnd: "",
        expRange: "",
        requirements: "",
        deadLine: "",
        jobDescription: "",
      });
    } catch (err) {
      toast.error(err.message, config);
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div
          className="relative bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create Job Opening
          </h2>
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            onClick={onClose}
          >
            X
          </button>
          {message && (
            <p className="text-green-600 mb-2 text-center">{message}</p>
          )}
          {error && <p className="text-red-600 mb-2 text-center">{error}</p>}

          <form
            onSubmit={(e) => handleSubmit(e, "completed")}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Amazon, Microsoft, Swiggy"
                value={formData.companyName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Choose Preferred Location</option>
                {tamilNaduTopCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Salary Range (₹ From)
              </label>
              <input
                type="number"
                name="salaryStart"
                value={formData.salaryStart}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Salary Range (₹ To)
              </label>
              <input
                type="number"
                name="salaryEnd"
                value={formData.salaryEnd}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Experience Range
              </label>
              <input
                type="text"
                name="expRange"
                placeholder="e.g. 1-3 yrs"
                value={formData.expRange}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadLine"
                value={formData.deadLine}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Job Description
              </label>
              <textarea
                name="jobDescription"
                placeholder="Please share a description to let the candidate know more about the job role"
                value={formData.jobDescription}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                rows={4}
              />
            </div>

            <div className="sm:col-span-2 flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, "draft")}
                className="border px-4 py-2 rounded hover:bg-gray-100 flex items-center space-x-2"
              >
                <span>Save Draft</span>
                <span className="flex flex-col space-y-[-6px]">
                  <ChevronDown className="w-4 h-4 text-black" />
                  <ChevronDown className="w-4 h-4 text-black" />
                </span>
              </button>
              <button
                type="submit"
                className="bg-sky-400 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                Publish &raquo;
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
