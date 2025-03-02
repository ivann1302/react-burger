import React from 'react';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-block.module.scss';
import PropTypes from 'prop-types';

export default function OrderBlock({ onOrderClick }) {
	const orderData = {
		number: '034535',
		price: 610,
		status: 'Ваш заказ начали готовить',
		message: 'Дождитесь готовности на орбитальной станции',
	};

	return (
		<div className={`${styles.orderContainer} mt-10`}>
			<div className={styles.priceContainer}>
				<p className={`text text_type_main-large ml-1 ${styles.price}`}>
					{orderData.price}
				</p>
				<CurrencyIcon className={styles.icon} />
			</div>
			<Button
				onClick={() => onOrderClick(orderData)}
				htmlType='button'
				type='primary'
				size='medium'>
				Сделать заказ
			</Button>
		</div>
	);
}

OrderBlock.propTypes = {
	onOrderClick: PropTypes.func.isRequired,
};
