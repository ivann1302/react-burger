import React from 'react';
// import styles from './burger-constructor.module.scss';
import ConstructorItems from './constructor-items/constructor-items';
import OrderBlock from './order-block/order-block';

export default function BurgerConstructor({ ingredients }) {
	const bunId = '60666c42cc7b410027a1a9b1643d69a5c3f7b9001cfa093c';
	return (
		<>
			<section>
				<ConstructorItems ingredients={ingredients} bunId={bunId} />
				<OrderBlock />
			</section>
		</>
	);
}
