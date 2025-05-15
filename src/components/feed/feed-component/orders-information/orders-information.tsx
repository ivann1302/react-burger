import { useAppSelector } from '../../../../hooks/typed-hookes';
import OrderCounter from './order-counter/order-counter';
import OrderQueue from './order-queue/order-queue';
import styles from './orders-information.module.scss';

const OrdersInformation = () => {
	const { orders, total, totalToday } = useAppSelector(
		(state) => state.feedOrders
	);

	// Добавим проверку на существование orders
	if (!orders) {
		return <div>Загрузка данных...</div>;
	}

	const doneOrders = orders.filter((order) => order.status === 'done');
	const pendingOrders = orders.filter((order) => order.status !== 'done');

	return (
		<div className={styles.container}>
			<div className={`${styles.queues}`}>
				<OrderQueue title='Готовы:' orders={doneOrders.slice(0, 10)} />
				<OrderQueue title='В работе:' orders={pendingOrders.slice(0, 10)} />
			</div>
			<div className={`${styles.counter}`}>
				<OrderCounter
					name='Выполнено за все время'
					count={total?.toString() || '0'}
				/>
				<OrderCounter
					name='Выполнено за сегодня'
					count={totalToday?.toString() || '0'}
				/>
			</div>
		</div>
	);
};

export default OrdersInformation;
