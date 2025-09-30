import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!token || !user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }
    return children;
}


