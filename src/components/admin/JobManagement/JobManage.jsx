import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import "./jobpage.css";

const AdminAddJobPage = () => {
  const [jobData, setJobData] = useState({
    title: "",
    brand: "",
    location: "",
    type: "",
    description: "",
  });

  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);

  // Fetch jobs from Firestore
  const fetchJobs = async () => {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const jobList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setJobs(jobList);
  };

  useEffect(() => {
    fetchJobs();
  }, []); // Runs once when the component mounts

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingJobId) {
      // Edit existing job
      const jobRef = doc(db, "jobs", editingJobId);
      await updateDoc(jobRef, jobData);
      alert("Job updated successfully!");
    } else {
      // Add new job
      await addDoc(collection(db, "jobs"), jobData);
      alert("Job added successfully!");
    }
    setJobData({ title: "", brand: "", location: "", type: "", description: "" });
    setEditingJobId(null); // Reset editing state
    fetchJobs(); // Refresh the job list after submitting
  };

  const handleEdit = (job) => {
    setEditingJobId(job.id);
    setJobData(job); // Pre-fill form with the job details
  };

  const handleDelete = async (jobId) => {
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      alert("Job deleted successfully!");
      fetchJobs(); // Refresh the job list after deleting
    } catch (error) {
      console.error("Error deleting job: ", error);
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="admin-job-page">
      <h2 className="form-header">{editingJobId ? "Edit Job" : "Add a Job"}</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <input
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            name="brand"
            placeholder="Brand"
            value={jobData.brand}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            name="location"
            placeholder="Location"
            value={jobData.location}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            name="type"
            placeholder="Type (Full Time, Part Time...)"
            value={jobData.type}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Job Description"
            value={jobData.description}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>
        <button type="submit" className="submit-btn">{editingJobId ? "Update Job" : "Add Job"}</button>
      </form>

      <div className="job-list-container">
        <h3 className="job-list-header">Jobs List</h3>
        {jobs.length > 0 ? (
          <ul className="job-list">
            {jobs.map((job) => (
              <li key={job.id} className="job-item">
                <h4 className="job-title">{job.title}</h4>
                <p><strong>Brand:</strong> {job.brand}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <div className="job-action-buttons">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(job)}>Edit</button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(job.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAddJobPage;
