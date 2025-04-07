import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

// Configure axios defaults
axios.defaults.baseURL = "http://localhost:3000";


const AdminHomepage = () => {
  const [users, setUsers] = useState([]);
  const [hordings, setHordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    // Clear all authentication tokens
    localStorage.removeItem("token");
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Navigate to login page
    navigate("/login");
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchHordings()]);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get("/users");
  //     setUsers(response?.data?.data || []);
  //     console.log(users)
  //   } catch (error) {
  //     toast.error("Failed to fetch users");
  //     setUsers([]);
  //   }
  // };
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      const allUsers = response?.data?.data || [];
      const filteredUsers = allUsers.filter(
        user => user.roleId._id === "67bd3f8a8717278a8401f812" || user.roleId._id === "67be8f6378f28218ef82b36b"
      );
      setUsers(filteredUsers);
      console.log(filteredUsers)
    } catch (error) {
      toast.error("Failed to fetch users");
      setUsers([]);
    }
  };
  
  const fetchHordings = async () => {
    try {
      const response = await axios.get("/hording/all");
      setHordings(response?.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch hordings");
      setHordings([]);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };
  

  const deleteHording = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hording?")) return;
  
    try {
      const response = await axios.delete(`/hording/hording/${id}`);
      
      if (response.data.success) {
        setHordings(prev => prev.filter(hording => hording._id !== id));
        toast.success("Hording deleted successfully");
      }
    } catch (error) {
      console.error("Deletion Error:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Failed to delete hording";
      toast.error(errorMessage);
    }
  };
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredHordings = hordings.filter((hording) =>
    `${hording.hoardingType} ${hording.stateId?.name} ${hording.cityId?.name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="admin-scroll-wrapper">
      <div className="admin-container">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-controls">
            <input
              type="text"
              placeholder="Search users or hordings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={fetchData} className="refresh-button">
              Refresh Data
            </button>
                 
           
          </div>
        </header>

        <section className="users-section">
          <h2>Users ({users.length})</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                 
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.age || "-"}</td>
                    
                    <td>{user.roleId?.name || "-"}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="danger-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredUsers.length && <p className="no-data">No users found</p>}
          </div>
        </section>

        <section className="hordings-section">
          <h2>Hordings ({hordings.length})</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Dimensions</th>
                  <th>Rate</th>
                  
                  <th>Location</th>
                  <th>Coordinates</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHordings.map((hording) => (
                  <tr key={hording._id}>
                    <td>{hording.hoardingType}</td>
                    <td>{hording.hoardingDimension}</td>
                    <td>${hording.hourlyRate}/hr</td>
                   
                    <td>
                      {hording.stateId?.name || "N/A"},
                      {hording.cityId?.name || "N/A"},
                      {hording.areaId?.name || "N/A"}
                    </td>
                    <td>
                      {hording.latitude?.toFixed(4) || "N/A"},
                      {hording.longitude?.toFixed(4) || "N/A"}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteHording(hording._id)}
                        className="danger-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredHordings.length && <p className="no-data">No hordings found</p>}
          </div>
        </section>

        <style jsx="true">{`
          .admin-scroll-wrapper {
            max-height: 100vh;
            overflow-y: auto;
          }

          .admin-container {
            padding: 2rem;
            max-width: 1400px;
            margin: 0 auto;
            min-height: 100vh;
          }

          .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
          }

          .admin-controls {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .search-input {
            padding: 0.75rem;
            width: 300px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
          }

          .refresh-button {
            padding: 0.75rem 1.5rem;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: opacity 0.2s;

            &:hover {
              opacity: 0.9;
            }
          }

          .table-container {
            overflow: auto;
            max-height: 60vh;
            border: 1px solid #eee;
            border-radius: 8px;
            margin: 1rem 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .admin-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 1000px;
          }

          .admin-table th,
          .admin-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #eee;
          }

          .admin-table th {
            position: sticky;
            top: 0;
            background: #f8f9fa;
            font-weight: 600;
            z-index: 1;
          }

          .danger-button {
            background: #dc3545;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            transition: opacity 0.2s;

            &:hover {
              opacity: 0.8;
            }
          }

          .no-data {
            text-align: center;
            padding: 2rem;
            color: #666;
          }

          .loading-spinner {
            display: flex;
            justify-content: center;
            padding: 4rem;
          }

          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

export default AdminHomepage;
