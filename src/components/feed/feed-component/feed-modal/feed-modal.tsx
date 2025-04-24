import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './feed-modal.module.scss';

type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

type TOrder = {
	name: string;
	number: string;
	ingredients: TIngredient[];
	price: number;
	status: string;
	createdAt?: string;
};

type TFeedModalProps = {
	selectedOrder: TOrder | null;
};

const today = new Date();

const FeedModal = ({ selectedOrder }: TFeedModalProps) => {
	if (!selectedOrder) {
		return null;
	}
	return (
		<div className={`${style.modal} p-10`}>
			<h3 className='text text_type_main-medium mb-2'>{selectedOrder.name}</h3>
			<p className={`${style.status} text text_type_main-small`}>
				{selectedOrder.status}
			</p>

			<p className='text text_type_main-default mb-2'>Состав:</p>
			<ul className={style.list}>
				{selectedOrder.ingredients.map((ingredient, index) => (
					<li key={index} className={`${style.listItem} mb-4`}>
						<div className={style.ingredient_block}>
							<div className={style.imageContainer}>
								<img
									src={ingredient.image}
									alt={ingredient.name}
									className={style.ingredient_image}
								/>
							</div>
							<div className={style.ingredientNameContainer}>
								<p className='text text_type_main-small'>{ingredient.name}</p>
							</div>{' '}
						</div>
						<div className={style.price_block}>
							<p className='text text_type_digits-small mr-2'>
								1 x {ingredient.price}
							</p>
							<CurrencyIcon type='primary' />
						</div>
					</li>
				))}
			</ul>

			<div className={style.bottom_container}>
				<p className={`${style.date} text text_type_main-small`}>
					<FormattedDate
						date={
							new Date(
								today.getFullYear(),
								today.getMonth(),
								today.getDate(),
								today.getHours(),
								today.getMinutes() - 1,
								0
							)
						}
					/>
				</p>
				<div className={style.totalPrice}>
					<p className='text text_type_digits-default mr-2'>
						{selectedOrder.price}
					</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default FeedModal;
