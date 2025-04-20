import styles from './order-queue.module.scss';

const orderNumber = '03345';

const OrderQueue = (props: any) => {
	return (
		<div className={styles.container}>
			<h3 className='text text_type_main-medium'>{props.title}</h3>
			<ul>
				<li className='text text_type_digits-small'>{orderNumber}</li>
				<li>{orderNumber}</li>
				<li>{orderNumber}</li>
				<li>{orderNumber}</li>
				<li>{orderNumber}</li>
				<li>{orderNumber}</li>
			</ul>
		</div>
	);
};

export default OrderQueue;
