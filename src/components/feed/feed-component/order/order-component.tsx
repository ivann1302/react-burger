import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order-component.module.scss';

const OrderComponent = (props: any) => {
	return (
		<div className={style.container}>
			<h3 className={`${style.number} text text_type_digits-small mb-10`}>
				{props.number}
			</h3>
			<h3 className='text text_type_main-medium mt-0 mb-3'>{props.name}</h3>
			<p className={`${style.status} text text_type_main-small mt-0 mb-0`}>
				{props.status}
			</p>

			<h3 className={`${style.squad}`}>Состав:</h3>
			<ul className={`${style.list}`}>
				<li>
					<div className={`${style.ingredient_block}`}>
						<img src='' alt='' />
						<h4 className='text text_type_main-small'>
							{props.ingredient.name}
						</h4>
					</div>
					<div className={`${style.price_block}`}>
						<p className='text text_type_digits-small'>
							{props.ingredient.count} x {props.ingredient.price}
						</p>
						<CurrencyIcon type='primary' />
					</div>
				</li>
			</ul>
			<div className={`${style.bottom_container} mt-10`}>
				<p className={`${style.data} text text_type_main-small`}>Data</p>
				<div>
					<p>{props.price}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default OrderComponent;
