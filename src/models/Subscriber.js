import admin from 'firebase-admin';

const getDb = () => admin.firestore();
const getCollection = () => getDb().collection('subscribers');

class Subscriber {
  constructor(data) {
    this._id = data._id || data.id;
    this.id = this._id;
    this.email = typeof data.email === 'string' ? data.email.toLowerCase() : '';
    this.subscribedAt = data.subscribedAt || new Date().toISOString();
  }

  static findOne(query) {
    const promise = (async () => {
      if (!query || !query.email) return null;
      const snapshot = await getCollection().where('email', '==', query.email.toLowerCase()).limit(1).get();
      if (snapshot.empty) return null;
      const doc = snapshot.docs[0];
      return new Subscriber({ _id: doc.id, ...doc.data() });
    })();

    return promise;
  }

  static async create(data) {
    const payload = {
      email: data.email.toLowerCase(),
      subscribedAt: new Date().toISOString()
    };
    const docRef = await getCollection().add(payload);
    return new Subscriber({ _id: docRef.id, ...payload });
  }

  static find() {
    const promise = (async () => {
      const snapshot = await getCollection().orderBy('subscribedAt', 'desc').get();
      return snapshot.docs.map(doc => new Subscriber({ _id: doc.id, ...doc.data() }));
    })();

    promise.sort = function() {
      return promise;
    };

    return promise;
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

export default Subscriber;
