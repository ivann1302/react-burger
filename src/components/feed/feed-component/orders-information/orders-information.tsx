import OrderCounter from './order-counter/order-counter';
import OrderQueue from './order-queue/order-queue';
import styles from './orders-information.module.scss';
const OrdersInformation = () => {
	return (
		<div className={styles.container}>
			<div className={`${styles.queues}`}>
				<OrderQueue title='Готовы:'></OrderQueue>
				<OrderQueue title='В работе:'></OrderQueue>
			</div>
			<div className={`${styles.counter}`}>
				<OrderCounter
					name='Выполнено за все время'
					count='28 752'></OrderCounter>
				<OrderCounter name='Выполнено за сегодня' count='130'></OrderCounter>
			</div>
		</div>
	);
};

export default OrdersInformation;
