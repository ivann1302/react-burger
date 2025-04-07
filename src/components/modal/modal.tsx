import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.scss';

const modalRoot = document.getElementById('react-modals');

type TModalProps = {
	onClose: () => void;
	header?: string;
	children?: React.ReactNode;
};

const Modal: React.FC<TModalProps> = ({
	onClose,
	header = '',
	children = null,
}) => {
	//  Закрытие окна при нажатии Escape
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	if (!modalRoot) {
		return null;
	}

	return createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div
				className={styles.modalWrapper}
				role='dialog'
				tabIndex={-1}
				aria-modal='true'>
				<div
					className={styles.modal}
					onClick={(e) => e.stopPropagation()}
					role='none'>
					<ModalHeader onClose={onClose} name={header} />
					{children}
				</div>
			</div>
		</>,
		modalRoot
	);
};

export default Modal;
