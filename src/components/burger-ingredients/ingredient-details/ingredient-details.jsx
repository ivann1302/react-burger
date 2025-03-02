import React from 'react';
import styles from './ingredient-details.module.scss';
import PropTypes from 'prop-types';
import { IngredientType } from './../../../utils/types';

const IngredientDetailsModal = ({ ingredient }) => {
	if (!ingredient) return null;
	return (
		<div className={styles.container}>
			<img
				src={ingredient.image_large}
				alt={ingredient.name}
				className={`${styles.image} mb-4`}
			/>
			<h2 className='text text_type_main-medium mt-0 mb-8'>
				{ingredient.name}
			</h2>
			<div className={`${styles.nutritions} mb-15`}>
				<div className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive mb-1'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default'>{ingredient.calories}</p>
				</div>
				<div className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive mb-1'>
						Белки, г
					</p>
					<p className='text text_type_digits-default'>{ingredient.proteins}</p>
				</div>
				<div className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive mb-1'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default'>{ingredient.fat}</p>
				</div>
				<div>
					<p className='text text_type_main-default text_color_inactive mb-1'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default'>
						{ingredient.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};

IngredientDetailsModal.propTypes = {
	ingredients: PropTypes.arrayOf(IngredientType),
};

export default IngredientDetailsModal;
