import BurgerConstructor from './../../components/burger-constructor/burger-constructor';
import BurgerIngredients from './../../components/burger-ingredients/burger-ingredients';
import styles from './home.module.scss';

const Home = ({ handleIngredientClick }) => {
	return (
		<>
			<h2 className='text text_type_main-large mb-5'>Соберите бургер</h2>
			<section className={styles.container}>
				<BurgerIngredients onIngredientClick={handleIngredientClick} />
				<BurgerConstructor />
			</section>
		</>
	);
};

export default Home;
