import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import styles from './constructor-items.module.scss';
import { TIngredient } from '@utils/ingredient-types';

type TConstructorItems = {
	ingredient?: TIngredient;
	ingredients?: (TIngredient & { uniqueId: string })[];
	isBunTop?: boolean;
	onRemove?: (id: string) => void;
	moveIngredient?: (fromIndex: number, toIndex: number) => void;
};

const ConstructorItems: React.FC<TConstructorItems> = ({
	ingredient,
	ingredients,
	isBunTop,
	onRemove,
	moveIngredient,
}) => {
	if (ingredient) {
		return (
			<div className={styles.bun}>
				<ConstructorElement
					type={isBunTop ? 'top' : 'bottom'}
					isLocked={true}
					text={`${ingredient.name} (${isBunTop ? 'верх' : 'низ'})`}
					price={ingredient.price}
					thumbnail={ingredient.image}
				/>
			</div>
		);
	}

	return (
		<div className={styles.ingredientsWrapper}>
			{ingredients?.map((item, index) => (
				<Ingredient
					key={item.uniqueId} // Используем uniqueId вместо _id + index
					ingredient={item}
					index={index}
					onRemove={onRemove!}
					moveIngredient={moveIngredient!}
				/>
			))}
		</div>
	);
};

export default ConstructorItems;
