import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-header.module.scss';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/export
function ModalHeader({ name, onClose }) {
	return (
		<div className={`${styles.container} mt-10 ml-10 mr-10}`}>
			<h3 className={`${styles.title} text text_type_main-large`}>{name}</h3>
			<button onClick={onClose}>
				<CloseIcon type='primary' />
			</button>
		</div>
	);
}

ModalHeader.propTypes = {
	name: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ModalHeader;
