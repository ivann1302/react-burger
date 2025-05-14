import React, { useEffect } from 'react';
import {
	Routes,
	Route,
	useNavigate,
	useLocation,
	useNavigationType,
	matchPath,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, AppDispatch } from './../../services/store';
import AppHeader from './../app-header/app-header';
import Home from './../../pages/home/home';
import LoginPage from './../../pages/login/login';
import RegisterPage from './../../pages/register/register';
import ResetPasswordPage from './../../pages/reset-password/reset-password';
import ForgotPasswordPage from './../../pages/forgot-password/forgot-password';
import ProfilePage from './../../pages/profile/profile';
import ProfileOrders from './../../pages/profile/profle-orders/profile-orders';
import PageNotFound from './../../pages/page-not-found/page-not-found';
import IngredientPage from './../../pages/ingredient/ingredient';
import FeedPage from './../../pages/feed/feed-page';
import OrderPage from './../../pages/order/order-page';

import Modal from '../modal/modal';
import OrderDetails from '../burger-constructor/order-details/oreder-details';
import IngredientDetailsModal from './../burger-ingredients/ingredient-details/ingredient-details';
import { TIngredient } from './../../utils/ingredient-types';
import { fetchIngredients } from '../../services/actions/ingredients-actions';
import { checkAuth } from './../../services/actions/auth-actions';
import {
	SET_SELECTED_INGREDIENT,
	CLEAR_SELECTED_INGREDIENT,
} from './../../services/actions/ingredient-details-action';
import { CLEAR_ORDER_DATA } from './../../services/actions/order-actions';

import ProtectedRoute from './../protected-route/protected-route';
import ResetPasswordGuardRoute from '../reset-password-guard-route/reset-password-guard-route';

import { useAppDispatch, useAppSelector } from '../../hooks/typed-hookes';
import styles from './app.module.scss';

const AppContent = () => {
	const dispatch: AppDispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const navigationType = useNavigationType();

	const isIngredientPage = location.pathname.startsWith('/ingredients/');
	const ingredientIdFromUrl = isIngredientPage
		? location.pathname.split('/ingredients/')[1]
		: null;

	const { ingredients, loading, error } = useAppSelector(
		(state) => state.ingredients
	);
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	const { selectedIngredient } = useAppSelector(
		(state) => state.ingredientDetails
	);
	const { orderData, loading: orderLoading } = useAppSelector(
		(state) => state.order
	);

	// Определяем background только если это переход внутри SPA
	const background = location.state?.background;
	const isModalRoute =
		background &&
		background.pathname !== location.pathname &&
		navigationType === 'PUSH';

	// Роуты с номерами заказов
	const feedMatch = matchPath('/feed/:number', location.pathname);
	const profileMatch = matchPath('/profile/orders/:number', location.pathname);

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(checkAuth());

		const token = localStorage.getItem('accessToken');
		if (token?.startsWith('Bearer ')) {
			localStorage.setItem('accessToken', token.replace(/^Bearer\s/, ''));
		}
	}, [dispatch]);

	useEffect(() => {
		if (isAuthenticated === false && location.pathname.startsWith('/profile')) {
			navigate('/login');
		}
	}, [isAuthenticated, location.pathname, navigate]);

	useEffect(() => {
		if (isIngredientPage && !selectedIngredient && ingredients.length > 0) {
			const found = ingredients.find(
				(item: TIngredient) => item._id === ingredientIdFromUrl
			);
			if (found) {
				dispatch({ type: SET_SELECTED_INGREDIENT, payload: found });
			}
		}
	}, [
		dispatch,
		isIngredientPage,
		selectedIngredient,
		ingredients,
		ingredientIdFromUrl,
	]);

	const handleIngredientClick = (ingredient: TIngredient) => {
		dispatch({ type: SET_SELECTED_INGREDIENT, payload: ingredient });
		navigate(`/ingredients/${ingredient._id}`, {
			state: { background: location },
		});
	};

	const handleIngredientModalClose = () => {
		dispatch({ type: CLEAR_SELECTED_INGREDIENT });
		navigate('/', { replace: true });
	};

	const handleOrderModalClose = () => {
		dispatch({ type: CLEAR_ORDER_DATA });
		navigate(-1);
	};

	if (loading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error.message}</div>;

	console.log('Current location:', location);
	console.log('Background (state):', location.state?.background);

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<Routes location={isModalRoute ? background : location}>
					<Route
						path='/'
						element={<Home onIngredientClick={handleIngredientClick} />}
					/>
					<Route
						path='/login'
						element={
							<ProtectedRoute anonymous>
								<LoginPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/register'
						element={
							<ProtectedRoute anonymous>
								<RegisterPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/forgot-password'
						element={
							<ProtectedRoute anonymous>
								<ForgotPasswordPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/reset-password'
						element={
							<ProtectedRoute anonymous>
								<ResetPasswordGuardRoute>
									<ResetPasswordPage />
								</ResetPasswordGuardRoute>
							</ProtectedRoute>
						}
					/>
					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}>
						<Route path='orders' element={<ProfileOrders />} />
					</Route>

					{/* Только если не модалка */}
					{!isModalRoute && (
						<Route
							path='/profile/orders/:number'
							element={
								<ProtectedRoute>
									<OrderPage isProfileOrder />
								</ProtectedRoute>
							}
						/>
					)}
					<Route path='/ingredients/:id' element={<IngredientPage />} />
					<Route path='/feed' element={<FeedPage />} />
					{!isModalRoute && (
						<Route path='/feed/:number' element={<OrderPage />} />
					)}
					<Route path='*' element={<PageNotFound />} />
				</Routes>

				{/* Модалки */}
				{isModalRoute && selectedIngredient && (
					<Modal
						onClose={handleIngredientModalClose}
						header='Детали ингредиента'>
						<IngredientDetailsModal ingredient={selectedIngredient} />
					</Modal>
				)}

				{/* Только если :number найден в path */}
				{isModalRoute && feedMatch?.params?.number && (
					<Modal onClose={() => navigate('/feed')}>
						<OrderPage isModal />
					</Modal>
				)}

				{isModalRoute && profileMatch?.params?.number && (
					<Modal onClose={() => navigate('/profile/orders')}>
						<ProtectedRoute>
							<OrderPage isProfileOrder isModal />
						</ProtectedRoute>
					</Modal>
				)}

				{(orderData || orderLoading) && (
					<Modal onClose={handleOrderModalClose}>
						<OrderDetails />
					</Modal>
				)}
			</main>
		</>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<AppContent />
		</Provider>
	);
}
