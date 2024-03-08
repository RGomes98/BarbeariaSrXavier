import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { clientEnv } from '@/env';

const firebaseAdminConfig = {
    credential: cert({
        projectId: clientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: clientEnv.NEXT_PUBLIC_CLIENT_EMAIL,
        privateKey: clientEnv.NEXT_PRIVATE_KEY
      })
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
