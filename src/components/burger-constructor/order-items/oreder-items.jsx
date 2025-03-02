import React from 'react';
import styles from './order-items.module.scss';
import doneImage from './../../../images/done.svg';
import PropTypes from 'prop-types';

const OrderDetails = ({ orderData }) => {
	return (
		<div className={styles.orderContainer}>
			<p className={`${styles.text} text text_type_digits-large mt-4 mb-0`}>
				{orderData.number}
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
				{orderData.status}
			</p>
			<p className='text text_type_main-default text_color_inactive mt-2 mb-30'>
				{orderData.message}
			</p>
		</div>
	);
};

OrderDetails.propTypes = {
	orderData: PropTypes.shape({
		number: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
	}).isRequired,
};

export default OrderDetails;
