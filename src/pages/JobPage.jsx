// using useEffect
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Spinner from "../components/Spinners";

// const JobPage = () => {
//   const { id } = useParams(); // iski vjh se id aa rahi from the url since id is a parameter
//     // (/jobs/1) mei /1 wala onwards is the params part
//   const [job, setJob] = useState(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     //You cannot make useEffect itself async, so we define an inner function.
//     const fetchJob = async () => {
//       try {
//         //Calls backend via Vite proxy
//         const res = await fetch(`/api/jobs/${id}`); // Use that id to fetch one job from the backend
//         // Parses response into JavaScript object:
//         const data = await res.json();
//         //Updates React state → triggers re-render
//         setJob(data);
//       } catch (error) {
//         console.log("Error fetching the data!", error);
//       } finally {
//         // This runs:

//             //1. Whether fetch succeeds
//             //2. Or fails
//         // So UI always leaves loading state
//         setLoading(false);
//       }
//     };
//     // callback
//     fetchJob();
//   }, [id]);

//   if (loading) return <Spinner />; // Show a loading spinner while data is coming
//   if (!job) return <h1>Job not found</h1>;
//   // React renders before async data arrives — always code defensively.
//   return <h1>{job.title}</h1>; // Show the job title once data arrives
// };

// export default JobPage;

// using DATA LOADERS THAT IS REACT ROUTER
import { useParams, useLoaderData , useNavigate } from "react-router-dom";
import {FaArrowLeft , FaMapMarker} from 'react-icons/fa'
import { Link } from "react-router-dom";
import { toast } from "react-toastify" ; 
// useLoaderData to access the data loader (obLoader)

const JobPage = ({deleteJob}) => {
  const { id } = useParams();
  const job = useLoaderData();
  const navigate = useNavigate() ; 

  const onDeleteClick = async (jobId) => {
    const confirm = window.confirm('Are you sure you want to delete this listing?')

    if(!confirm) return ; 

    await deleteJob(jobId) ;
    // iske color by default green -> check react-toastify for more attributes
    toast.success('Job deleted successfully!') ;
    navigate('/jobs')
  }
  return (
    <>
      {/* <!-- Go Back --> */}
      <section>
        <div className = "container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className = "text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className ='mr-2 ' /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className = "bg-indigo-50">
        <div className = "container m-auto py-10 px-6">
          <div className = "grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className = "bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className = "text-gray-500 mb-4">{job.type}</div>
                <h1 className = "text-3xl font-bold mb-4">{job.title}</h1>
                <div className = "text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-orange-700 mr-1" />
                  <p className = "text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className = "bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className = "text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className = "mb-4">
                  {job.description}
                </p>

                <h3 className = "text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                <p className = "mb-4">{job.salary}</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className = "bg-white p-6 rounded-lg shadow-md">
                <h3 className = "text-xl font-bold mb-6">Company Info</h3>

                <h2 className = "text-2xl">{job.company.name}</h2>

                <p className = "my-2">
                  {job.company.description}
                </p>

                <hr className = "my-4" />

                <h3 className = "text-xl">Contact Email:</h3>

                <p className = "my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className = "text-xl">Contact Phone:</h3>

                <p className = "my-2 bg-indigo-100 p-2 font-bold">{job.company.contactPhone}</p>
              </div>

              {/* <!-- Manage --> */}
              <div className = "bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className = "text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className = "bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button onClick = {() => onDeleteClick(job.id)}className = "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

// default export → the page component (When another file imports this file without braces, give them JobPage)
// named export → the loader function
export { JobPage as default, jobLoader };
// or
// export default JobPage;
// export { jobLoader };
