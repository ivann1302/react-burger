import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-header.module.scss';

type TModalHeaderProps = {
	name: string;
	onClose: () => void;
};

const ModalHeader: React.FC<TModalHeaderProps> = ({
	name = 'Модальное окно',
	onClose,
}) => {
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
};

export default ModalHeader;
