import styles from './order-details.module.scss';
import doneImage from './../../../images/done.svg';
import { useAppSelector } from '../../../hooks/typed-hookes';

const OrderDetails = () => {
	const { orderData, loading } = useAppSelector((state) => state.order);

	if (loading) {
		return (
			<div className={styles.orderContainer}>
				<p className='text text_type_main-medium mt-10 mb-30'>
					Секундочку... оформляем Ваш заказ...
				</p>
			</div>
		);
	}

	if (!orderData || !orderData.order) {
		return null;
	}

	return (
		<div className={styles.orderContainer}>
			<p className={`${styles.text} text text_type_digits-large mt-4 mb-0`}>
				{orderData.order.number}
			</p>
			<p className='text text_type_main-medium mt-8 mb-0'>
				Идентификатор заказа
			</p>

			<img
				className={`${styles.doneImage} mt-15 mb-0`}
				src={doneImage}
				alt='done'
			/>

			<p className='text text_type_main-default mt-15 mb-0'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive mt-2 mb-30'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};

export default OrderDetails;
