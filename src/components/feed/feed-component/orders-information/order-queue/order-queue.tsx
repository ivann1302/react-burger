import styles from './order-queue.module.scss';
import { TOrder } from '@utils/ingredient-types';

type TOrderQueueProps = {
	title: string;
	orders: TOrder[];
};

const OrderQueue = ({ title, orders }: TOrderQueueProps) => {
	return (
		<div className={styles.container}>
			<h3 className='text text_type_main-medium'>{title}</h3>
			<ul>
				{orders.map((order) => (
					<li
						key={order._id}
						className={`text text_type_digits-small ${
							title.includes('Готовы') ? styles.done : ''
						}`}>
						{order.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default OrderQueue;
