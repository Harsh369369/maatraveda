import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

const connectDB = () => {
  if (admin.apps.length === 0) {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || path.join(process.cwd(), 'firebase-service-account.json');
    
    if (fs.existsSync(serviceAccountPath)) {
      try {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
        console.log('🍃 Firebase Connected via Service Account JSON');
      } catch (error) {
        console.error(`❌ Firebase cert loading error: ${error.message}`);
        admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID || 'matree-ayurveda'
        });
      }
    } else {
      // Safeguard: Fallback to local Firestore Emulator if no credentials are provided
      if (!process.env.FIRESTORE_EMULATOR_HOST && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
        console.log('⚠️ No Firebase credentials found. Connecting to Firestore Emulator at 127.0.0.1:8080');
      }
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'matree-ayurveda'
      });
      console.log('🍃 Firebase Connected via Project ID');
    }
  }
};

export default connectDB;
