import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'; // Добавляем useSelector
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.scss';
import IngredientsGroup from './ingredients-group/ingredients-group';
import { TIngredient } from './../../utils/ingredient-types';

type TBurgerIngredientsProps = {
	onIngredientClick: (ingredient: TIngredient) => void;
};

type TIngredientSection = 'Булки' | 'Соусы' | 'Начинки';

export default function BurgerIngredients({
	onIngredientClick,
}: TBurgerIngredientsProps) {
	// Получаем ингредиенты из Redux
	// @ts-expect-error 'redux'
	const { ingredients } = useSelector((state) => state.ingredients);

	// Храним активный таб (по умолчанию "Булки")
	const [current, setCurrent] = useState('Булки');

	// Создаем ссылки (рефы) для контейнера и секций с ингредиентами
	const containerRef = useRef<HTMLDivElement | null>(null);
	const bunsRef = useRef<HTMLHeadingElement | null>(null);
	const saucesRef = useRef<HTMLHeadingElement | null>(null);
	const mainRef = useRef<HTMLHeadingElement | null>(null);

	// Фильтруем ингредиенты по типу
	const sauces = Array.isArray(ingredients)
		? ingredients.filter((item) => item.type === 'sauce')
		: [];
	const main = Array.isArray(ingredients)
		? ingredients.filter((item) => item.type === 'main')
		: [];
	const buns = Array.isArray(ingredients)
		? ingredients.filter((item) => item.type === 'bun')
		: [];

	// Обработчик скролла
	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return;

			// Верхняя граница контейнера
			const containerTop = containerRef.current.getBoundingClientRect().top;
			const sections = [
				{ name: 'Булки', ref: bunsRef },
				{ name: 'Соусы', ref: saucesRef },
				{ name: 'Начинки', ref: mainRef },
			] as const satisfies ReadonlyArray<{
				name: TIngredientSection;
				ref: React.RefObject<HTMLHeadingElement>;
			}>;

			let closestSection = 'Булки';
			let minDistance = Infinity;

			// Определяем, какая ближе всего к верху контейнера
			sections.forEach(({ name, ref }) => {
				if (ref.current) {
					const rect = ref.current.getBoundingClientRect();
					const distance = Math.abs(rect.top - containerTop);

					if (distance < minDistance) {
						minDistance = distance;
						closestSection = name;
					}
				}
			});

			setCurrent(closestSection);
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (container) {
				container.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);

	// Обработчик клика по табу (скроллим к нужному заголовку)
	const handleTabClick = (section: TIngredientSection) => {
		setCurrent(section);
		const refs = {
			Булки: bunsRef,
			Соусы: saucesRef,
			Начинки: mainRef,
		};

		// Если ссылка найдена - скрол к нужному блоку
		const ref = refs[section];
		if (ref.current && containerRef.current) {
			containerRef.current.scrollTo({
				top: ref.current.offsetTop - containerRef.current.offsetTop,
				behavior: 'smooth',
			});
		}
	};

	return (
		<section className={styles.ingredients}>
			<div className={`${styles.section} mt-5`}>
				<Tab
					value='Булки'
					active={current === 'Булки'}
					onClick={() => handleTabClick('Булки')}>
					Булки
				</Tab>
				<Tab
					value='Соусы'
					active={current === 'Соусы'}
					onClick={() => handleTabClick('Соусы')}>
					Соусы
				</Tab>
				<Tab
					value='Начинки'
					active={current === 'Начинки'}
					onClick={() => handleTabClick('Начинки')}>
					Начинки
				</Tab>
			</div>

			<div ref={containerRef} className={`${styles.blocks} mt-10 mb-10`}>
				<IngredientsGroup
					ref={bunsRef}
					type={buns}
					groupName='Булки'
					onIngredientClick={onIngredientClick}
				/>
				<IngredientsGroup
					ref={saucesRef}
					type={sauces}
					groupName='Соусы'
					onIngredientClick={onIngredientClick}
				/>
				<IngredientsGroup
					ref={mainRef}
					type={main}
					groupName='Начинки'
					onIngredientClick={onIngredientClick}
				/>
			</div>
		</section>
	);
}
