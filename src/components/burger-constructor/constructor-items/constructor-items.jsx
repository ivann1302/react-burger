import React from 'react';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-items.module.scss';
import data from './../../../utils/data';

const ingredients = data;

export default function ConstructorItems() {
	return (
		<ul
			style={{
				marginTop: '0',
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				listStyle: 'none',
			}}>
			<li>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={ingredients[0].name}
					price={ingredients[0].price}
					thumbnail={ingredients[0].image}
				/>
			</li>
			<li>
				<ul
					style={{
						width: '568px',
						listStyle: 'none',
						padding: '0 16px 0 0',
						position: 'relative',
						right: '30px',
						maxHeight: '480px',
						overflowY: 'auto',
					}}>
					<li className={styles.unlocked}>
						<DragIcon />
						<ConstructorElement
							text={ingredients[5].name}
							price={ingredients[5].price}
							thumbnail={ingredients[5].image}
						/>
					</li>
					<li className={styles.unlocked}>
						<DragIcon />
						<ConstructorElement
							text={ingredients[4].name}
							price={ingredients[4].price}
							thumbnail={ingredients[4].image}
						/>
					</li>
					<li className={styles.unlocked}>
						<DragIcon />
						<ConstructorElement
							text={ingredients[7].name}
							price={ingredients[7].price}
							thumbnail={ingredients[7].image}
						/>
					</li>
					<li className={styles.unlocked}>
						<DragIcon />
						<ConstructorElement
							text={ingredients[8].name}
							price={ingredients[8].price}
							thumbnail={ingredients[8].image}
						/>
					</li>
					<li className={styles.unlocked}>
						<DragIcon />
						<ConstructorElement
							text={ingredients[8].name}
							price={ingredients[8].price}
							thumbnail={ingredients[8].image}
						/>
					</li>
					<li className={styles.unlocked}>
						<DragIcon />
						<ConstructorElement
							text={ingredients[8].name}
							price={ingredients[8].price}
							thumbnail={ingredients[8].image}
						/>
					</li>
					<li className={styles.unlocked}>
						<DragIcon />
						<ConstructorElement
							text={ingredients[8].name}
							price={ingredients[8].price}
							thumbnail={ingredients[8].image}
						/>
					</li>
				</ul>
			</li>
			<li>
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={ingredients[0].name}
					price={ingredients[0].price}
					thumbnail={ingredients[0].image}
				/>
			</li>
		</ul>
	);
}
