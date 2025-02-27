import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-header.module.scss';

// eslint-disable-next-line import/export
function ModalHeader({ name, onClose }) {
	return (
		<div className={`${styles.container} mt-10 ml-10 mr-10 mb-0}`}>
			<h3>{name}</h3>
			<button onClick={onClose}>
				<CloseIcon type='secondary' />
			</button>
		</div>
	);
}

export default ModalHeader;
