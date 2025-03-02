import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function IngredientItem(props) {
	return (
		<>
			<Counter count={1} size='default' extraClass='m-1' />
			<img src={props.img} alt='Ingredient' />
		</>
	);
}

IngredientItem.propTypes = {
	img: PropTypes.string.isRequired,
};
