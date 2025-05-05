import { Middleware } from 'redux';
import {
	PROFILE_ORDERS_CONNECT,
	PROFILE_ORDERS_DISCONNECT,
	PROFILE_ORDERS_WS_CONNECTING,
	PROFILE_ORDERS_WS_OPEN,
	PROFILE_ORDERS_WS_CLOSE,
	PROFILE_ORDERS_WS_ERROR,
	PROFILE_ORDERS_WS_MESSAGE,
} from '../actions/profile-orders-actions';

// Type guards остаются без изменений
const isConnectAction = (
	action: any
): action is { type: typeof PROFILE_ORDERS_CONNECT; payload: string } => {
	return (
		action.type === PROFILE_ORDERS_CONNECT && typeof action.payload === 'string'
	);
};

const isDisconnectAction = (
	action: any
): action is { type: typeof PROFILE_ORDERS_DISCONNECT } => {
	return action.type === PROFILE_ORDERS_DISCONNECT;
};

const profileOrdersWsMiddleware: Middleware = (store) => {
	let socket: WebSocket | null = null;

	return (next) => (action) => {
		const { dispatch } = store;

		if (isConnectAction(action)) {
			socket = new WebSocket(action.payload);
			dispatch({ type: PROFILE_ORDERS_WS_CONNECTING });
		}

		if (socket) {
			if (isDisconnectAction(action)) {
				socket.close();
				socket = null;
				return next(action);
			}

			socket.onopen = () => dispatch({ type: PROFILE_ORDERS_WS_OPEN });

			socket.onerror = (event) =>
				dispatch({
					type: PROFILE_ORDERS_WS_ERROR,
					payload: `WebSocket error: ${event.type}`,
				});

			socket.onclose = () => dispatch({ type: PROFILE_ORDERS_WS_CLOSE });

			socket.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					dispatch({ type: PROFILE_ORDERS_WS_MESSAGE, payload: data });
				} catch (error) {
					dispatch({
						type: PROFILE_ORDERS_WS_ERROR,
						payload: 'Failed to parse WebSocket message',
					});
				}
			};
		}

		return next(action);
	};
};

export default profileOrdersWsMiddleware;
