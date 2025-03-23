import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const location = useLocation();

	// Явная проверка: null — ещё не знаем, false — неавторизован
	if (isAuthenticated === false) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	// Пока грузится — ничего не делаем (или можyj добавить лоадер)
	if (isAuthenticated === null || isAuthenticated === undefined) {
		return null;
	}

	return children;
};

export default ProtectedRoute;
