import React, { useEffect, useState } from 'react';
import AppHeader from './../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.scss';
import Modal from '../modal/modal';
import OrderDetails from '../burger-constructor/order-items/oreder-items';
import IngredientDetailsModal from './../burger-ingredients/ingredient-details/ingredient-details';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export default function App() {
	// состояние для ингредиентов, загрузки и ошибок
	const [ingredients, setIngredients] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// состояние для модального окна и данных заказа
	const [orderData, setOrderData] = useState({ name: '0345366' });
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [isIngredientDetailsOpen, setIsIngredientDetailsOpen] = useState(false);

	// юзэффект пре рендеринге компонента App
	useEffect(() => {
		setError(null);

		const fetchIngredients = async () => {
			try {
				setLoading(true);
				const response = await fetch(API_URL);

				if (!response.ok) {
					throw new Error(`Ошибка: ${response.status}`);
				}

				const data = await response.json();
				setIngredients(data.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchIngredients();
	}, []);

	// Модальное окно
	const handleOrderClick = (data) => {
		setOrderData(data); // Сохраняем данные заказа
		setIsModalOpen(true); // Открываем модальное окно
	};

	const handleModalClose = () => {
		setIsModalOpen(false); // Закрываем модальное окно
		setOrderData(null); // Сбрасываем данные заказа
	};

	const handleIngredientClick = (ingredient) => {
		setSelectedIngredient(ingredient);
		setIsIngredientDetailsOpen(true);
	};

	const handleIngredientModalClose = () => {
		setIsIngredientDetailsOpen(false); // Закрываем модальное окно с деталями ингредиента
		setSelectedIngredient(null); // Сбрасываем данные ингредиента
	};

	// обработка загрузки и ошибок
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
