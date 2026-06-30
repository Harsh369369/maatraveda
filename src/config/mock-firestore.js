class MockFirestore {
  constructor() {
    this.store = {}; // name -> { id -> data }
  }

  collection(name) {
    if (!this.store[name]) {
      this.store[name] = {};
    }
    return new MockCollection(this.store[name], name, this);
  }

  batch() {
    const operations = [];
    return {
      delete(ref) {
        operations.push({ type: 'delete', ref });
      },
      async commit() {
        for (const op of operations) {
          if (op.type === 'delete') {
            delete op.ref.collectionStore[op.ref.id];
          }
        }
      }
    };
  }
}

class MockCollection {
  constructor(collectionStore, name, db) {
    this.collectionStore = collectionStore;
    this.name = name;
    this.db = db;
    this.filters = [];
    this.limitVal = null;
    this.orderByVal = null;
  }

  doc(id) {
    return new MockDoc(this.collectionStore, id, this);
  }

  where(field, op, val) {
    const newCol = new MockCollection(this.collectionStore, this.name, this.db);
    newCol.filters = [...this.filters, { field, op, val }];
    newCol.limitVal = this.limitVal;
    newCol.orderByVal = this.orderByVal;
    return newCol;
  }

  limit(num) {
    const newCol = new MockCollection(this.collectionStore, this.name, this.db);
    newCol.filters = this.filters;
    newCol.limitVal = num;
    newCol.orderByVal = this.orderByVal;
    return newCol;
  }

  orderBy(field, dir) {
    const newCol = new MockCollection(this.collectionStore, this.name, this.db);
    newCol.filters = this.filters;
    newCol.limitVal = this.limitVal;
    newCol.orderByVal = { field, dir };
    return newCol;
  }

  async add(payload) {
    const id = 'mock_id_' + Math.random().toString(36).substring(2, 9);
    this.collectionStore[id] = JSON.parse(JSON.stringify(payload));
    return { id };
  }

  async get() {
    let docs = Object.entries(this.collectionStore).map(([id, data]) => {
      return new MockDocSnapshot(id, data, this.collectionStore);
    });

    // Apply filters
    for (const filter of this.filters) {
      docs = docs.filter(doc => {
        const data = doc.data();
        if (!data) return false;
        const val = data[filter.field];
        if (filter.op === '==') {
          return val === filter.val;
        }
        return true;
      });
    }

    // Apply orderBy
    if (this.orderByVal) {
      const { field, dir } = this.orderByVal;
      docs.sort((a, b) => {
        const valA = a.data()?.[field];
        const valB = b.data()?.[field];
        if (valA === undefined || valB === undefined) return 0;
        if (valA < valB) return dir === 'desc' ? 1 : -1;
        if (valA > valB) return dir === 'desc' ? -1 : 1;
        return 0;
      });
    }

    // Apply limit
    if (this.limitVal !== null) {
      docs = docs.slice(0, this.limitVal);
    }

    return {
      empty: docs.length === 0,
      size: docs.length,
      docs
    };
  }
}

class MockDoc {
  constructor(collectionStore, id, collection) {
    this.collectionStore = collectionStore;
    this.id = id;
    this.collection = collection;
  }

  async get() {
    const exists = this.collectionStore[this.id] !== undefined;
    const data = exists ? this.collectionStore[this.id] : null;
    return new MockDocSnapshot(this.id, data, this.collectionStore);
  }

  async set(payload) {
    this.collectionStore[this.id] = JSON.parse(JSON.stringify(payload));
  }

  async delete() {
    delete this.collectionStore[this.id];
  }

  get ref() {
    return this;
  }
}

class MockDocSnapshot {
  constructor(id, data, collectionStore) {
    this.id = id;
    this._data = data;
    this.collectionStore = collectionStore;
  }

  get exists() {
    return this._data !== null && this._data !== undefined;
  }

  data() {
    return this._data ? JSON.parse(JSON.stringify(this._data)) : null;
  }
}

export default MockFirestore;
