import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ResetPasswordGuardRoute = ({ children }) => {
	const canReset = sessionStorage.getItem('canResetPassword');

	if (!canReset) {
		return <Navigate to='/forgot-password' replace />;
	}

	return children;
};

ResetPasswordGuardRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ResetPasswordGuardRoute;
