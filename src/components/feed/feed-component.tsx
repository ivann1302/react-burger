import FeedContainer from './feed-component/feed-container/feed-container';
import OrdersInformation from './feed-component/orders-information/orders-information';
import styles from './feed-component.module.scss';

const FeedComponent = (): JSX.Element => {
	return (
		<section className={styles.section}>
			<div>
				<h3 className='text text_type_main-medium mb-5'>Лента заказов</h3>
				<FeedContainer></FeedContainer>
			</div>
			<OrdersInformation></OrdersInformation>
		</section>
	);
};

export default FeedComponent;
