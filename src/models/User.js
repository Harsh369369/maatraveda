import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';

const getDb = () => admin.firestore();
const getCollection = () => getDb().collection('users');

class User {
  constructor(data) {
    this._id = data._id || data.id;
    this.id = this._id;
    this.name = data.name;
    this.email = typeof data.email === 'string' ? data.email.toLowerCase() : '';
    this.password = data.password;
    this.createdAt = data.createdAt || new Date().toISOString();
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
      return new User({ _id: doc.id, ...doc.data() });
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
      return new User({ _id: doc.id, ...doc.data() });
    })();

    promise.select = function() {
      return promise;
    };

    return promise;
  }

  static async create(data) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    
    const payload = {
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    const docRef = await getCollection().add(payload);
    return new User({ _id: docRef.id, ...payload });
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

export default User;
