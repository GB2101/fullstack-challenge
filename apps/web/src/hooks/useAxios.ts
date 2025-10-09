import axios, { type AxiosError } from 'axios'
import { useAuthStore } from '@/stores';
import type { TokensResponse } from '@/types'

type QueueItem = {onSuccess: (token: string) => void, onFailure: (error: AxiosError) => void};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];



export const useAxios = () => {
	const { token, refreshToken, setTokens, logout } = useAuthStore.getState();

	const instance = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		timeout: Number(import.meta.env.VITE_TIMEOUT) || 1000,
		headers: { Authorization: `Bearer ${token}` },
	});

	instance.interceptors.response.use(
		response => response,
		(error: AxiosError) => {
			if (!error.response) {
				console.log(error);
				return Promise.reject(error);
			}
		
			if (error.response.status !== 401) return Promise.reject(error);

			const originalConfig = error.config!;
			if (!isRefreshing) {
				isRefreshing = true;
				instance.post<TokensResponse>('/auth/refresh', { refreshToken })
					.then(response => {
						const { token, refreshToken } = response.data;
						setTokens({ token, refreshToken });
					
						instance.defaults.headers['Authorization'] = `Bearer ${token}`;
					
						failedQueue.forEach((request) =>
							request.onSuccess(token)
						);
				
						failedQueue = [];
					})
					.catch(() => {
						failedQueue.forEach((request) =>
							request.onFailure(error)
						);
					
						failedQueue = [];
						logout();
					})
					.finally(() => {
						isRefreshing = false
					});
			}
			
			return new Promise((resolve, reject) => {
				failedQueue.push({
					onSuccess: (token) => {
						originalConfig.headers['Authorization'] = `Bearer ${token}`;
						resolve(instance(originalConfig));
					},
					onFailure: (err) => {
						reject(err);
					},
				});
			});
		}
	);

	return instance;
};
