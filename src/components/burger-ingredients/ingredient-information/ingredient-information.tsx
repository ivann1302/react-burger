import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-information.module.scss';

type TIngredientInformation = {
	price: number;
	name: string;
};

const IngredientInformation: React.FC<TIngredientInformation> = ({
	price,
	name,
}) => {
	return (
		<div className={styles.container}>
			<div className={`${styles.block} mb-1`}>
				<p className='text text_type_digits-default"'>{price}</p>
				<CurrencyIcon type={'primary'} />
			</div>
			<p className={`${styles.name} text text_type_main-small`}>{name}</p>
		</div>
	);
};

export default IngredientInformation;
