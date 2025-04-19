import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import { Users, Package, ShoppingCart, Briefcase, UserCheck } from "lucide-react"; // Import UserCheck icon

const Admin = () => {
  return (
    <section className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users, products, orders, and job applications from a single place.</p>
      </div>

      <div className="admin-cards">
        <div className="admin-card card-users">
          <Users className="admin-icon" />
          <h3>Users</h3>
          <p>Manage all registered users</p>
          <Link to="/admin/users" className="admin-btn">
            Go to Users
          </Link>
        </div>

        <div className="admin-card card-products">
          <Package className="admin-icon" />
          <h3>Products</h3>
          <p>View and manage product listings</p>
          <Link to="/admin/products">
            <button className="admin-btn">View Products</button>
          </Link>
        </div>

        <div className="admin-card card-orders">
          <ShoppingCart className="admin-icon" />
          <h3>Orders</h3>
          <p>Track and manage all orders</p>
          <Link to="/admin/orders">
            <button className="admin-btn">Check Orders</button>
          </Link>
        </div>

        <div className="admin-card card-users">
          <Briefcase className="admin-icon" />
          <h3>Job List</h3>
          <p>Add and manage all jobs</p>
          <Link to="/admin/jobmanage">
            <button className="admin-btn">Go to Job List</button>
          </Link>
        </div>

        <div className="admin-card card-products">
          <UserCheck className="admin-icon" /> {/* Updated to UserCheck icon */}
          <h3>Job Applications</h3>
          <p>Track and manage all job applications</p>
          <Link to="/admin/jobapplications">
            <button className="admin-btn">Manage Applications</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;
