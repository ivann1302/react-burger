import React from 'react';
import styles from './modal-overlay.module.scss';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
	// Обработчик событий клавиатуры
	const handleKeyDown = (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			onClose();
		}
	};

	return (
		<div
			className={styles.overlay}
			onClick={onClose}
			onKeyDown={handleKeyDown}
			tabIndex={0} // Делаем элемент фокусируемым
			role='button' // Указываем, что элемент ведет себя как кнопка
			aria-label='Закрыть модальное окно' // Описание для screen readers
		></div>
	);
};

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
