import React from 'react';
import styles from './page-not-found.module.scss';
import { Link } from 'react-router-dom';

const PageNotFound = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<h4 className={`text text_type_main-default ${styles.text}`}>
				Извините, страница не найдена.
				<Link
					className={`text text_type_main-
    default ${styles.href}`}
					to='/'>
					Вернуться на главную
				</Link>
			</h4>
		</div>
	);
};

export default PageNotFound;
