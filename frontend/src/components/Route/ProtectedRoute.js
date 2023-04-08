import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
	const { isAuthenticated, loading, user } = useSelector((state) => state.user);

	if (loading === false) {
		return isAuthenticated === false ? <Navigate to="/login" /> : children;
	}

	if (loading === false) {
		if (isAdmin === true && user.role !== "admin") {
			return <Navigate to="/login" />;
		}
	}
	if (loading === false) {
		if (isAdmin === true && user.role !== "restaurant") {
			return <Navigate to="/login" />;
		}
	}
};

export default ProtectedRoute;
