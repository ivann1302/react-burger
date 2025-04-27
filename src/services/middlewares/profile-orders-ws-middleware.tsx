import { Middleware } from 'redux';
import { RootState } from './../reducers/root-reducer';
import {
	PROFILE_ORDERS_CONNECT,
	PROFILE_ORDERS_DISCONNECT,
	PROFILE_ORDERS_WS_CONNECTING,
	PROFILE_ORDERS_WS_OPEN,
	PROFILE_ORDERS_WS_CLOSE,
	PROFILE_ORDERS_WS_ERROR,
	PROFILE_ORDERS_WS_MESSAGE,
} from '../actions/profile-orders-actions';

const profileOrdersWsMiddleware = (): Middleware<unknown, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;

		return (next) => (action: unknown) => {
			const { dispatch } = store;

			// Проверяем, что action имеет нужную структуру
			if (typeof action === 'object' && action !== null && 'type' in action) {
				const typedAction = action as { type: string; payload?: unknown };

				// Обрабатываем только нужные actions
				if (typedAction.type === PROFILE_ORDERS_CONNECT) {
					if (typeof typedAction.payload === 'string') {
						socket = new WebSocket(typedAction.payload);
						dispatch({ type: PROFILE_ORDERS_WS_CONNECTING });
					} else {
						console.error('WebSocket URL must be a string');
						return next(action);
					}
				}

				if (socket) {
					if (typedAction.type === PROFILE_ORDERS_DISCONNECT) {
						socket.close();
						socket = null;
						return next(action);
					}

					// Настройка обработчиков WebSocket
					socket.onopen = () => {
						dispatch({ type: PROFILE_ORDERS_WS_OPEN });
					};

					socket.onerror = (event) => {
						dispatch({
							type: PROFILE_ORDERS_WS_ERROR,
							payload: `WebSocket error: ${event.type}`,
						});
					};

					socket.onclose = () => {
						dispatch({ type: PROFILE_ORDERS_WS_CLOSE });
					};

					socket.onmessage = (event) => {
						try {
							const data = JSON.parse(event.data);
							dispatch({
								type: PROFILE_ORDERS_WS_MESSAGE,
								payload: data,
							});
						} catch (error) {
							dispatch({
								type: PROFILE_ORDERS_WS_ERROR,
								payload: 'Failed to parse WebSocket message',
							});
						}
					};
				}
			}

			return next(action);
		};
	};
};

export default profileOrdersWsMiddleware;
