import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import "./jobapplications.css";

const AdminJobApplications = () => {
  const [applications, setApplications] = useState([]);

  // Fetching all applications and associated job details
  const fetchApplications = async () => {
    const querySnapshot = await getDocs(collection(db, "applications"));
    const apps = await Promise.all(
      querySnapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        const jobRef = doc(db, "jobs", data.jobId);
        const jobSnap = await getDoc(jobRef);
        const jobData = jobSnap.exists() ? jobSnap.data() : {};
        return {
          id: docSnap.id,
          ...data,
          jobTitle: jobData.title || "Job not found",
        };
      })
    );
    setApplications(apps);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle deleting an application
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this application?");
    if (!confirmDelete) return;
    await deleteDoc(doc(db, "applications", id));
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <div className="admin-applications-page">
      <h1>Job Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <div className="application-card" key={app.id}>
              <h3>{app.jobTitle}</h3>
              <p><strong>Name:</strong> {app.userName}</p>
              <p><strong>Email:</strong> {app.userEmail}</p>
              {app.userResume && (
                <p>
                  <strong>Resume:</strong>{" "}
                  <a href={app.userResume} target="_blank" rel="noreferrer">
                    View
                  </a>{" "}
                  |{" "}
                  <a href={app.userResume} download>
                    Download
                  </a>
                </p>
              )}
              <button
                onClick={() => handleDelete(app.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminJobApplications;
