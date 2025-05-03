import { Middleware } from 'redux';
import { RootState } from '../reducers/root-reducer';
import { AppDispatch } from '../store';
import {
	FEED_ORDERS_CONNECT,
	FEED_ORDERS_DISCONNECT,
	FEED_ORDERS_WS_CONNECTING,
	FEED_ORDERS_WS_OPEN,
	FEED_ORDERS_WS_CLOSE,
	FEED_ORDERS_WS_ERROR,
	FEED_ORDERS_WS_MESSAGE,
	TFeedOrdersActions,
} from '../actions/feed-orders-actions';

const feedOrdersWsMiddleware: Middleware<object, RootState, AppDispatch> = (
	store
) => {
	let socket: WebSocket | null = null;

	return (next) => (action) => {
		const { dispatch } = store;

		// Проверяем, что action имеет нужный тип
		if (isFeedOrdersAction(action)) {
			if (action.type === FEED_ORDERS_CONNECT) {
				socket = new WebSocket(action.payload);
				dispatch({ type: FEED_ORDERS_WS_CONNECTING });

				socket.onopen = () => {
					dispatch({ type: FEED_ORDERS_WS_OPEN });
				};

				socket.onerror = () => {
					dispatch({
						type: FEED_ORDERS_WS_ERROR,
						payload: 'Ошибка подключения к ленте заказов',
					});
				};

				socket.onclose = () => {
					dispatch({ type: FEED_ORDERS_WS_CLOSE });
				};

				socket.onmessage = (event) => {
					console.log('Raw WebSocket message:', event.data);
					try {
						const data = JSON.parse(event.data);
						console.log('Parsed WebSocket data:', data); // Логируем распарсенные данные

						if (data.success) {
							console.log('Dispatching orders:', data.orders); // Логируем перед отправкой
							dispatch({
								type: FEED_ORDERS_WS_MESSAGE,
								payload: {
									orders: data.orders,
									total: data.total,
									totalToday: data.totalToday,
								},
							});
						}
					} catch (error) {
						console.error('WebSocket parse error:', error);
						dispatch({
							type: FEED_ORDERS_WS_ERROR,
							payload: 'Ошибка формата данных',
						});
					}
				};
			}

			if (action.type === FEED_ORDERS_DISCONNECT && socket) {
				socket.close();
				socket = null;
			}
		}

		return next(action);
	};
};

// Type guard для проверки типа action
function isFeedOrdersAction(action: unknown): action is TFeedOrdersActions {
	return typeof action === 'object' && action !== null && 'type' in action;
}

export default feedOrdersWsMiddleware;
