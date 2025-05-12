import { useAppSelector } from '../../hooks/typed-hookes';
import { Navigate, useLocation } from 'react-router-dom';
type TProtectedRouteProps = {
	children?: React.ReactNode;
	anonymous?: boolean;
};

const ProtectedRoute = ({
	children,
	anonymous = false,
}: TProtectedRouteProps) => {
	const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
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
