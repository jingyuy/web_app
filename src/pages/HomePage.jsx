import React, { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual backend URL
    const backendUrl = "http://localhost:8000/home";
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    axios
      .get(backendUrl, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch data.");
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Data from backend:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default HomePage;