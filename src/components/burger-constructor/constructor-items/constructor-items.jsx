import React from 'react';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-items.module.scss';

export default function ConstructorItems({ ingredients }) {
	if (!Array.isArray(ingredients) || ingredients.length === 0) {
		return <div>Загрузка ингредиентов...</div>;
	}

	// Находим булку по её ID
	const bun = ingredients[0];

	// Фильтруем ингредиенты, исключая булки
	const inner = ingredients.filter((item) => item.type !== 'bun');

	return (
		<ul
			style={{
				marginTop: '0',
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				listStyle: 'none',
				padding: '0',
				height: '656px',
			}}>
			{/* Верхняя булка */}
			<li style={{ marginLeft: '32px' }}>
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
				<ul
					style={{
						listStyle: 'none',
						padding: '0',
						display: 'flex',
						flexDirection: 'column',
						overflowY: 'auto',
						maxHeight: '450px',
						paddingRight: '16px',
					}}>
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
			<li style={{ marginLeft: '32px' }}>
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
