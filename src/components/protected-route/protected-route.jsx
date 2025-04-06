import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, anonymous = false }) => {
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

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
	anonymous: PropTypes.bool,
};

export default ProtectedRoute;
