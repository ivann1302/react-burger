import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-information.module.scss';

export default function IngredientInformation(props) {
	return (
		<div className={styles.container}>
			<div className={`${styles.block} mb-1`}>
				<p className='text text_type_digits-default"'>{props.price}</p>
				<CurrencyIcon />
			</div>
			<p className={`${styles.name} text text_type_main-small`}>{props.name}</p>
		</div>
	);
}
