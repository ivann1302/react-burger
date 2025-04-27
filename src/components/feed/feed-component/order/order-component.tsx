import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order-component.module.scss';

type TOrderComponentProps = {
	number: string;
	name: string;
	status: string;
	ingredients: Array<{
		_id: string;
		name: string;
		price: number;
		image: string;
		count: number;
	}>;
	price: number;
	date: React.ReactNode;
};

const OrderComponent = ({
	number,
	name,
	status,
	ingredients,
	price,
	date,
}: TOrderComponentProps) => {
	return (
		<div className={style.container}>
			<h3 className={`${style.number} text text_type_digits-default mb-10`}>
				{number}
			</h3>
			<h3 className='text text_type_main-medium mt-0 mb-3'>{name}</h3>
			<p className={`${style.status} text text_type_main-small mt-0 mb-0`}>
				{status}
			</p>

			<h3 className={`${style.squad} text text_type_main-medium mt-15 mb-6`}>
				Состав:
			</h3>
			<ul className={`${style.list} custom-scroll`}>
				{ingredients.map((ingredient, index) => (
					<li key={`${ingredient._id}-${index}`} className={style.listItem}>
						<div className={style.ingredient_block}>
							<div className={style.imageContainer}>
								<img
									src={ingredient.image}
									alt={ingredient.name}
									className={style.ingredientImage}
								/>
							</div>
							<h4 className='text text_type_main-small'>{ingredient.name}</h4>
						</div>
						<div className={style.price_block}>
							<p className='text text_type_digits-small'>
								{ingredient.count} x {ingredient.price}
							</p>
							<CurrencyIcon type='primary' />
						</div>
					</li>
				))}
			</ul>
			<div className={`${style.bottom_container} mt-10`}>
				<p
					className={`${style.data} text text_type_main-default text_color_inactive`}>
					{date}
				</p>
				<div className={style.totalPrice}>
					<p className='text text_type_digits-default mr-2'>{price}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default OrderComponent;
