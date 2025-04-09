function checkResponse<T = any>(res: Response): Promise<T> {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}

export function request<T = any>(
	url: string,
	options?: RequestInit
): Promise<T> {
	return fetch(url, options).then(checkResponse);
}
