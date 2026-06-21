import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';

const getDb = () => admin.firestore();
const getCollection = () => getDb().collection('admins');

class Admin {
  constructor(data) {
    this._id = data._id || data.id;
    this.id = this._id;
    this.email = typeof data.email === 'string' ? data.email.toLowerCase() : '';
    this.password = data.password;
  }

  async matchPassword(enteredPassword) {
    if (!enteredPassword || !this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
  }

  static findOne(query) {
    const promise = (async () => {
      if (!query || !query.email) return null;
      const snapshot = await getCollection().where('email', '==', query.email.toLowerCase()).limit(1).get();
      if (snapshot.empty) return null;
      const doc = snapshot.docs[0];
      return new Admin({ _id: doc.id, ...doc.data() });
    })();

    promise.select = function() {
      return promise;
    };

    return promise;
  }

  static findById(id) {
    const promise = (async () => {
      if (!id) return null;
      const doc = await getCollection().doc(id).get();
      if (!doc.exists) return null;
      return new Admin({ _id: doc.id, ...doc.data() });
    })();

    promise.select = function() {
      return promise;
    };

    return promise;
  }

  static async create(data) {
    let hashedPassword = data.password;
    if (!hashedPassword.startsWith('$2b$') && !hashedPassword.startsWith('$2a$')) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(hashedPassword, salt);
    }

    const payload = {
      email: data.email.toLowerCase(),
      password: hashedPassword
    };
    const docRef = await getCollection().add(payload);
    return new Admin({ _id: docRef.id, ...payload });
  }

  static async deleteMany() {
    const snapshot = await getCollection().get();
    const batch = getDb().batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
}

export default Admin;
