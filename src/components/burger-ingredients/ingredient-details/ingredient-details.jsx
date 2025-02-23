import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientDetails(props) {
	return (
		<>
			<div>
				<p>{props.price}</p>
				<CurrencyIcon />
			</div>
			<p>{props.name}</p>
		</>
	);
}
