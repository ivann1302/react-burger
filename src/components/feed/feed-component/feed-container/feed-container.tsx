import FeedElement from '../feed-element/feed-element';
import ingredients from './../../../../utils/data';
import style from './feed-container.module.scss';
const FeedContainer = () => {
	return (
		<div className={`${style.container}`}>
			<FeedElement
				name={'Burger'}
				number={'12315'}
				ingredients={ingredients}
				price={480}></FeedElement>
			<FeedElement
				name={'Burger'}
				number={'12315'}
				ingredients={ingredients}
				price={480}></FeedElement>
			<FeedElement
				name={'Burger'}
				number={'12315'}
				ingredients={ingredients}
				price={480}></FeedElement>
			<FeedElement
				name={'Burger'}
				number={'12315'}
				ingredients={ingredients}
				price={480}></FeedElement>
		</div>
	);
};

export default FeedContainer;
