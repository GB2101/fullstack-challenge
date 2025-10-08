import {create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthStoreState = {
	isAuthenticated: boolean;
	token: string | null;
	refreshToken: string | null;
	username: string | null;
};

type AuthStoreActions = {
	logout: () => void;
	setToken: (token: string) => void;
	setTokens: (token: string, refreshToken: string) => void;
	setUsername: (username: string) => void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(persist(
	(set) => ({
		isAuthenticated: false,
		token: null,
		refreshToken: null,
		username: null,
		logout: () => set({ token: null, refreshToken: null, isAuthenticated: false, username: null }),
		setToken: (token) => set({ token, isAuthenticated: true }),
		setTokens: (token, refreshToken) => set({ token, refreshToken, isAuthenticated: true }),
		setUsername: (username) => set({ username }),
	}),
	{
		name: 'auth-storage', // name of the item in the storage (must be unique)
		storage: createJSONStorage(() => localStorage),
	}
));
