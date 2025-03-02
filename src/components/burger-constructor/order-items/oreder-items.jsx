import React from 'react';
import doneImage from './../../../images/done.svg';
import PropTypes from 'prop-types';

const OrderDetails = ({ orderData }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<p
				className='text text_type_digits-large mt-4 mb-0'
				style={{
					WebkitTextStroke: '2px #4C4CFF',
					textShadow:
						'0 0 5px #4C4CFF, 0 0 10px #4C4CFF, 0 0 5px #4C4CFF, 0 0 0 #4C4CFF',
				}}>
				{orderData.number}
			</p>
			<p className='text text_type_main-medium mt-8 mb-0'>
				Идентификатор заказа
			</p>

			<img
				className='mt-15 mb-0'
				src={doneImage}
				alt='done'
				style={{ width: '120px', height: '120px', background: 'none' }}
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
		number: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
	}).isRequired,
};

export default OrderDetails;
