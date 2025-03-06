import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Исправленный импорт
import { rootReducer } from './../../services/reducers/root-reducer';
import AppHeader from './../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.scss';
import Modal from '../modal/modal';
import OrderDetails from '../burger-constructor/order-details/oreder-details';
import IngredientDetailsModal from './../burger-ingredients/ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/actions/ingredients-actions';

// Настройка хранилища с Redux DevTools и redux-thunk
const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware(thunk)); // Используем thunk

const store = createStore(rootReducer, enhancer); // Создаем хранилище

// Основной компонент приложения
function AppContent() {
	const dispatch = useDispatch();

	// Получаем состояние из Redux
	const { ingredients, loading, error } = useSelector(
		(state) => state.ingredients
	);
	const { selectedIngredient } = useSelector(
		(state) => state.ingredientDetails
	);
	const { orderData } = useSelector((state) => state.order);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isIngredientDetailsOpen, setIsIngredientDetailsOpen] = useState(false);

	// Загрузка ингредиентов при монтировании компонента
	useEffect(() => {
		dispatch(fetchIngredients()); // Используем асинхронное действие
	}, [dispatch]);

	// Модальное окно
	const handleOrderClick = (data) => {
		dispatch({ type: 'SET_ORDER_DATA', payload: data }); // Сохраняем данные заказа
		setIsModalOpen(true); // Открываем модальное окно
	};

	const handleModalClose = () => {
		setIsModalOpen(false); // Закрываем модальное окно
		dispatch({ type: 'CLEAR_ORDER_DATA' }); // Сбрасываем данные заказа
	};

	const handleIngredientClick = (ingredient) => {
		dispatch({ type: 'SET_SELECTED_INGREDIENT', payload: ingredient }); // Сохраняем выбранный ингредиент
		setIsIngredientDetailsOpen(true); // Открываем модальное окно с деталями ингредиента
	};

	const handleIngredientModalClose = () => {
		setIsIngredientDetailsOpen(false); // Закрываем модальное окно с деталями ингредиента
		dispatch({ type: 'CLEAR_SELECTED_INGREDIENT' }); // Сбрасываем данные ингредиента
	};

	// Обработка загрузки и ошибок
	if (loading) {
		return <div>Идет загрузка...</div>;
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<h2 className='text text_type_main-large mb-5'>Соберите бургер</h2>
				<section className={styles.container}>
					<BurgerIngredients
						ingredients={ingredients}
						onIngredientClick={handleIngredientClick}
					/>
					<BurgerConstructor
						ingredients={ingredients}
						onOrderClick={handleOrderClick}
					/>
				</section>
			</main>

			{/* Модальное окно с деталями заказа */}
			{isModalOpen && (
				<Modal onClose={handleModalClose} header=''>
					{orderData && <OrderDetails orderData={orderData} />}
				</Modal>
			)}

			{/* Модальное окно с деталями ингредиента */}
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
