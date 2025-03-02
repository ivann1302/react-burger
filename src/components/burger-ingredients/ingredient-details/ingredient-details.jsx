import React from 'react';
import styles from './ingredient-details.module.scss';
import PropTypes from 'prop-types';

const IngredientDetailsModal = ({ ingredient }) => {
	if (!ingredient) return null;
	return (
		<div className={styles.container}>
			<img
				src={ingredient.image_large}
				alt={ingredient.name}
				style={{ width: '520px', height: '240px' }}
				className='mb-4'
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
	ingredient: PropTypes.shape({
		image_large: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		calories: PropTypes.number.isRequired,
		proteins: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
	}),
};

export default IngredientDetailsModal;
