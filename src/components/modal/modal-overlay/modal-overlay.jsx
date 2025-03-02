import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal-overlay.module.scss';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const ModalOverlay = ({ onClose }) => {
	// Обработчик событий клавиатуры
	const handleKeyDown = (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			onClose();
		}
	};

	return createPortal(
		<div
			className={styles.overlay}
			onClick={onClose}
			onKeyDown={handleKeyDown}
			tabIndex={0} // Делаем элемент фокусируемым
			role='button' // Указываем, что элемент ведет себя как кнопка
			aria-label='Закрыть модальное окно' // Описание для screen readers
		></div>,
		modalRoot
	);
};

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
