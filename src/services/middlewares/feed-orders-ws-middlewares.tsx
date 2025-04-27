import { Middleware, MiddlewareAPI } from 'redux';
import { RootState, AppDispatch } from '../reducers/root-reducer';
import {
	FEED_ORDERS_CONNECT,
	FEED_ORDERS_DISCONNECT,
	FEED_ORDERS_WS_CONNECTING,
	FEED_ORDERS_WS_OPEN,
	FEED_ORDERS_WS_CLOSE,
	FEED_ORDERS_WS_ERROR,
	FEED_ORDERS_WS_MESSAGE,
	TFeedOrdersActions,
} from './../actions/feed-orders-actions';

const feedOrdersWsMiddleware: Middleware<
	unknown, // Тип для дополнительных свойств (не используем)
	RootState, // Тип состояния
	AppDispatch // Тип dispatch
> = (store: MiddlewareAPI<AppDispatch, RootState>) => {
	let socket: WebSocket | null = null;

	return (next) => (action: unknown) => {
		// Используем `unknown` вместо `TFeedOrdersActions`
		const { dispatch } = store;

		// Проверяем, что action имеет тип TFeedOrdersActions
		if (typeof action === 'object' && action !== null && 'type' in action) {
			const typedAction = action as TFeedOrdersActions;

			if (typedAction.type === FEED_ORDERS_CONNECT) {
				socket = new WebSocket(typedAction.payload);
				dispatch({ type: FEED_ORDERS_WS_CONNECTING });
			}

			if (socket) {
				socket.onopen = () => {
					dispatch({ type: FEED_ORDERS_WS_OPEN });
				};

				socket.onerror = () => {
					dispatch({
						type: FEED_ORDERS_WS_ERROR,
						payload: 'WebSocket error',
					});
				};

				socket.onclose = () => {
					dispatch({ type: FEED_ORDERS_WS_CLOSE });
				};

				socket.onmessage = (event) => {
					try {
						const data = JSON.parse(event.data);
						if (data.success) {
							dispatch({
								type: FEED_ORDERS_WS_MESSAGE,
								payload: data,
							});
						}
					} catch (err) {
						console.error('Error parsing WebSocket message:', err);
						dispatch({
							type: FEED_ORDERS_WS_ERROR,
							payload: 'Invalid WebSocket message format',
						});
					}
				};
			}

			if (typedAction.type === FEED_ORDERS_DISCONNECT && socket) {
				socket.close();
				socket = null;
			}
		}

		return next(action); // Пропускаем action дальше, даже если он не TFeedOrdersActions
	};
};

export default feedOrdersWsMiddleware;
