export type TIngredient = {
	_id: string;
	name: string;
	type: 'bun' | 'main' | 'sauce';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

export type TOrder = {
	_id?: string;
	number: string;
	name: string;
	status: string;
	ingredients: string[];
	createdAt?: string;
	updatedAt?: string;
	price?: number;
};
