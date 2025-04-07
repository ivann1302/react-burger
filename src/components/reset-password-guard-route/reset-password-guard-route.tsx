import React from 'react';
import { Navigate } from 'react-router-dom';

type TResetPasswordGuardRouteProps = {
	children: React.ReactNode | null;
};

const ResetPasswordGuardRoute = ({
	children,
}: TResetPasswordGuardRouteProps): React.ReactNode => {
	const canReset = sessionStorage.getItem('canResetPassword');

	if (!canReset) {
		return <Navigate to='/forgot-password' replace />;
	}

	return children;
};

export default ResetPasswordGuardRoute;
