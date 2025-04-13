import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from './../../services/store';

type TProtectedRouteProps = {
	children?: React.ReactNode;
	anonymous?: boolean;
};

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
