export const setCookie = (name, value, props = {}) => {
	props = {
		path: '/', // Кука будет доступна на всех страницах
		...props, // Дополнительные параметры (expires, secure, etc.)
	};

	let exp = props.expires;
	if (typeof exp === 'number' && exp) {
		const d = new Date();
		d.setTime(d.getTime() + exp * 1000); // Время жизни в секундах
		exp = props.expires = d;
	}
	if (exp && exp.toUTCString) {
		props.expires = exp.toUTCString();
	}

	value = encodeURIComponent(value); // Кодируем значение
	let updatedCookie = `${name}=${value}`;
	for (const propName in props) {
		updatedCookie += `; ${propName}`;
		const propValue = props[propName];
		if (propValue !== true) {
			updatedCookie += `=${propValue}`;
		}
	}
	document.cookie = updatedCookie;
};

// Получение cookie
export const getCookie = (name) => {
	const matches = document.cookie.match(
		new RegExp(
			`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
};

// Удаление cookie
export const deleteCookie = (name) => {
	setCookie(name, '', { expires: -1 }); // Устанавливаем время жизни в прошлое
};
