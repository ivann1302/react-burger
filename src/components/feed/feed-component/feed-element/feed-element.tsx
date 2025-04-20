import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-element.module.scss';
const FeedElement = () => {
	return (
		<div className={`${styles.container} p-6`}>
			<div className={`${styles.firstBlock}`}>
				<h3 className='text text_type_digits-default'>#034535 </h3>
				<p className='text text_type_main-small'>Сегодня, 16:20</p>
			</div>
			<h3 className='text text_type_main-medium'>Starship main burger</h3>
			<div className={styles.secondBlock}>
				<div className={styles.order}>Order Image</div>
				<div className={styles.orderPrice}>
					<p className='text text_type_digits-default'>480</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default FeedElement;
