import { useEffect, useRef } from 'react';
import FeedElement from '../feed-element/feed-element';
import style from './feed-container.module.scss';
import {
	feedOrdersConnect,
	feedOrdersDisconnect,
} from '../../../../services/actions/feed-orders-actions';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../hooks/typed-hookes';

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
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { orders, error, wsConnected } = useAppSelector((state) =>
		mode === 'profile' ? state.profileOrders : state.feedOrders
	);

	const connectedOnce = useRef(false);

	useEffect(() => {
		if (mode === 'feed' && !connectedOnce.current) {
			dispatch(feedOrdersConnect(WS_ORDER_ALL_URL));
			connectedOnce.current = true;
		}

		return () => {
			if (mode === 'feed') {
				dispatch(feedOrdersDisconnect());
				connectedOnce.current = false;
			}
		};
	}, [dispatch, mode]);

	const handleOrderClick = (order: TOrder) => {
		const orderUrl =
			mode === 'profile'
				? `/profile/orders/${order.number}`
				: `/feed/${order.number}`;

		navigate(orderUrl, {
			state: { background: location },
		});
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
		</div>
	);
};

export default FeedContainer;
