import React from 'react';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-items.module.scss';
import PropTypes from 'prop-types';
import { IngredientType } from './../../../utils/types';

export default function ConstructorItems({ ingredients }) {
	if (!Array.isArray(ingredients) || ingredients.length === 0) {
		return (
			<>
				<ul className={styles.listContainer}>
					{/* Верхняя булка */}
					<li className={styles.locked}>
						<ConstructorElement
							type='top'
							isLocked={true}
							text=''
							price=''
							thumbnail=''
						/>
					</li>
					<li key={'1'} className={styles.unlocked}>
						<DragIcon type='primary' />
						<ConstructorElement text='' price='' thumbnail='' />
					</li>
					<li className={styles.locked}>
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text=''
							price=''
							thumbnail=''
						/>
					</li>
				</ul>
			</>
		);
	}

	// Находим булку по её ID
	const bun = ingredients[0];

	// Фильтруем ингредиенты, исключая булки
	const inner = ingredients.filter((item) => item.type !== 'bun');

	return (
		<ul className={styles.listContainer}>
			{/* Верхняя булка */}
			<li className={styles.locked}>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={`${bun.name} (верх)`}
					price={bun.price}
					thumbnail={bun.image}
				/>
			</li>

			{/* Основные ингредиенты */}
			<li>
				<ul className={styles.innerContainer}>
					{inner.map((ingredient) => (
						<li key={ingredient._id} className={styles.unlocked}>
							<DragIcon type='primary' />
							<ConstructorElement
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image}
							/>
						</li>
					))}
				</ul>
			</li>

			{/* Нижняя булка */}
			<li className={styles.locked}>
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={`${bun.name} (низ)`}
					price={bun.price}
					thumbnail={bun.image}
				/>
			</li>
		</ul>
	);
}

ConstructorItems.propTypes = {
	ingredients: PropTypes.arrayOf(IngredientType).isRequired,
};
