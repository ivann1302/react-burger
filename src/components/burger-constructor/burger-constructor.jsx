import React from 'react';
import styles from './burger-constructor.module.scss';
import ConstructorItems from './constructor-items/constructor-items';
import OrderBlock from './order-block/order-block';

export default function BurgerConstructor() {
	const bunId = '60666c42cc7b410027a1a9b1';

	return (
		<>
			<section className={styles.constructor}>
				<ConstructorItems bunId={bunId} />
				<OrderBlock />
			</section>
		</>
	);
}
