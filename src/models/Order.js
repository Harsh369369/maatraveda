import admin from 'firebase-admin';
import Product from './Product';

const getDb = () => admin.firestore();
const getCollection = () => getDb().collection('orders');

class Order {
  constructor(data) {
    this._id = data._id || data.id;
    this.id = this._id;
    this.customerName = data.customerName;
    this.phone = data.phone;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.pincode = data.pincode;
    this.items = data.items || [];
    this.totalAmount = Number(data.totalAmount);
    this.status = data.status || 'pending';
    this.orderedViaWhatsApp = data.orderedViaWhatsApp !== undefined ? data.orderedViaWhatsApp : true;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  async populateProduct() {
    const populatedItems = [];
    for (const item of this.items) {
      const productId = typeof item.product === 'object' && item.product ? (item.product._id || item.product.id) : item.product;
      const product = await Product.findById(productId);
      populatedItems.push({
        product: product ? {
          _id: product.id,
          id: product.id,
          name: product.name,
          price: product.price,
          images: product.images
        } : null,
        quantity: Number(item.quantity),
        price: Number(item.price)
      });
    }
    this.items = populatedItems;
    return this;
  }

  static async create(data) {
    const payload = {
      customerName: data.customerName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      items: data.items || [],
      totalAmount: Number(data.totalAmount),
      status: data.status || 'pending',
      orderedViaWhatsApp: data.orderedViaWhatsApp !== undefined ? data.orderedViaWhatsApp : true,
      createdAt: new Date().toISOString()
    };

    const docRef = await getCollection().add(payload);
    return new Order({ _id: docRef.id, ...payload });
  }

  static findById(id) {
    const promise = (async () => {
      if (!id) return null;
      const doc = await getCollection().doc(id).get();
      if (!doc.exists) return null;
      return new Order({ _id: doc.id, ...doc.data() });
    })();

    promise.populate = function(path, select) {
      const populatePromise = (async () => {
        const order = await promise;
        if (!order) return null;
        await order.populateProduct();
        return order;
      })();
      return populatePromise;
    };

    return promise;
  }

  static find() {
    const promise = (async () => {
      const snapshot = await getCollection().orderBy('createdAt', 'desc').get();
      return snapshot.docs.map(doc => new Order({ _id: doc.id, ...doc.data() }));
    })();

    promise.populate = function(path, select) {
      const populatePromise = (async () => {
        const orders = await promise;
        for (const order of orders) {
          await order.populateProduct();
        }
        return orders;
      })();

      populatePromise.sort = function() {
        return populatePromise;
      };

      return populatePromise;
    };

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

  async save() {
    const cleanItems = this.items.map(item => {
      const productId = typeof item.product === 'object' && item.product ? (item.product._id || item.product.id) : item.product;
      return {
        product: productId,
        quantity: Number(item.quantity),
        price: Number(item.price)
      };
    });

    const payload = {
      customerName: this.customerName,
      phone: this.phone,
      address: this.address,
      city: this.city,
      state: this.state,
      pincode: this.pincode,
      items: cleanItems,
      totalAmount: Number(this.totalAmount),
      status: this.status,
      orderedViaWhatsApp: this.orderedViaWhatsApp,
      createdAt: this.createdAt
    };
    await getCollection().doc(this.id).set(payload);
  }
}

export default Order;
