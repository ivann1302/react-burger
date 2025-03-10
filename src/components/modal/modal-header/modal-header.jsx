import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './modal-header.module.scss';

function ModalHeader({ name, onClose }) {
	return (
		<div className={`${styles.container} mt-10 ml-10 mr-10`}>
			<h3 className={`${styles.title} text text_type_main-large`}>{name}</h3>
			<button
				className={styles.closeButton}
				onClick={onClose}
				aria-label='Закрыть модальное окно'>
				<CloseIcon type='primary' />
			</button>
		</div>
	);
}

ModalHeader.propTypes = {
	name: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
};

ModalHeader.defaultProps = {
	name: 'Модальное окно',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onClose: () => {},
};

export default ModalHeader;
