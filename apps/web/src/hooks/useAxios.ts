import axios from 'axios'

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: Number(import.meta.env.VITE_TIMEOUT) || 1000,
});

export const useAxios = () => instance;
