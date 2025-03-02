import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.scss';
import PropTypes from 'prop-types';

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

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	header: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Modal;
