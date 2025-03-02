import PropTypes from 'prop-types';

export const IngredientType = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	calories: PropTypes.number,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
});
