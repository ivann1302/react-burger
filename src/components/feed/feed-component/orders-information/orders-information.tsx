import OrderCounter from './order-counter/order-counter';
import OrderQueue from './order-queue/order-queue';

const OrdersInformation = () => {
	return (
		<div>
			<div>
				<OrderQueue></OrderQueue>
				<OrderQueue></OrderQueue>
			</div>
			<div>
				<OrderCounter
					name='Выполнено за все время'
					counter='28 752'></OrderCounter>
				<OrderCounter name='Выполнено за сегодня' counter='130'></OrderCounter>
			</div>
		</div>
	);
};

export default OrdersInformation;
