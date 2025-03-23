import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, Provider } from 'react-redux';
import AppHeader from './../app-header/app-header';
import Home from './../../pages/home/home';
import LoginPage from './../../pages/login/login';
import RegisterPage from './../../pages/register/register';
import ResetPasswordPage from './../../pages/reset-password/reset-password';
import ForgotPasswordPage from './../../pages/forgot-password/forgot-password';
import ProfilePage from './../../pages/profile/profile';
import PageNotFound from './../../pages/page-not-found/page-not-found';
import Modal from '../modal/modal';
import OrderDetails from '../burger-constructor/order-details/oreder-details';
import IngredientDetailsModal from './../burger-ingredients/ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/actions/ingredients-actions';
import { checkAuth } from './../../services/actions/auth-actions';
import store from './../../services/store';
import {
	SET_SELECTED_INGREDIENT,
	CLEAR_SELECTED_INGREDIENT,
} from './../../services/actions/ingredient-details-action';
import { CLEAR_ORDER_DATA } from './../../services/actions/order-actions';
import ProtectedRoute from './../protected-route/protected-route';
import OnlyUnAuthRoute from '../only-unauth-route/only-unauth-route';
import styles from './app.module.scss';

function AppContent() {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // ⬅️ добавлено
	const location = useLocation(); // ⬅️ добавлено

	const { loading, error } = useSelector((state) => state.ingredients);
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { selectedIngredient } = useSelector(
		(state) => state.ingredientDetails
	);
	const { orderData } = useSelector((state) => state.order);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isIngredientDetailsOpen, setIsIngredientDetailsOpen] = useState(false);

	// очистка токена
	useEffect(() => {
		const rawToken = localStorage.getItem('token');
		if (rawToken?.startsWith('Bearer ')) {
			const cleaned = rawToken.replace(/^Bearer\s/, '');
			localStorage.setItem('token', cleaned);
		}
	}, []);

	// ⬇️ автоматический редирект при выходе, если пользователь остался на /profile
	useEffect(() => {
		if (isAuthenticated === false && location.pathname.startsWith('/profile')) {
			navigate('/login');
		}
	}, [isAuthenticated, location.pathname, navigate]);

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(checkAuth());
	}, [dispatch]);

	useEffect(() => {
		if (orderData) {
			setIsModalOpen(true);
		}
	}, [orderData]);

	const handleModalClose = () => {
		setIsModalOpen(false);
		dispatch({ type: CLEAR_ORDER_DATA });
	};

	const handleIngredientClick = (ingredient) => {
		dispatch({ type: SET_SELECTED_INGREDIENT, payload: ingredient });
		setIsIngredientDetailsOpen(true);
	};

	const handleIngredientModalClose = () => {
		setIsIngredientDetailsOpen(false);
		dispatch({ type: CLEAR_SELECTED_INGREDIENT });
	};

	if (loading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error}</div>;
	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<Routes>
					<Route
						path='/'
						element={<Home onIngredientClick={handleIngredientClick} />}
					/>

					<Route
						path='/login'
						element={
							<OnlyUnAuthRoute>
								<LoginPage />
							</OnlyUnAuthRoute>
						}
					/>
					<Route
						path='/register'
						element={
							<OnlyUnAuthRoute>
								<RegisterPage />
							</OnlyUnAuthRoute>
						}
					/>
					<Route
						path='/forgot-password'
						element={
							<OnlyUnAuthRoute>
								<ForgotPasswordPage />
							</OnlyUnAuthRoute>
						}
					/>
					<Route
						path='/reset-password'
						element={
							<OnlyUnAuthRoute>
								<ResetPasswordPage />
							</OnlyUnAuthRoute>
						}
					/>

					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>

					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</main>

			{isModalOpen && (
				<Modal onClose={handleModalClose} header=''>
					<OrderDetails orderData={orderData} />
				</Modal>
			)}

			{isIngredientDetailsOpen && (
				<Modal onClose={handleIngredientModalClose} header='Детали ингредиента'>
					<IngredientDetailsModal
						ingredient={selectedIngredient}
						onClose={handleIngredientModalClose}
					/>
				</Modal>
			)}
		</>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<AppContent />
		</Provider>
	);
}
