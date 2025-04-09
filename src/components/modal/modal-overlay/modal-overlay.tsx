import React from 'react';
import styles from './modal-overlay.module.scss';

type TModalOverlay = {
	onClose: () => void;
};

const ModalOverlay: React.FC<TModalOverlay> = ({ onClose }) => {
	// Обработчик событий клавиатуры
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
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

export default ModalOverlay;
