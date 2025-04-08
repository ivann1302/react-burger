import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, Provider } from 'react-redux';

import store from './../../services/store';
import AppHeader from './../app-header/app-header';
import Home from './../../pages/home/home';
import LoginPage from './../../pages/login/login';
import RegisterPage from './../../pages/register/register';
import ResetPasswordPage from './../../pages/reset-password/reset-password';
import ForgotPasswordPage from './../../pages/forgot-password/forgot-password';
import ProfilePage from './../../pages/profile/profile';
import PageNotFound from './../../pages/page-not-found/page-not-found';
import IngredientPage from './../../pages/ingredient/ingredient';

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

import styles from './app.module.scss';

const AppContent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const isIngredientPage = location.pathname.startsWith('/ingredients/');
	const ingredientIdFromUrl = isIngredientPage
		? location.pathname.split('/ingredients/')[1]
		: null;

	const { ingredients, loading, error } = useSelector(
		// @ts-expect-error 'redux'
		(state) => state.ingredients
	);
	// @ts-expect-error 'redux'
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { selectedIngredient } = useSelector(
		// @ts-expect-error 'redux'
		(state) => state.ingredientDetails
	);
	// @ts-expect-error 'redux'
	const { orderData } = useSelector((state) => state.order);

	// Определяем фон — откуда мы пришли, если был клик по ингредиенту
	const background = location.state?.background || null;

	// Загружаем ингредиенты и авторизацию
	useEffect(() => {
		// @ts-expect-error 'redux'
		dispatch(fetchIngredients());
		// @ts-expect-error 'redux'
		dispatch(checkAuth());

		const token = localStorage.getItem('token');
		if (token?.startsWith('Bearer ')) {
			localStorage.setItem('token', token.replace(/^Bearer\s/, ''));
		}
	}, [dispatch]);

	// Если пользователь не авторизован, а находится на закрытой странице
	useEffect(() => {
		if (isAuthenticated === false && location.pathname.startsWith('/profile')) {
			navigate('/login');
		}
	}, [isAuthenticated, location.pathname, navigate]);

	// Если модалка открыта по ссылке — подгружаем нужный ингредиент вручную
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

	// Клик по ингредиенту
	const handleIngredientClick = (ingredient: TIngredient) => {
		dispatch({ type: SET_SELECTED_INGREDIENT, payload: ingredient });

		navigate(`/ingredients/${ingredient._id}`, {
			state: { background: location },
		});
	};

	// Закрытие модалки ингредиента
	const handleIngredientModalClose = () => {
		dispatch({ type: CLEAR_SELECTED_INGREDIENT });
		navigate('/', { replace: true });
	};

	// Закрытие модалки заказа
	const handleOrderModalClose = () => {
		dispatch({ type: CLEAR_ORDER_DATA });
		navigate(-1);
	};

	if (loading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error}</div>;

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				{/* Основные маршруты */}
				<Routes location={background || location}>
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
						}
					/>
					<Route path='/ingredients/:id' element={<IngredientPage />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>

				{/* Модалка с ингредиентом, если был переход из фона */}
				{background && selectedIngredient && (
					<Modal
						onClose={handleIngredientModalClose}
						header='Детали ингредиента'>
						<IngredientDetailsModal ingredient={selectedIngredient} />
					</Modal>
				)}

				{orderData && (
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
