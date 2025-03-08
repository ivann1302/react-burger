import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AppHeader from './../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.scss';
import Modal from '../modal/modal';
import OrderDetails from '../burger-constructor/order-details/oreder-details';
import IngredientDetailsModal from './../burger-ingredients/ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/actions/ingredients-actions';
import store from './../../services/store';

function AppContent() {
	const dispatch = useDispatch();
	const { ingredients, loading, error } = useSelector(
		(state) => state.ingredients
	);
	const { selectedIngredient } = useSelector(
		(state) => state.ingredientDetails
	);
	const { orderData } = useSelector((state) => state.order);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isIngredientDetailsOpen, setIsIngredientDetailsOpen] = useState(false);

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	useEffect(() => {
		if (orderData) {
			setIsModalOpen(true); // Открываем модальное окно при успешном заказе
		}
	}, [orderData]);

	const handleModalClose = () => {
		setIsModalOpen(false);
		dispatch({ type: 'CLEAR_ORDER_DATA' });
	};

	const handleIngredientClick = (ingredient) => {
		dispatch({ type: 'SET_SELECTED_INGREDIENT', payload: ingredient });
		setIsIngredientDetailsOpen(true);
	};

	const handleIngredientModalClose = () => {
		setIsIngredientDetailsOpen(false);
		dispatch({ type: 'CLEAR_SELECTED_INGREDIENT' });
	};

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
					<BurgerConstructor />
				</section>
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
