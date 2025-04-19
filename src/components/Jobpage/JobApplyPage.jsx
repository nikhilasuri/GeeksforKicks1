import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../../firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import "./JobApplyPage.css";

const JobApplyPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userResume, setUserResume] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      const docRef = doc(db, "jobs", jobId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setJob(docSnap.data());
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // Allowed image types (for example, png, jpeg, and jpg)
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && allowedImageTypes.includes(file.type)) {
      setUserResume(file);
    } else {
      alert("Only image files (JPG, PNG, GIF) are allowed.");
      e.target.value = null;
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nik_lio"); // Your Cloudinary preset

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dtzp3yda6/raw/upload",
      formData
    );
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !userEmail) {
      alert("Please enter your name and email.");
      return;
    }

    try {
      let resumeUrl = "";
      if (userResume) {
        resumeUrl = await handleFileUpload(userResume);
      }

      await addDoc(collection(db, "applications"), {
        jobId,
        userName,
        userEmail,
        userResume: resumeUrl,
        appliedAt: new Date(),
      });

      setSuccessMessage("You have successfully applied for the job!");
      setUserName("");
      setUserEmail("");
      setUserResume(null);
      setTimeout(() => navigate("/joblist"), 2000);
    } catch (error) {
      console.error("Error applying: ", error);
      alert("Failed to apply.");
    }
  };

  return (
    <div className="job-apply-page">
      {job ? (
        <>
          <h1>Apply for: {job.title}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <input 
              type="file" 
              accept="image/jpeg,image/png,image/gif" 
              onChange={handleFileChange} 
            />
            <button type="submit" className="apply-btn">
              Submit Application
            </button>
          </form>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
};

export default JobApplyPage;
