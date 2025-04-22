import OrderComponent from '../../components/feed/feed-component/order/order-component';
import style from './order-page.module.scss';

const OrderPage = () => {
	return (
		<section className={style.container}>
			<OrderComponent
				number='#123'
				name='Burger'
				status='Выполнен'
				ingredient={{ name: 'Ingredient', price: 200, count: 1 }}
			/>
		</section>
	);
};

export default OrderPage;
