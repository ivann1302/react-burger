import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import styles from './home.module.scss';
import { TIngredient } from './../../utils/ingredient-types';

type THomeProps = {
	onIngredientClick: (ingredient: TIngredient) => void;
};

const Home = ({ onIngredientClick }: THomeProps): JSX.Element => {
	return (
		<>
			<h2 className='text text_type_main-large mb-5'>Соберите бургер</h2>
			<section className={styles.container}>
				<BurgerIngredients onIngredientClick={onIngredientClick} />
				<BurgerConstructor />
			</section>
		</>
	);
};

export default Home;
