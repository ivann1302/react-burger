import React from 'react';
import styles from './burger-constructor.module.scss';
import ConstructorItems from './constructor-items/constructor-items';
import OrderBlock from './order-block/order-block';

export default function BurgerConstructor() {
	return (
		<>
			<section className={styles.constructor}>
				<ConstructorItems />
				<OrderBlock />
			</section>
		</>
	);
}
