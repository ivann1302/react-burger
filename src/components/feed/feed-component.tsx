import { useLocation, matchPath } from 'react-router-dom';
import FeedContainer from './feed-component/feed-container/feed-container';
import OrdersInformation from './feed-component/orders-information/orders-information';
import styles from './feed-component.module.scss';

const FeedComponent = (): JSX.Element | null => {
	const location = useLocation();

	// Если маршрут соответствует /feed/:number — значит это заказ
	const isOrderRoute = matchPath('/feed/:number', location.pathname);

	if (isOrderRoute) return null;

	return (
		<section className={styles.section}>
			<div>
				<h3 className='text text_type_main-medium mb-5'>Лента заказов</h3>
				<FeedContainer />
			</div>
			<OrdersInformation />
		</section>
	);
};

export default FeedComponent;
