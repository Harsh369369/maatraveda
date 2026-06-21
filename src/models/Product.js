import admin from 'firebase-admin';

const getDb = () => admin.firestore();
const getCollection = () => getDb().collection('products');

class Product {
  constructor(data) {
    this._id = data._id || data.id;
    this.id = this._id;
    this.name = data.name;
    this.description = data.description;
    this.category = data.category;
    this.price = Number(data.price);
    this.mrp = Number(data.mrp);
    this.discount = data.discount || 0;
    this.images = data.images || [];
    this.ingredients = data.ingredients || [];
    this.benefits = data.benefits || [];
    this.inStock = data.inStock !== undefined ? data.inStock : true;
    this.isComingSoon = data.isComingSoon !== undefined ? data.isComingSoon : false;
    this.isFeatured = data.isFeatured !== undefined ? data.isFeatured : false;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  static find(query = {}) {
    const promise = (async () => {
      let q = getCollection();
      if (query.category && query.category !== 'all') {
        q = q.where('category', '==', query.category);
      }
      const snapshot = await q.orderBy('createdAt', 'desc').get();
      return snapshot.docs.map(doc => new Product({ _id: doc.id, ...doc.data() }));
    })();

    promise.sort = function() {
      return promise;
    };

    return promise;
  }

  static async findById(id) {
    if (!id) return null;
    const doc = await getCollection().doc(id).get();
    if (!doc.exists) return null;
    return new Product({ _id: doc.id, ...doc.data() });
  }

  static async create(data) {
    let discount = 0;
    if (data.mrp && data.price && Number(data.mrp) > Number(data.price)) {
      discount = Math.round(((Number(data.mrp) - Number(data.price)) / Number(data.mrp)) * 100);
    }
    
    const payload = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      mrp: Number(data.mrp),
      discount,
      images: data.images || [],
      ingredients: data.ingredients || [],
      benefits: data.benefits || [],
      inStock: data.inStock !== undefined ? data.inStock : true,
      isComingSoon: data.isComingSoon !== undefined ? data.isComingSoon : false,
      isFeatured: data.isFeatured !== undefined ? data.isFeatured : false,
      createdAt: new Date().toISOString()
    };

    const docRef = await getCollection().add(payload);
    return new Product({ _id: docRef.id, ...payload });
  }

  static async deleteOne({ _id }) {
    if (!_id) return;
    await getCollection().doc(_id).delete();
  }

  static async deleteMany() {
    const snapshot = await getCollection().get();
    const batch = getDb().batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }

  static async insertMany(productsArray) {
    for (const p of productsArray) {
      await Product.create(p);
    }
  }

  async save() {
    let discount = 0;
    if (this.mrp && this.price && Number(this.mrp) > Number(this.price)) {
      discount = Math.round(((Number(this.mrp) - Number(this.price)) / Number(this.mrp)) * 100);
    }
    this.discount = discount;

    const payload = {
      name: this.name,
      description: this.description,
      category: this.category,
      price: Number(this.price),
      mrp: Number(this.mrp),
      discount: this.discount,
      images: this.images,
      ingredients: this.ingredients,
      benefits: this.benefits,
      inStock: this.inStock,
      isComingSoon: this.isComingSoon,
      isFeatured: this.isFeatured,
      createdAt: this.createdAt
    };

    await getCollection().doc(this.id).set(payload);
  }
}

export default Product;
