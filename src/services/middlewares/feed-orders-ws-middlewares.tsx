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

let socket: WebSocket | null = null;
let connectTimer: NodeJS.Timeout | null = null;
let lastUrl: string | null = null;

const feedOrdersWsMiddleware: Middleware<object, RootState, AppDispatch> = (
	store
) => {
	return (next) => (action) => {
		const { dispatch } = store;

		if (isFeedOrdersAction(action)) {
			if (action.type === FEED_ORDERS_CONNECT) {
				console.log('[WS INIT]', action.payload);

				// Защита от повторного подключения к тому же URL
				if (
					socket &&
					(socket.readyState === WebSocket.OPEN ||
						socket.readyState === WebSocket.CONNECTING)
				) {
					if (action.payload === lastUrl) {
						console.warn(
							'[WS] Already connecting or open to same URL. Skipping.'
						);
						return next(action);
					}
				}

				// Если уже был запущен таймер на соединение — отменяем
				if (connectTimer) {
					clearTimeout(connectTimer);
					connectTimer = null;
				}

				lastUrl = action.payload;

				// Откладываем подключение — предотвращает StrictMode двойные вызовы
				connectTimer = setTimeout(() => {
					socket = new WebSocket(action.payload);
					dispatch({ type: FEED_ORDERS_WS_CONNECTING });

					socket.onopen = () => {
						console.log('[WS OPENED]');
						dispatch({ type: FEED_ORDERS_WS_OPEN });
					};

					socket.onerror = (e) => {
						console.error('[WS ERROR]', e);
						dispatch({
							type: FEED_ORDERS_WS_ERROR,
							payload: 'Ошибка подключения к ленте заказов',
						});
					};

					socket.onclose = (e) => {
						console.warn('[WS CLOSED]', e.code, e.reason);
						dispatch({ type: FEED_ORDERS_WS_CLOSE });
					};

					socket.onmessage = (event) => {
						try {
							const data = JSON.parse(event.data);
							if (data.success) {
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
							console.error('[WS PARSE ERROR]', error);
							dispatch({
								type: FEED_ORDERS_WS_ERROR,
								payload: 'Ошибка формата данных',
							});
						}
					};
				}, 300);
			}

			if (action.type === FEED_ORDERS_DISCONNECT) {
				console.log('[WS DISCONNECT]');

				if (connectTimer) {
					clearTimeout(connectTimer);
					connectTimer = null;
				}

				if (socket) {
					socket.close(1000, 'Normal closure');
					socket = null;
					lastUrl = null;
				}
			}
		}

		return next(action);
	};
};

function isFeedOrdersAction(action: unknown): action is TFeedOrdersActions {
	return typeof action === 'object' && action !== null && 'type' in action;
}

export default feedOrdersWsMiddleware;
