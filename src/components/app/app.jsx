import React, { useEffect, useState } from 'react';
import AppHeader from './../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.scss';
import Modal from '../modal/modal';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export default function App() {
	// хуки для сохранения состояния запроса и получения данных
	const [ingredients, setIngredients] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

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
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchIngredients();
	}, []);

	// Модальное окно
	const [isModalOpen, setIsModalOpen] = useState(true);

	//const handleOpenModal = () => {
	// setIsModalOpen(true);
	//};

	const handleModalClose = () => {
		setIsModalOpen(false);
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
					<BurgerIngredients ingredients={ingredients} />
					<BurgerConstructor ingredients={ingredients} />
				</section>
			</main>
			{isModalOpen && (
				<Modal onClose={handleModalClose} header=''>
					<p>Содержимое модального окна</p>
				</Modal>
			)}
		</>
	);
}
