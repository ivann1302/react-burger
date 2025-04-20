import styles from './order-counter.module.scss';

const OrderCounter = (props: any) => {
	return (
		<div className={styles.container}>
			<h3 className='text text_type_main-medium'>{props.name}</h3>
			<h3 className={`${styles.count} text text_type_digits-large`}>
				{props.count}
			</h3>
		</div>
	);
};

export default OrderCounter;
