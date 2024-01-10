import { initFirebase } from '$lib/firebase';
import {
	signOut,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	type Auth,
	type User
} from 'firebase/auth';

class AuthStore {
	private static instance: AuthStore;
	private auth: Auth;
	private user: User | null = $state(null);

  userLoggedIn = $derived(Boolean(this.user));

	private constructor() {
		const { auth } = initFirebase();
		this.auth = auth;
		this.user = auth.currentUser;
		onAuthStateChanged(this.auth, (user) => {
			if (user) {
				this.user = user;
			} else {
				this.user = null;
			}
		});
	}

	public static getInstance(): AuthStore {
		if (!AuthStore.instance) {
			AuthStore.instance = new AuthStore();
		}

		return AuthStore.instance;
	}

	public async signIn(email: string, password: string) {
		return signInWithEmailAndPassword(this.auth, email, password);
	}

	public async signOut() {
		return signOut(this.auth);
	}

	public getUser() {
		return this.user;
	}
}

export const auth = AuthStore.getInstance();
