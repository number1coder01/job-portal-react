// rafce = react arrow function component
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  //  Add new Job 
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // Delete Job 
  const deleteJob = async(id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  } 

  const updateJob = async(job) => {
      const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path = "/jobs" element={<JobsPage />} />
        {/* jab yeh run karte toh addJob bhi pass hota */}
        <Route path = "/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        {/* deleteJob passed on as a prop  */}
        <Route path = "/jobs/:id" element={<JobPage deleteJob = {deleteJob} />} loader={jobLoader} />
        {/*LOADER(jobLoader) gives access to the data*/}
        <Route path = '/edit-job/:id' element = {<EditJobPage updateJobSubmit={updateJob}/>} loader = {jobLoader} />
        <Route path = '*' element={<NotFoundPage />} />
      </Route>
    )
  );
  // returning a single element is allowed only
  return <RouterProvider router={router} />;
};

export default App;
