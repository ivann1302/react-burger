import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../... /../../../../services/store';
import { RootState } from '@services/reducers/root-reducer';
import FeedElement from '../feed-element/feed-element';
import style from './feed-container.module.scss';
import Modal from '../../../modal/modal';
import FeedModal from '../feed-modal/feed-modal';
import {
	feedOrdersConnect,
	feedOrdersDisconnect,
} from '../../../../services/actions/feed-orders-actions';
import { useNavigate, useLocation } from 'react-router-dom';
import { TOrder } from '../../../../utils/ingredient-types';
import { WS_ORDER_ALL_URL } from '@utils/api';

const FeedContainer = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();
	const { orders, loading, error, wsConnected } = useSelector(
		(state: RootState) => state.feedOrders
	);

	const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

	useEffect(() => {
		dispatch(feedOrdersConnect(WS_ORDER_ALL_URL));

		return () => {
			dispatch(feedOrdersDisconnect());
		};
	}, [dispatch]);

	const handleOrderClick = (order: TOrder) => {
		// Изменяем URL на номер заказа
		navigate(`/feed/${order._id}`, {
			state: { background: location }, // Сохраняем текущий location для возврата
		});
		setSelectedOrder(order);
	};

	const closeModal = () => {
		setSelectedOrder(null);
		// Возвращаемся на предыдущий URL при закрытии модалки
		navigate(-1);
	};

	if (loading && !wsConnected) {
		return (
			<div className={`${style.status} text text_type_main-default`}>
				Подключение к ленте заказов...
			</div>
		);
	}

	if (error) {
		return (
			<div
				className={`${style.status} text text_type_main-default text_color_error`}>
				{error}
			</div>
		);
	}

	if (!orders || orders.length === 0) {
		return (
			<div className={`${style.status} text text_type_main-default`}>
				Заказов пока нет
			</div>
		);
	}

	return (
		<div className={`${style.container} pr-3`}>
			{orders.map((order: TOrder) => (
				<FeedElement
					key={order._id}
					_id={order._id}
					name={order.name}
					number={order.number}
					ingredients={order.ingredients}
					status={order.status}
					createdAt={order.createdAt}
					updatedAt={order.updatedAt}
					onClick={() => handleOrderClick(order)}
				/>
			))}

			{selectedOrder && (
				<Modal onClose={closeModal} header={`#${selectedOrder.number}`}>
					<FeedModal order={selectedOrder} />
				</Modal>
			)}
		</div>
	);
};

export default FeedContainer;
