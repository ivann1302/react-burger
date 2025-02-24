import React from 'react';
import styles from './burger-constructor.module.scss';
import ConstructorItems from './constructor-items/constructor-items';

export default function BurgerConstructor() {
	return (
		<>
			<section className={styles.constructor}>
				<ConstructorItems />
			</section>
		</>
	);
}
