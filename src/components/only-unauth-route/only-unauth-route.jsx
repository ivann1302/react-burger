import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
const OnlyUnAuthRoute = ({ children }) => {
	const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
	const location = useLocation();

	// Показываем прелоадер, пока статус не определён
	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	// Если пользователь авторизован — редирект
	if (isAuthenticated) {
		const from = location.state?.from?.pathname || '/';
		return <Navigate to={from} replace />;
	}

	return children;
};

OnlyUnAuthRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default OnlyUnAuthRoute;
