import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../services/store';
import { RootState } from '../../../../services/reducers/root-reducer';
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
import { WS_ORDER_ALL_URL } from '../../../../utils/api';

interface FeedContainerProps {
	mode?: 'feed' | 'profile';
	showStatus?: boolean;
}

const FeedContainer = ({
	mode = 'feed',
	showStatus = false,
}: FeedContainerProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();

	// Выбираем нужный стейт в зависимости от режима
	const { orders, error, wsConnected } = useSelector((state: RootState) =>
		mode === 'profile' ? state.profileOrders : state.feedOrders
	);

	const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

	useEffect(() => {
		if (mode === 'feed') {
			dispatch(feedOrdersConnect(WS_ORDER_ALL_URL));
		}

		return () => {
			if (mode === 'feed') {
				dispatch(feedOrdersDisconnect());
			}
		};
	}, [dispatch, mode]);

	const handleOrderClick = (order: TOrder) => {
		let orderUrl = '';

		if (mode === 'profile') {
			orderUrl = `/profile/orders/${order.number}`;
		} else {
			orderUrl = `/feed/${order.number}`;
		}

		navigate(orderUrl, {
			state: { background: location },
		});
		setSelectedOrder(order);
	};

	const closeModal = () => {
		setSelectedOrder(null);
		navigate(-1);
	};

	if (!wsConnected) {
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
				{error.includes('Invalid or missing token')
					? 'Ошибка авторизации. Пожалуйста, войдите снова'
					: error}
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
					order={order}
					onClick={() => handleOrderClick(order)}
					showStatus={showStatus}
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
