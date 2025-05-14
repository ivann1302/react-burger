import { Outlet } from 'react-router-dom';
import FeedComponent from '../../components/feed/feed-component';

const FeedPage = () => {
	return (
		<div>
			<FeedComponent />
			<Outlet />
		</div>
	);
};

export default FeedPage;
