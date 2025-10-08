import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/AuthStore';

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: Number(import.meta.env.VITE_TIMEOUT) || 1000,
});


export type Error<T = undefined> = AxiosError<{ message: string | string[], field?: T extends undefined ? string : keyof T }>;
export const useAxios = () => instance;

instance.interceptors.response.use(response => response, async err => {
	const error = err as AxiosError<{ message: string | string[], field?: string }>;

	if (!error.response) {
		console.log(error);
		return Promise.reject(error);
	}

	if (error.response?.status === 401) {
		const state = useAuthStore.getState();
		const { logout, setToken } = state;
		let {refreshToken} = state;

		if (!refreshToken) {
			refreshToken = window.localStorage.getItem('refreshToken');
		}

		if (!refreshToken) logout();
		
		try {
			const { data } = await instance.post<{token: string}>('/auth/refresh', { refreshToken });
			setToken(data.token);
		} catch {
			logout();
			return Promise.reject(error);
		}
	}

	return Promise.reject(error);
});
