import React from 'react';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-block.module.scss';

export default function OrderBlock() {
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
				<p className='text text_type_main-large ml-1'>610</p>
				<CurrencyIcon className={styles.icon} />
			</div>
			<Button htmlType='button' type='primary' size='medium'>
				Сделать заказ
			</Button>
		</div>
	);
}
