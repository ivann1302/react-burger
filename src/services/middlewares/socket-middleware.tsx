import { Middleware, MiddlewareAPI } from 'redux';
import { TFeedOrdersActions } from '../actions/feed-orders-actions';
import { TProfileOrdersActions } from '../actions/profile-orders-actions';
import { RootState } from '../reducers/root-reducer';
import { AppDispatch } from '../store';

export interface TWSActionNames {
	WS_CONNECT: string;
	WS_DISCONNECT: string;
	WS_CONNECTING: string;
	WS_OPEN: string;
	WS_CLOSE: string;
	WS_ERROR: string;
	WS_MESSAGE: string;
	WS_SEND_MESSAGE?: string;
}

type TSocketActions = TFeedOrdersActions | TProfileOrdersActions;

// Тайпгард для payload
const hasPayload = (action: unknown): action is { payload: any } =>
	typeof action === 'object' && action !== null && 'payload' in action;

export const socketMiddleware = (
	wsActions: TWSActionNames
): Middleware<object, RootState, AppDispatch> => {
	let socket: WebSocket | null = null;
	let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	let isManuallyClosed = false;
	let lastUrl: string | null = null;

	return (store: MiddlewareAPI<AppDispatch, RootState>) =>
		(next) =>
		(action: unknown) => {
			const typedAction = action as TSocketActions;
			const { dispatch } = store;

			switch (typedAction.type) {
				case wsActions.WS_CONNECT: {
					if (!hasPayload(action)) break;
					const url = action.payload;

					if (
						socket &&
						(socket.readyState === WebSocket.OPEN ||
							socket.readyState === WebSocket.CONNECTING)
					) {
						if (url === lastUrl) {
							console.warn('[WS] Already connected to same URL');
							return;
						}
						socket.close(1000, 'Reconnecting');
					}

					lastUrl = url;
					isManuallyClosed = false;
					dispatch({ type: wsActions.WS_CONNECTING } as TSocketActions);

					socket = new WebSocket(url);

					socket.onopen = () =>
						dispatch({ type: wsActions.WS_OPEN } as TSocketActions);

					socket.onerror = () =>
						dispatch({
							type: wsActions.WS_ERROR,
							payload: 'WebSocket error',
						} as TSocketActions);

					socket.onclose = (event) => {
						dispatch({ type: wsActions.WS_CLOSE } as TSocketActions);

						if (!isManuallyClosed && event.code !== 1000) {
							reconnectTimer = setTimeout(() => {
								dispatch({
									type: wsActions.WS_CONNECT,
									payload: url,
								} as TSocketActions);
							}, 3000);
						}
					};

					socket.onmessage = (event) => {
						try {
							const data = JSON.parse(event.data);
							if (data.message?.includes('Invalid or missing token')) {
								dispatch({
									type: wsActions.WS_ERROR,
									payload: 'Invalid or missing token',
								} as TSocketActions);
								socket?.close();
							} else {
								dispatch({
									type: wsActions.WS_MESSAGE,
									payload: data,
								} as TSocketActions);
							}
						} catch {
							dispatch({
								type: wsActions.WS_ERROR,
								payload: 'Message parse error',
							} as TSocketActions);
						}
					};

					break;
				}

				case wsActions.WS_DISCONNECT: {
					isManuallyClosed = true;
					if (reconnectTimer) clearTimeout(reconnectTimer);
					socket?.close(1000, 'Manual disconnect');
					socket = null;
					break;
				}

				default: {
					if (
						wsActions.WS_SEND_MESSAGE &&
						typedAction.type === wsActions.WS_SEND_MESSAGE &&
						socket?.readyState === WebSocket.OPEN &&
						hasPayload(action)
					) {
						socket.send(JSON.stringify(action.payload));
					}
				}
			}

			return next(action);
		};
};
