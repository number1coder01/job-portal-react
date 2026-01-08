import JobListing from "./JobListing";
import { useState, useEffect } from "react";
import Spinners from "./Spinners";

const JobsListings = ({ isHome = false }) => {
  // only 3 visible on the front page
  // jobs mei saari visible i.e if jobs page hai then saari jobs will be visibile
  // const jobListings = isHome ? jobs.slice(0 , 3) : jobs;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // dependency array []
  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs' ; 
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("Error fetching the data! ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [isHome]);
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        
          {loading ? (
            <Spinners loading = {loading} /> 
            // reload maaro toh ek loading ka sign dikhata ek second ke liye , jaha jaha 
            // dynamic data fetching wala part hai vaha vaha yeh used 
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))}
        </div>
          )}
      </div>
    </section>
  );
};

export default JobsListings;
