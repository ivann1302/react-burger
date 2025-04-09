import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
	children?: React.ReactNode;
	anonymous?: boolean;
};

const ProtectedRoute = ({
	children,
	anonymous = false,
}: TProtectedRouteProps) => {
	// @ts-expect-error 'redux'
	const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
	const location = useLocation();
	const from = location.state?.from || '/';

	if (isLoading) {
		return null;
	}

	if (anonymous && isAuthenticated) {
		return <Navigate to={from} replace />;
	}

	if (!anonymous && !isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return children;
};

export default ProtectedRoute;
