import { useState } from 'react';
import FeedElement from '../feed-element/feed-element';
import ingredients from './../../../../utils/data';
import style from './feed-container.module.scss';
import Modal from './../../../modal/modal';
import FeedModal from '../feed-modal/feed-modal';

type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

type TOrder = {
	name: string;
	number: string;
	ingredients: TIngredient[];
	price: number;
	status: string;
	createdAt?: string;
};

const FeedContainer = () => {
	const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

	const handleOrderClick = (order: TOrder) => {
		setSelectedOrder(order);
	};

	const closeModal = () => {
		setSelectedOrder(null);
	};

	return (
		<div className={`${style.container} pr-2`}>
			<FeedElement
				name={'Burger1'}
				number={'333333'}
				ingredients={ingredients}
				price={480}
				onClick={() =>
					handleOrderClick({
						name: 'Burger',
						number: '12315',
						ingredients,
						price: 480,
						status: 'Выполнен',
					})
				}
			/>
			<FeedElement
				name={'Burger2'}
				number={'2222222'}
				ingredients={ingredients}
				price={480}
				onClick={() =>
					handleOrderClick({
						name: 'Burger',
						number: '22222',
						ingredients,
						price: 480,
						status: 'Выполнен',
					})
				}
			/>
			<FeedElement
				name={'Burger3'}
				number={'11111'}
				ingredients={ingredients}
				price={480}
				onClick={() =>
					handleOrderClick({
						name: 'Burger',
						number: '12315',
						ingredients,
						price: 480,
						status: 'Выполнен',
					})
				}
			/>
			<FeedElement
				name={'Burger4'}
				number={'555555'}
				ingredients={ingredients}
				price={480}
				onClick={() =>
					handleOrderClick({
						name: 'Burger',
						number: '12315',
						ingredients,
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
