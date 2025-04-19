import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./joblistpage.css";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from Firestore
  const fetchJobs = async () => {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const jobList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setJobs(jobList);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="job-list-page">
      <h1>Job Listings</h1>

      <div className="job-list">
        {jobs.length === 0 ? (
          <p>No jobs available right now.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-item" key={job.id}>
              <h3>{job.title}</h3>
              <p><strong>Brand:</strong> {job.brand}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p>{job.description}</p>
              <Link to={`/apply/${job.id}`} className="apply-btn">
                Apply
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobListPage;
