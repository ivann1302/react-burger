import { useState } from 'react';
import FeedElement from '../feed-element/feed-element';
import ingredients from './../../../../utils/data';
import style from './feed-container.module.scss';
import Modal from './../../../modal/modal';
import FeedModal from '../feed-modal/feed-modal';
import { TOrder, TIngredient } from '@utils/ingredient-types';

const FeedContainer = () => {
	const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

	const handleOrderClick = (order: TOrder) => {
		setSelectedOrder(order);
	};

	const closeModal = () => {
		setSelectedOrder(null);
	};

	// Преобразуем ингредиенты в массив ID
	const typedIngredients = ingredients as TIngredient[];
	const ingredientIds = typedIngredients.map((ing) => ing._id);

	return (
		<div className={`${style.container} pr-2`}>
			<FeedElement
				name={'Burger1'}
				number={'333333'}
				ingredientIds={ingredientIds} // Передаем массив ID
				price={480}
				onClick={() =>
					handleOrderClick({
						name: 'Burger',
						number: '12315',
						ingredientIds: ingredientIds, // Соответствует TOrder
						price: 480,
						status: 'Выполнен',
					})
				}
			/>

			<FeedElement
				name={'Burger2'}
				number={'2222222'}
				ingredientIds={ingredientIds}
				price={480}
				onClick={() =>
					handleOrderClick({
						name: 'Burger',
						number: '22222',
						ingredientIds: ingredientIds,
						price: 480,
						status: 'Выполнен',
					})
				}
			/>
			<FeedElement
				name={'Burger3'}
				number={'11111'}
				ingredientIds={ingredientIds}
				price={480}
				onClick={() =>
					handleOrderClick({
						name: 'Burger',
						number: '12315',
						ingredientIds: ingredientIds,
						price: 480,
						status: 'Выполнен',
					})
				}
			/>
			<FeedElement
				name={'Burger4'}
				number={'555555'}
				ingredientIds={ingredientIds}
				price={480}
				onClick={() =>
					handleOrderClick({
						name: 'Burger',
						number: '12315',
						ingredientIds: ingredientIds,
						price: 480,
						status: 'Выполнен',
					})
				}
			/>

			{selectedOrder && (
				<Modal onClose={closeModal} header={`#${selectedOrder.number}`}>
					<FeedModal selectedOrder={selectedOrder} />
				</Modal>
			)}
		</div>
	);
};

export default FeedContainer;
