import styles from './order-counter.module.scss';

type TOrderCounterProps = {
	name: string;
	count: string;
};

const OrderCounter = ({ name, count }: TOrderCounterProps) => {
	return (
		<div className={styles.container}>
			<h3 className='text text_type_main-medium'>{name}</h3>
			<h3 className={`${styles.count} text text_type_digits-large`}>{count}</h3>
		</div>
	);
};

export default OrderCounter;
