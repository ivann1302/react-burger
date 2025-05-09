import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import {
	PROFILE_ORDERS_CONNECT,
	PROFILE_ORDERS_DISCONNECT,
	PROFILE_ORDERS_WS_CONNECTING,
	PROFILE_ORDERS_WS_OPEN,
	PROFILE_ORDERS_WS_CLOSE,
	PROFILE_ORDERS_WS_ERROR,
	PROFILE_ORDERS_WS_MESSAGE,
	connectProfileOrders,
} from '../actions/profile-orders-actions';
import { WS_API_WITH_TOKEN } from '../../utils/api';
import { updateToken } from '../../services/actions/auth-actions';
import { RootState } from '../reducers/root-reducer';

interface WebSocketMessage {
	message?: string;
	orders?: any[];
	total?: number;
	totalToday?: number;
}

const profileOrdersWsMiddleware: Middleware<
	object,
	RootState,
	Dispatch<AnyAction>
> = (store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => {
	let socket: WebSocket | null = null;
	let reconnectAttempt = 0;
	const maxReconnectAttempts = 3;
	let reconnectTimeout: NodeJS.Timeout | null = null;
	let isManualClose = false;

	return (next) =>
		(action: unknown): unknown => {
			const { dispatch } = store;

			// 👇 Приводим action к AnyAction после проверки
			const isConnectAction = (
				a: AnyAction
			): a is { type: typeof PROFILE_ORDERS_CONNECT; payload: string } =>
				a.type === PROFILE_ORDERS_CONNECT;

			const isDisconnectAction = (
				a: AnyAction
			): a is { type: typeof PROFILE_ORDERS_DISCONNECT } =>
				a.type === PROFILE_ORDERS_DISCONNECT;

			if (typeof action === 'object' && action !== null && 'type' in action) {
				const typedAction = action as AnyAction;

				if (isConnectAction(typedAction)) {
					if (socket) {
						isManualClose = true;
						socket.close();
						socket = null;
					}

					try {
						const token = typedAction.payload.split('token=')[1];
						if (!token) throw new Error('Token not found in URL');

						socket = new WebSocket(typedAction.payload);
						isManualClose = false;
						dispatch({ type: PROFILE_ORDERS_WS_CONNECTING });

						socket.onopen = () => {
							reconnectAttempt = 0;
							dispatch({ type: PROFILE_ORDERS_WS_OPEN });
						};

						socket.onerror = () => {
							if (!isManualClose) {
								dispatch({
									type: PROFILE_ORDERS_WS_ERROR,
									payload: 'Connection error',
								});
							}
						};

						socket.onclose = (event: CloseEvent) => {
							dispatch({ type: PROFILE_ORDERS_WS_CLOSE });

							if (
								!isManualClose &&
								event.code !== 1000 &&
								reconnectAttempt < maxReconnectAttempts
							) {
								reconnectAttempt++;
								reconnectTimeout = setTimeout(() => {
									dispatch(connectProfileOrders(typedAction.payload));
								}, 3000 * reconnectAttempt);
							}
						};

						socket.onmessage = (event: MessageEvent) => {
							try {
								const data = JSON.parse(event.data) as WebSocketMessage;

								if (data.message?.includes('Invalid or missing token')) {
									dispatch(updateToken() as any).then(() => {
										const newToken = localStorage.getItem('token');
										if (newToken) {
											const cleanToken = newToken.replace(/['"]/g, '').trim();
											const wsUrl = `${WS_API_WITH_TOKEN}${cleanToken}`;
											dispatch(connectProfileOrders(wsUrl));
										}
									});
									return;
								}

								if (data.orders) {
									dispatch({
										type: PROFILE_ORDERS_WS_MESSAGE,
										payload: {
											orders: data.orders,
											total: data.total,
											totalToday: data.totalToday,
										},
									});
								}
							} catch (error) {
								console.error('Message parse error:', error);
							}
						};
					} catch (error) {
						dispatch({
							type: PROFILE_ORDERS_WS_ERROR,
							payload: error instanceof Error ? error.message : 'Unknown error',
						});
					}
				}

				if (isDisconnectAction(typedAction) && socket) {
					isManualClose = true;
					if (reconnectTimeout) {
						clearTimeout(reconnectTimeout);
						reconnectTimeout = null;
					}
					socket.close(1000, 'Normal closure');
					socket = null;
				}
			}

			return next(action);
		};
};

export default profileOrdersWsMiddleware;
