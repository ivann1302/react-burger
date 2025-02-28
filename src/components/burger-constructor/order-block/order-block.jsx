import React from 'react';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-block.module.scss';

export default function OrderBlock({ onOrderClick }) {
	const orderData = {
		number: '034535',
		price: 610,
		status: 'Ваш заказ начали готовить',
		message: 'Дождитесь готовности на орбитальной станции',
	};

	return (
		<div
			className='mt-10'
			style={{
				display: 'flex',
				justifyContent: 'flex-end',
				paddingRight: '24px',
			}}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginRight: '40px',
					gap: '8px',
				}}>
				<p
					className='text text_type_main-large ml-1 ${styles.price'
					style={{ fontFamily: 'Iceland' }}>
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
