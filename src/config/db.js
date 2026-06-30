import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import MockFirestore from './mock-firestore.js';

let isInitialized = false;

const connectDB = async () => {
  if (isInitialized) return;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (admin.apps.length === 0) {
    let serviceAccount = null;
    const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccountEnv) {
      if (serviceAccountEnv.trim().startsWith('{')) {
        try {
          serviceAccount = JSON.parse(serviceAccountEnv);
        } catch (err) {
          console.error(`❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY env var: ${err.message}`);
        }
      } else if (fs.existsSync(serviceAccountEnv)) {
        try {
          serviceAccount = JSON.parse(fs.readFileSync(serviceAccountEnv, 'utf8'));
        } catch (err) {
          console.error(`❌ Failed to read FIREBASE_SERVICE_ACCOUNT_KEY file: ${err.message}`);
        }
      }
    }

    if (!serviceAccount) {
      const possiblePaths = [
        path.join(process.cwd(), 'firebase-service-account.json'),
        path.join(__dirname, '../../firebase-service-account.json'),
        path.join(__dirname, '../../../../firebase-service-account.json')
      ];

      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          try {
            serviceAccount = JSON.parse(fs.readFileSync(p, 'utf8'));
            break;
          } catch (err) {
            console.error(`❌ Failed to read service account at ${p}: ${err.message}`);
          }
        }
      }
    }

    let useMock = false;

    if (serviceAccount) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
        console.log('🍃 Firebase Connected via Service Account Cert');
      } catch (error) {
        console.error(`❌ Firebase initialization error: ${error.message}`);
        admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID || 'maatraveda'
        });
      }
    } else {
      const host = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
      
      // Test if emulator is running
      let emulatorRunning = false;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 200);
        await fetch(`http://${host}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        emulatorRunning = true;
      } catch (err) {
        emulatorRunning = false;
      }

      if (emulatorRunning) {
        process.env.FIRESTORE_EMULATOR_HOST = host;
        admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID || 'maatraveda'
        });
        console.log(`🍃 Firebase Connected via Project ID to Emulator at ${host}`);
      } else {
        const isGcp = process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.K_SERVICE || process.env.GAE_SERVICE;
        if (isGcp) {
          admin.initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID || 'maatraveda'
          });
          console.log('🍃 Firebase Connected via Application Default Credentials');
        } else {
          console.log('⚠️ No Firebase credentials or active Firestore Emulator found. Enabling In-Memory DB Mock.');
          useMock = true;
        }
      }
    }

    if (useMock) {
      const mockDb = new MockFirestore();
      Object.defineProperty(admin, 'firestore', {
        get: () => () => mockDb,
        configurable: true
      });
      console.log('✅ In-Memory Firestore Mock active.');
    }

    // Database Seeder
    try {
      const AdminModel = (await import('../models/Admin.js')).default;
      const UserModel = (await import('../models/User.js')).default;

      // Seed admin if empty
      const adminSnapshot = await admin.firestore().collection('admins').limit(1).get();
      if (adminSnapshot.empty) {
        console.log('🌱 Seeding default admin user...');
        await AdminModel.create({
          email: 'admin@matriveda.com',
          password: 'admin123'
        });
        console.log('✅ Default admin seeded: admin@matriveda.com / admin123');
      }

      // Seed customer if empty
      const userSnapshot = await admin.firestore().collection('users').limit(1).get();
      if (userSnapshot.empty) {
        console.log('🌱 Seeding default customer user...');
        await UserModel.create({
          name: 'Test Customer',
          email: 'test@user.com',
          password: 'user123'
        });
        console.log('✅ Default customer seeded: test@user.com / user123');
      }
    } catch (err) {
      console.error('⚠️ Database seeding warning/error:', err.message);
    }
  }

  isInitialized = true;
};

export default connectDB;
