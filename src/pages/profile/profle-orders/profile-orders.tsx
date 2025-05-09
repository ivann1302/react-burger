import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/store';
import FeedContainer from '../../../components/feed/feed-component/feed-container/feed-container';
import {
	connectProfileOrders,
	disconnectProfileOrders,
} from '../../../services/actions/profile-orders-actions';
import { WS_API_WITH_TOKEN } from '../../../utils/api';
import styles from './profile-orders.module.scss';

const ProfileOrders = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [connectionStatus, setConnectionStatus] = useState<
		'connecting' | 'connected' | 'error'
	>('connecting');

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			console.error('Token not found');
			setConnectionStatus('error');
			return;
		}

		// Убедимся, что токен чистый (без кавычек и пробелов)
		const cleanToken = token.replace(/['"]/g, '').trim();
		const wsUrl = `${WS_API_WITH_TOKEN}${cleanToken}`;

		console.log('Connecting to:', wsUrl); // Отладочная информация

		dispatch(connectProfileOrders(wsUrl));

		return () => {
			dispatch(disconnectProfileOrders());
		};
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<h1 className='text text_type_main-large mb-6'>История заказов</h1>
			{connectionStatus === 'error' && (
				<p className='text text_type_main-default text_color_error'>
					Ошибка подключения. Пожалуйста, войдите снова.
				</p>
			)}
			<FeedContainer mode='profile' showStatus={true} />
		</div>
	);
};

export default ProfileOrders;
