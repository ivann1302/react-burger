import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientItem(props) {
	return (
		<>
			<Counter count={1} size='default' extraClass='m-1' />
			<img src={props.img} alt='Ingredient' />
		</>
	);
}
