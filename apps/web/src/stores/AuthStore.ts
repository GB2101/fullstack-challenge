import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthStore = {
	username: string | null;
	isAuthenticated: boolean;

	token: string | null;
	refreshToken: string | null;

	logout: () => void;
	setUsername: (username: string) => void;

	setTokens: (tokens: { token: string, refreshToken: string }) => void;
};

export const useAuthStore = create<AuthStore>()(persist(
	(set) => ({
		username: null,
		isAuthenticated: false,

		token: null,
		refreshToken: null,

		logout: () => set({ isAuthenticated: false, token: null, refreshToken: null, username: null }),
		setUsername: (username) => set({ username }),

		setTokens: (tokens) => {
			console.log('Setting tokens');
			set({ ...tokens, isAuthenticated: true })
		},
	}),
	{
		name: 'auth-storage', // name of the item in the storage (must be unique)
		storage: createJSONStorage(() => localStorage),
	}
));
