import React, { useEffect, useRef, useState } from 'react';
import FeedContainer from '../../../components/feed/feed-component/feed-container/feed-container';
import {
	connectProfileOrders,
	disconnectProfileOrders,
} from '../../../services/actions/profile-orders-actions';
import { WS_API_WITH_TOKEN } from '../../../utils/api';
import styles from './profile-orders.module.scss';
import { useAppSelector, useAppDispatch } from '../../../hooks/typed-hookes';

const ProfileOrders = () => {
	const dispatch = useAppDispatch();
	const [connectedOnce, setConnectedOnce] = useState(false);

	const wsConnected = useAppSelector(
		(state) => state.profileOrders.wsConnected
	);

	const didConnect = useRef(false);

	useEffect(() => {
		if (wsConnected) {
			didConnect.current = true;
		}
	}, [wsConnected]);

	useEffect(() => {
		if (connectedOnce) return;

		const token = localStorage.getItem('accessToken');
		if (!token) {
			console.error('Token not found');
			return;
		}

		const cleanToken = token.replace(/['"]/g, '').trim();
		const wsUrl = `${WS_API_WITH_TOKEN}${cleanToken}`;

		console.log('Connecting to:', wsUrl);
		dispatch(connectProfileOrders(wsUrl));
		setConnectedOnce(true);

		return () => {
			if (didConnect.current) {
				dispatch(disconnectProfileOrders());
			} else {
				console.log('[WS] Cleanup skipped: never connected');
			}
		};
	}, [dispatch, connectedOnce]);

	return (
		<div className={styles.container}>
			<h1 className='text text_type_main-large mb-6'>История заказов</h1>
			<FeedContainer mode='profile' showStatus={true} />
		</div>
	);
};

export default ProfileOrders;
