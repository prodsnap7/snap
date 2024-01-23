import FIREBASE_SERVER_CONFIG from './firebase_server_config.json'
// import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import admin, { type ServiceAccount } from 'firebase-admin';

function initializeFirebase() {
	if (!admin.apps.length) {
		const serviceAccount = FIREBASE_SERVER_CONFIG;
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount as ServiceAccount),
			databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
		});
	}
}

export async function decodeToken(token: string): Promise<any | null> {
	if (!token || token === 'null' || token === 'undefined') return null;
	try {
		initializeFirebase();
		return await admin.auth().verifyIdToken(token);
	} catch (err) {
		return null;
	}
}