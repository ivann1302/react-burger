import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-header.module.scss';

// eslint-disable-next-line import/export
function ModalHeader({ name, onClose }) {
	return (
		<div
			className={`${styles.container} mt-10 ml-10 mr-10}`}
			style={{ marginBottom: '0' }}>
			<h3 className='text text_type_main-large' style={{ marginBottom: '0' }}>
				{name}
			</h3>
			<button onClick={onClose}>
				<CloseIcon type='primary' />
			</button>
		</div>
	);
}

export default ModalHeader;
