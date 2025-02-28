import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.scss';

const modalRoot = document.getElementById('react-modals');
const Modal = ({ onClose, header, children }) => {
	//  Закрытие окна при нажатии Escape
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	return createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div className={`${styles.modal} p-0`}>
				<ModalHeader onClose={onClose} name={header}></ModalHeader>
				{children}
			</div>
		</>,
		modalRoot
	);
};

export default Modal;
