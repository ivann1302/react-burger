import { useState, useCallback } from 'react';

export const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// useCallBack нужен дя фиксации ссылки на функции
	// что уменьшит количество перерисовок компонента, когда будет передана функция
	const openModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};
