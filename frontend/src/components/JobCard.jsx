import { MapPin, Layers, User } from "lucide-react";

const JobCard = ({ job }) => {
  const {
    jobTitle,
    companyName,
    location,
    salaryRangeEnd,
    jobDescription,
    postedAt,
    expRange,
  } = job;

  const getTimeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60));
    return diff < 24 ? `${diff}h Ago` : `${Math.floor(diff / 24)}d Ago`;
  };

  return (
    <div
      id="shadow"
      className="w-[316px] h-[420px] bg-white rounded-[12px] p-6 relative shadow-md flex flex-col"
      style={{ boxShadow: "0px 4px 12px rgba(211, 211, 211, 0.15)" }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl font-bold">
          {companyName[0]}
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
          {getTimeAgo(postedAt)}
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-3">{jobTitle}</h3>
      <div className="flex gap-6 text-sm text-gray-600 items-center flex-wrap mb-4">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" /> {expRange}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {location}
        </div>
        <div className="flex items-center gap-1">
          <Layers className="w-4 h-4" /> ₹{(salaryRangeEnd * 12) / 100000} LPA
        </div>
      </div>
      <ul
        className="text-sm text-gray-700 list-disc list-inside mb-6 overflow-y-auto"
        style={{ maxHeight: "120px" }}
      >
        {jobDescription.split("\n").map((str, idx) => (
          <li key={idx}>{str}</li>
        ))}
      </ul>

      <button className="w-full h-[46px] bg-[#00AAFF] text-white text-sm font-semibold rounded-[10px] hover:bg-blue-700 transition mt-auto">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
