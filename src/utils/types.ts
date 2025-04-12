export interface IUser {
	email: string;
	name: string;
}

export interface ITokens {
	accessToken: string;
	refreshToken: string;
}

export interface IApiRequest<T = unknown> {
	success: boolean;
	message?: string;
	user?: IUser;
	accessToken?: string;
	refreshToken?: string;
	data?: T;
}

export interface IApiError {
	message: string;
	status?: number;
}
