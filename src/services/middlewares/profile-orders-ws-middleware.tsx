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

let socket: WebSocket | null = null;
let reconnectAttempt = 0;
const maxReconnectAttempts = 3;
let reconnectTimeout: NodeJS.Timeout | null = null;
let isManualClose = false;

const profileOrdersWsMiddleware: Middleware<
	object,
	RootState,
	Dispatch<AnyAction>
> = (store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => {
	return (next) =>
		(action: unknown): unknown => {
			const { dispatch } = store;

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
					console.log('[WS] Existing socket state:', socket?.readyState);

					// 🛡 Защита от повторного подключения
					if (
						socket &&
						(socket.readyState === WebSocket.CONNECTING ||
							socket.readyState === WebSocket.OPEN)
					) {
						console.warn('[WS] Already connecting or connected. Skipping...');
						return;
					}

					if (socket) {
						isManualClose = true;
						socket.close();
						socket = null;
					}

					try {
						const token = typedAction.payload.split('token=')[1];
						if (!token) throw new Error('Token not found in URL');

						console.log('[WS] Connecting to:', typedAction.payload);
						socket = new WebSocket(typedAction.payload);
						isManualClose = false;
						dispatch({ type: PROFILE_ORDERS_WS_CONNECTING });

						socket.onopen = () => {
							reconnectAttempt = 0;
							console.log('[WS] Connected');
							dispatch({ type: PROFILE_ORDERS_WS_OPEN });
						};

						socket.onerror = (event) => {
							console.error('[WS] Error:', event);
							if (!isManualClose) {
								dispatch({
									type: PROFILE_ORDERS_WS_ERROR,
									payload: 'Connection error',
								});
							}
						};

						socket.onclose = (event: CloseEvent) => {
							console.warn('[WS] Closed:', {
								code: event.code,
								reason: event.reason,
								wasClean: event.wasClean,
							});

							dispatch({ type: PROFILE_ORDERS_WS_CLOSE });

							if (
								!isManualClose &&
								event.code !== 1000 &&
								reconnectAttempt < maxReconnectAttempts
							) {
								reconnectAttempt++;
								console.log(`[WS] Attempting reconnect #${reconnectAttempt}`);
								reconnectTimeout = setTimeout(() => {
									dispatch(connectProfileOrders(typedAction.payload));
								}, 3000 * reconnectAttempt);
							}
						};

						socket.onmessage = (event: MessageEvent) => {
							console.log('[WS] Message:', event.data);

							try {
								const data = JSON.parse(event.data) as WebSocketMessage;

								if (data.message?.includes('Invalid or missing token')) {
									console.warn(
										'[WS] Invalid or missing token, attempting refresh'
									);

									dispatch(updateToken() as any).then(() => {
										const newToken = localStorage.getItem('token');
										if (newToken) {
											const cleanToken = newToken.replace(/['"]/g, '').trim();
											const wsUrl = `${WS_API_WITH_TOKEN}${cleanToken}`;
											console.log('[WS] Reconnecting with new token:', wsUrl);
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
								console.error('[WS] Message parse error:', error);
							}
						};
					} catch (error) {
						console.error('[WS] Setup error:', error);
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
