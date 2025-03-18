import React from 'react';
import styles from './page-not-found.module.scss';

const PageNotFound = () => {
	return (
		<div className={styles.container}>
			<h4 className={`text text_type_main-default ${styles.text}`}>
				Извините, страница не найдена.
				<a
					className={`text text_type_main-
    default ${styles.href}`}
					href='/login'>
					Вернуться на главную
				</a>
			</h4>
		</div>
	);
};

export default PageNotFound;
