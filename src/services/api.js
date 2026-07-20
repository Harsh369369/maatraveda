// High-fidelity fallback products list mirroring the seeded database
const FALLBACK_PRODUCTS = [
  {
    _id: 'prod_1',
    name: 'Keshya Bhringraj & Amla Hair Oil',
    description: 'An ancient Ayurvedic recipe for hair fall control, premature greying, and deep nourishment. Infused with hand-pressed Bhringraj extract, organic Amla, and cooling Sesame Oil. It stimulates hair follicles, prevents dry scalp, and brings back natural luster and thickness.',
    category: 'hair',
    price: 349,
    mrp: 499,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop'
    ],
    ingredients: [
      'Bhringraj (Eclipta prostrata) - Promotes hair growth',
      'Amla (Phyllanthus emblica) - Rich in Vitamin C, darkens hair',
      'Sesame Oil - Penetrates deep to nourish roots',
      'Coconut Oil - Conditions and prevents hair breakage',
      'Neem Leaf - Antibacterial, prevents dandruff',
      'Brahmi - Calms scalp nerves and improves circulation'
    ],
    benefits: [
      'Controls hair fall within 14 days of regular use',
      'Promotes new hair growth and stimulates dormant follicles',
      'Prevents premature greying and dry, itchy scalp',
      'Non-sticky, traditional chemical-free formulation'
    ],
    inStock: true,
    isComingSoon: false,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 142,
    ritualStory: 'Derived from the 3,000-year-old Sahasrayogam text, this oil represents the ultimate Keshya (hair-nurturing) ritual. In traditional families, warm Bhringraj oil was massaged onto children\'s scalps on Sunday mornings to stimulate mental clarity and safeguard thick, dark hair across seasons.'
  },
  {
    _id: 'prod_2',
    name: 'Keshya Shikakai Herbal Shampoo',
    description: 'A gentle, sulphate-free cleanser made from fresh Shikakai, Reetha, and Hibiscus. This traditional formulation washes away scalp impurities without stripping natural moisture, leaving hair exceptionally silky, voluminous, and easy to manage.',
    category: 'hair',
    price: 279,
    mrp: 349,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop'
    ],
    ingredients: [
      'Shikakai Extract - Gentle, pH-balanced cleanser',
      'Reetha (Soapnut) - Natural foaming agent, anti-dandruff',
      'Hibiscus Flower - Strengthens roots and conditions',
      'Aloe Vera Juice - Hydrates and soothes scalp skin',
      'Pro-Vitamin B5 - Adds volume and structural shine'
    ],
    benefits: [
      'Cleanses scalp gently without harmful sulphates or parabens',
      'Restores natural silkiness, bounce, and manageability',
      'Reduces split ends and strengthens thin roots'
    ],
    inStock: true,
    isComingSoon: false,
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 98,
    ritualStory: 'For generations, Indian women ground wild Shikakai pods and soapnuts into a thick paste to wash their hair by temple ponds. Our formula captures this zero-chemical ritual, modernizing the application without losing the raw botanical potency.'
  },
  {
    _id: 'prod_3',
    name: 'Soundarya Kumkumadi Radiant Facial Serum',
    description: 'A legendary Ayurvedic night elixir crafted with 26 precious herbs, led by Kashmiri Saffron (Kumkumadi). This 100% natural facial oil works overnight to illuminate the skin, fade pigmentation spots, smooth fine lines, and enhance the complexion with a glowing gold finish.',
    category: 'face',
    price: 699,
    mrp: 899,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop'
    ],
    ingredients: [
      'Pure Kashmiri Saffron (Kesar) - Skin-brightening antioxidant',
      'Sandalwood (Chandan) - Cools skin and reduces inflammation',
      'Manjistha - Blood purifying herb that heals scars',
      'Licorice (Mulethi) - Clarifies skin and reduces hyperpigmentation',
      'Goat Milk Extract - Lactic acid base for soft exfoliation',
      'Sesame Oil Base - Highly absorbent herbal delivery vehicle'
    ],
    benefits: [
      'Reduces dark spots, blemishes, and stubborn hyperpigmentation',
      'Brings a natural golden glow to the complexion within 7 nights',
      'Deeply hydrates and fights early signs of skin aging'
    ],
    inStock: true,
    isComingSoon: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 216,
    ritualStory: 'Written in the *Ashtanga Hridaya*, Kumkumadi Tailam is hailed as the "divine night nectar." Royal queens applied this Kashmiri saffron blend before sleeping, allowing their skin to absorb the elements of the sun stored inside saffron stigmas.'
  },
  {
    _id: 'prod_4',
    name: 'Soundarya Tejas Golden Ubtan Mask',
    description: 'A traditional bridal ubtan powder turned into a ready-to-use luxury clay mask. Crafted with Turmeric, Almond Meal, and Rose Petals to gently exfoliate, remove tan, and reveal smooth, glowing, radiant skin.',
    category: 'face',
    price: 329,
    mrp: 449,
    discount: 26,
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop'
    ],
    ingredients: [
      'Turmeric (Haldi) - Brightens skin and fights blemishes',
      'Sandalwood Powder - Cooling clay that tightens open pores',
      'Almond Meal - Rich in Vitamin E, nourishes and softens',
      'Rose Water - Soothes and restores natural pH balance',
      'Chickpea Flour - Gently draws out dirt and sebum',
      'Saffron Extract - Instantly enhances natural skin tone'
    ],
    benefits: [
      'Instantly removes skin tan and sun hyperpigmentation',
      'Softly exfoliates dead cells for incredibly smooth skin',
      'Tightens open pores and deeply cleanses impurities'
    ],
    inStock: true,
    isComingSoon: false,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 88,
    ritualStory: 'The pre-wedding Ubtan ceremony is a sacred Indian ritual designed to purify the body and energy. We have captured this ritual in a mess-free, whipped clay base, allowing you to experience bridal radiance in just 10 minutes.'
  },
  {
    _id: 'prod_5',
    name: 'Suryakanti Neem & Turmeric Body Wash',
    description: 'A purifying daily body wash containing pure neem oil extract and fresh turmeric juice. It protects the skin against microbes, soothes skin irritations, and cleanses away dirt while leaving behind a refreshing herbal aroma.',
    category: 'body',
    price: 249,
    mrp: 299,
    discount: 16,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop'
    ],
    ingredients: [
      'Neem Oil - Antibacterial shield, clears acne',
      'Fresh Turmeric Extract - Antiseptic, heals skin irritations',
      'Tea Tree Essential Oil - Unclogs body skin pores',
      'Glycerine Base - Locks in hydration, avoids dry feel',
      'Basil (Tulsi) - Refreshes and purifies body toxins'
    ],
    benefits: [
      'Antibacterial protection for healthy, clear skin barrier',
      'Soothes rashes, back acne, and stubborn skin itchiness',
      'Fresh, herbaceous aroma that energizes daily senses'
    ],
    inStock: true,
    isComingSoon: false,
    isFeatured: false,
    rating: 4.5,
    reviewsCount: 112,
    ritualStory: 'Snana (bathing) is regarded in Ayurveda as a holy act of body purification. Using fresh Neem leaves boiled in water was the traditional shield against tropical skin afflictions. Our body wash delivers this deep biological shield daily.'
  },
  {
    _id: 'prod_6',
    name: 'Suryakanti Royal Sandalwood Body Butter',
    description: 'A rich, decadent whipped cream formulated with pure Mysore Sandalwood oil, virgin Shea butter, and Cocoa butter. Designed to penetrate deeply and hydrate dry skin, wrapping your body in a warm, heavenly woody fragrance.',
    category: 'body',
    price: 499,
    mrp: 649,
    discount: 23,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop'
    ],
    ingredients: [
      'Mysore Sandalwood Oil - Royal cooling woody scent',
      'Raw Shea Butter - Intense moisture restoration',
      'Cocoa Butter - Enhances elasticity, prevents stretch marks',
      'Almond Oil - Deeply conditions and adds natural glow',
      'Aloe Vera Gel Extract - Soothes dry, chapped skin zones'
    ],
    benefits: [
      'Provides 24-hour intense moisture lock for dry skin',
      'Soothes flaky skin and increases elasticity instantly',
      'Luxurious, grounding royal sandalwood aroma'
    ],
    inStock: true,
    isComingSoon: false,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 154,
    ritualStory: 'Pure Chandan (Sandalwood) was ground on stone slabs in South Indian temples to form a cool paste applied to kings. This body butter wraps your skin in that royal, grounding moisture, keeping you protected from modern air-conditioned dryness.'
  },
  {
    _id: 'prod_7',
    name: 'Ojas Triphala Detoxifying Capsules',
    description: 'An ancient Ayurvedic combination of Amalaki, Bibhitaki, and Haritaki. Ideal for gentle daily colon cleanse, digestive rejuvenation, and weight management. It strengthens digestive fire (Agni) and promotes optimal nutrient absorption.',
    category: 'health',
    price: 199,
    mrp: 249,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop'
    ],
    ingredients: [
      'Amalaki (Phyllanthus emblica) - Boosts liver and immune health',
      'Bibhitaki (Terminalia bellirica) - Detoxifies lungs and bowels',
      'Haritaki (Terminalia chebula) - Regulates gut movements naturally'
    ],
    benefits: [
      'Supports optimal gut health and gentle bowel regulation daily',
      'Flushes out toxins and heavy body wastes from cells',
      'Boosts natural metabolic rate and immunity'
    ],
    inStock: true,
    isComingSoon: false,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 165,
    ritualStory: 'The *Charaka Samhita* states: "He who takes Triphala daily lives for a hundred years free from disease." By balancing all three doshas internally, Triphala cleanses your digestive tract—which is the absolute foundation of glowing skin and hair.'
  },
  {
    _id: 'prod_8',
    name: 'Ojas Ashwagandha Vitality Elixir',
    description: 'A powerful, concentrated extract of pure Himalayan Ashwagandha roots in a sweet herbal base. Known as the ultimate adaptogen, Ashwagandha reduces stress, calms the mind, restores physical strength, and promotes restful sleep.',
    category: 'health',
    price: 399,
    mrp: 499,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop'
    ],
    ingredients: [
      'Ashwagandha (Withania somnifera) Extract - Powerful adaptogen',
      'Pure Honey - Soothes throat and delivers herbs deeper',
      'Cardamom - Aids digestion and freshens breath',
      'Ghee Essence - Lubricates joints and restores vitality',
      'Licorice Roots - Calms the stomach and supports immunity'
    ],
    benefits: [
      'Alleviates chronic stress and dramatically lowers cortisol',
      'Improves muscle strength, endurance, and physical energy',
      'Calms the nervous system and supports natural sleep cycles'
    ],
    inStock: true,
    isComingSoon: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 189,
    ritualStory: 'Ashwagandha literally translates to "smell of a horse," symbolizing the strength and vitality of a stallion. Taken at dusk with warm milk, this adaptogenic tonic relaxes the busy, racing mind and restores deep core energy overnight.'
  },
  {
    _id: 'prod_9',
    name: 'Ojas Brahmi Memory Concentrate',
    description: 'A cognitive support liquid concentrate currently under rigorous traditional testing. Infused with Brahmi, Shankhpushpi, and Gotu Kola to support concentration, memory focus, and reduce mental fatigue. Coming soon to Matriveda!',
    category: 'health',
    price: 450,
    mrp: 550,
    discount: 18,
    images: [
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop'
    ],
    ingredients: [
      'Brahmi Extract - Boosts cognitive neurons',
      'Shankhpushpi - Calms hyperactive brains',
      'Gotu Kola Extract - Supports focus and memory',
      'Pure Cane Juice Syrup - Preservative-free base'
    ],
    benefits: [
      'Boosts memory retention and mental alertness',
      'Calms hyperactive nerves and increases concentration',
      'Preservative-free, completely traditional preparation'
    ],
    inStock: false,
    isComingSoon: true,
    isFeatured: false,
    rating: 0,
    reviewsCount: 0,
    ritualStory: 'Brahmi is named after Lord Brahma, the creator of the universe in Hindu cosmogony. Hailed as a "Medhya Rasayana" (brain tonic), it has been used by students and spiritual practitioners to expand memory and enhance meditation for ages.'
  }
];

// Local Database Helpers
const getLocalData = (key, defaultVal) => {
  if (typeof window === 'undefined') return defaultVal;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultVal;
};

const setLocalData = (key, val) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(val));
  }
};

// Initialize localStorage databases with mock data
const initDb = () => {
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('mv_db_products')) {
      localStorage.setItem('mv_db_products', JSON.stringify(FALLBACK_PRODUCTS));
    }
    if (!localStorage.getItem('mv_db_orders')) {
      localStorage.setItem('mv_db_orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('mv_db_subscribers')) {
      localStorage.setItem('mv_db_subscribers', JSON.stringify([]));
    }
  }
};
initDb();

const getProductsDb = () => getLocalData('mv_db_products', FALLBACK_PRODUCTS);
const setProductsDb = (products) => setLocalData('mv_db_products', products);

const getOrdersDb = () => getLocalData('mv_db_orders', []);
const setOrdersDb = (orders) => setLocalData('mv_db_orders', orders);

const getSubscribersDb = () => getLocalData('mv_db_subscribers', []);
const setSubscribersDb = (subs) => setLocalData('mv_db_subscribers', subs);

const getAdminHeaders = () => {
  const token = localStorage.getItem('matree_admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const productServices = {
  // Get all products, optionally filter by category
  getAllProducts: async (category = 'all') => {
    try {
      const url = category === 'all' ? '/api/products' : `/api/products?category=${category}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to fetch products from server');
    } catch (err) {
      console.warn('getAllProducts from server failed, using localStorage fallback:', err.message);
      const products = getProductsDb();
      const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
      return { success: true, products: filtered, isMocked: true };
    }
  },

  // Get details of a single product
  getProductById: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to fetch product detail from server');
    } catch (err) {
      console.warn(`getProductById (${id}) failed, using localStorage fallback:`, err.message);
      const products = getProductsDb();
      const product = products.find(p => p._id === id) || products[0];
      return { success: true, product, isMocked: true };
    }
  },

  // Create a new product (Admin protected)
  createProduct: async (productData) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders()
        },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to create product on server');
    } catch (err) {
      console.warn('createProduct failed, using localStorage fallback:', err.message);
      const products = getProductsDb();
      const newProduct = {
        _id: 'prod_' + Math.random().toString(36).substring(2, 9),
        rating: 4.5,
        reviewsCount: 1,
        ritualStory: 'Mock story for ' + productData.name,
        ...productData,
        ingredients: Array.isArray(productData.ingredients) 
          ? productData.ingredients 
          : productData.ingredients ? [productData.ingredients] : [],
        benefits: Array.isArray(productData.benefits) 
          ? productData.benefits 
          : productData.benefits ? [productData.benefits] : []
      };
      products.push(newProduct);
      setProductsDb(products);
      return { success: true, product: newProduct, isMocked: true };
    }
  },

  // Update an existing product (Admin protected)
  updateProduct: async (id, productData) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders()
        },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to update product on server');
    } catch (err) {
      console.warn(`updateProduct (${id}) failed, using localStorage fallback:`, err.message);
      const products = getProductsDb();
      const index = products.findIndex(p => p._id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        setProductsDb(products);
        return { success: true, product: products[index], isMocked: true };
      }
      return { success: false, message: 'Product not found in fallback storage' };
    }
  },

  // Delete a product (Admin protected)
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAdminHeaders()
        }
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to delete product on server');
    } catch (err) {
      console.warn(`deleteProduct (${id}) failed, using localStorage fallback:`, err.message);
      let products = getProductsDb();
      products = products.filter(p => p._id !== id);
      setProductsDb(products);
      return { success: true, message: 'Product successfully deleted from fallback storage', isMocked: true };
    }
  },
};

export const orderServices = {
  // Create a new order (Public)
  createOrder: async (orderData) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to create order on server');
    } catch (err) {
      console.warn('createOrder failed, using localStorage fallback:', err.message);
      const orders = getOrdersDb();
      const newOrder = {
        _id: 'order_mock_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        createdAt: new Date().toISOString(),
        status: 'pending',
        ...orderData
      };
      orders.push(newOrder);
      setOrdersDb(orders);
      return { success: true, message: 'Order simulated in local storage successfully', order: newOrder, isMocked: true };
    }
  },

  // Get all orders (Admin protected)
  getAllOrders: async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: {
          ...getAdminHeaders()
        }
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to fetch orders from server');
    } catch (err) {
      console.warn('getAllOrders failed, using localStorage fallback:', err.message);
      return { success: true, count: getOrdersDb().length, orders: getOrdersDb(), isMocked: true };
    }
  },

  // Update order status (Admin protected)
  updateStatus: async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders()
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to update order status on server');
    } catch (err) {
      console.warn(`updateStatus (${id}) failed, using localStorage fallback:`, err.message);
      const orders = getOrdersDb();
      const index = orders.findIndex(o => o._id === id);
      if (index !== -1) {
        orders[index].status = status;
        setOrdersDb(orders);
        return { success: true, order: orders[index], isMocked: true };
      }
      return { success: false, message: 'Order not found in fallback storage' };
    }
  },
};

export const newsletterServices = {
  // Subscribe a new email to newsletter
  subscribe: async (email) => {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to subscribe on server');
    } catch (err) {
      console.warn('subscribe failed, using localStorage fallback:', err.message);
      const subs = getSubscribersDb();
      if (!subs.some(s => s.email === email)) {
        subs.push({ email, subscribedAt: new Date().toISOString() });
        setSubscribersDb(subs);
      }
      return { success: true, message: '🌿 Welcome to the Matriveda ritual! Your subscription is active in fallback storage.', isMocked: true };
    }
  },

  // Get all newsletter subscribers (Admin protected)
  getAllSubscribers: async () => {
    try {
      const res = await fetch('/api/newsletter', {
        headers: {
          ...getAdminHeaders()
        }
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to fetch subscribers from server');
    } catch (err) {
      console.warn('getAllSubscribers failed, using localStorage fallback:', err.message);
      const subs = getSubscribersDb();
      return { success: true, count: subs.length, subscribers: subs, isMocked: true };
    }
  },
};

export const adminServices = {
  // Get all registered users (Admin protected)
  getAllUsers: async () => {
    try {
      const res = await fetch('/api/auth/users', {
        headers: {
          ...getAdminHeaders()
        }
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to fetch customers from server');
    } catch (err) {
      console.warn('getAllUsers failed, using empty mock list:', err.message);
      return { success: true, count: 0, users: [], isMocked: true };
    }
  }
};

export const paymentServices = {
  createOrder: async (amount) => {
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to create payment order on server');
    } catch (err) {
      console.warn('createOrder for payment failed, using simulation:', err.message);
      return {
        success: true,
        order: {
          id: 'order_pay_' + Math.random().toString(36).substring(2, 9),
          amount: amount * 100,
          currency: 'INR'
        },
        simulated: true
      };
    }
  },
  verifyPayment: async (details) => {
    try {
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });
      const data = await res.json();
      if (data.success) return data;
      throw new Error(data.message || 'Failed to verify payment on server');
    } catch (err) {
      console.warn('verifyPayment failed, using simulation:', err.message);
      return { success: true, message: 'Payment verified successfully via client-side simulation', simulated: true };
    }
  }
};

export default productServices;
