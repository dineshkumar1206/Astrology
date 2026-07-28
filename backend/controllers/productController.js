const Product = require('../models/Product');

// Helper to convert binary buffer images back to Base64 data URIs
const formatProduct = (product) => {
  if (!product) return null;
  const p = product.toJSON();
  if (p.image) {
    if (Buffer.isBuffer(p.image)) {
      const str = p.image.toString('utf-8');
      if (str.startsWith('/') || str.startsWith('http') || str.startsWith('data:')) {
        p.image = str;
      } else {
        const mime = p.imageMime || 'image/jpeg';
        p.image = `data:${mime};base64,${p.image.toString('base64')}`;
      }
    }
  }
  return p;
};

// Seed defaults
const DEFAULT_PRODUCTS = [
  // --- Crystals ---
  {
    name: 'Rasi Crystal',
    price: 1500,
    type: 'Blessed & Energized',
    category: 'Rasi',
    desc: 'Harmonized for your specific zodiac sign (Rasi) to promote balance, aura cleansing, and positive celestial energy.',
    image: '/Raw-Amethyst-Geode.png',
    inclusions: [
      'Specially selected for your Rashi (Moon Sign)',
      'Spiritually cleansed and energized',
      'Couriered with sacred prasadham and care instructions'
    ],
    sizes: ['6', '7', '8']
  },
  {
    name: 'Crystal Bracelet',
    price: 1200,
    type: 'Blessed & Energized',
    category: 'Bracelet',
    desc: 'Elegant and powerful healing crystal bead bracelet to protect your aura and maintain daily emotional peace.',
    image: '/Rose-Quartz-Love-Bowl-Tumbles.png',
    inclusions: [
      'Premium hand-picked crystal beads',
      'Spiritually cleansed and energized for protection',
      'Couriered with sacred prasadham and care instructions'
    ],
    sizes: ['6mm', '8mm', '10mm']
  },
  {
    name: 'Golden Pyrite',
    price: 1800,
    type: 'Blessed & Energized',
    category: 'Pyrite',
    desc: 'The golden stone of luck, abundance, and business growth. Ideal for work tables and wealth manifestation.',
    image: '/Golden-Pyrite-Cluster.png',
    inclusions: [
      'High-grade golden Pyrite crystal',
      'Spiritually energized for wealth attraction',
      'Couriered with sacred prasadham and care instructions'
    ],
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    name: 'Crystal Ring',
    price: 1600,
    type: 'Blessed & Energized',
    category: 'Rings',
    desc: 'Sacred energized crystal rings to keep positive vibrations in close contact with your personal energy paths throughout the day.',
    image: '/crystal.jpg',
    inclusions: [
      'Premium high-grade energized crystal rings',
      'Protects personal energy pathways',
      'Couriered with sacred prasadham'
    ],
    sizes: ['6', '7', '8', '9']
  },
  {
    name: 'Crystal Pendant',
    price: 1400,
    type: 'Blessed & Energized',
    category: 'Pendants',
    desc: 'Sacred crystal pendants charged to rest near your heart chakra, enhancing emotional healing, peace, and spiritual connection.',
    image: '/Clear-Quartz-Generator-Point.png',
    inclusions: [
      'Energized heart-chakra connection pendant',
      'Handcrafted natural gemstone pendant',
      'Couriered with sacred prasadham'
    ],
    sizes: ['Standard']
  },
  {
    name: 'Polished Tumbles',
    price: 800,
    type: 'Blessed & Energized',
    category: 'Tumbles',
    desc: 'Smooth, polished pocket crystals to carry for personal healing, continuous chakra balance, and daily focus.',
    image: '/Raw-Black-Tourmaline-Shield.png',
    inclusions: [
      'Set of smooth, high-quality tumbles',
      'Spiritually energized by Sara',
      'Couriered with velvet carry pouch'
    ],
    sizes: ['100g', '200g', '500g']
  },
  {
    name: 'Crystal Ball',
    price: 3200,
    type: 'Blessed & Energized',
    category: 'Crystal balls',
    desc: 'Perfectly spherical crystal balls to radiate healing energy evenly in all directions. Ideal for home and meditation spaces.',
    image: '/Clear-Quartz-Generator-Point.png',
    inclusions: [
      'High-clarity energy crystal ball',
      'Comes with a premium wooden display stand',
      'Couriered with activation guide'
    ],
    sizes: ['40mm', '50mm', '60mm']
  },
  {
    name: 'Pyrite Frame',
    price: 4500,
    type: 'Blessed & Energized',
    category: 'Pyrite frames',
    desc: 'Beautifully framed high-grade pyrite cluster to invite wealth, abundant business opportunities, and protection into your home or office.',
    image: '/Golden-Pyrite-Cluster.png',
    inclusions: [
      'Authentic pyrite cluster mounted in elegant frame',
      'Spiritually programmed for wealth manifest',
      'Couriered with sacred thread and prasadham'
    ],
    sizes: ['5x5 inches', '6x6 inches']
  },
  {
    name: 'Crystal Mala',
    price: 2500,
    type: 'Blessed & Energized',
    category: 'Crystal mala',
    desc: 'Sacred crystal prayer beads (108 beads) for mantra chanting, deep meditation, and continuous spiritual connection.',
    image: '/crystal.jpg',
    inclusions: [
      '108 authentic crystal mala beads',
      'Spiritually cleansed and energized by Sara',
      'Couriered with sacred prasadham'
    ],
    sizes: ['108 Beads']
  },
  {
    name: 'Crystal Tower',
    price: 2200,
    type: 'Blessed & Energized',
    category: 'Crystal tower',
    desc: 'Energized crystal towers to amplify intentions, direct healing cosmic energy upward, and cleanse your living space.',
    image: '/Raw-Amethyst-Geode.png',
    inclusions: [
      'Hand-cut energetic crystal tower generator',
      'Amplifies manifesting intentions',
      'Couriered with sacred prasadham and care guide'
    ],
    sizes: ['2-3 inches', '3-4 inches']
  },

  // --- Tarot Private Consultation ---
  {
    name: 'One Question Consultation',
    price: 500,
    type: 'Voice Note Only',
    category: 'Tarot Private Consultation',
    desc: 'Submit 1 specific question. You will receive a detailed audio voice note explaining your cards and solutions.',
    inclusions: ['Submit 1 specific question', 'Detailed audio voice note analysis', 'Remedial steps and suggestions']
  },
  {
    name: '30 Minutes Session',
    price: 2500,
    type: 'Live Call or Voice Note',
    category: 'Tarot Private Consultation',
    desc: 'Covers up to 3 questions, detailed solutions, and interactive guidance.',
    inclusions: ['Covers up to 3 questions', 'Live WhatsApp/Zoom call option', 'Remedies and energetic guidance']
  },
  {
    name: '1 Hour Session',
    price: 4000,
    type: 'Live Call or Voice Note',
    category: 'Tarot Private Consultation',
    desc: 'Covers up to 7 questions, deep-dive solutions, remedies, and astrological chart guidance.',
    inclusions: ['Covers up to 7 questions', 'Astrological and chart guidance included', 'Detailed remedies sheet']
  },
  {
    name: 'Angel Messages',
    price: 1500,
    type: 'Voice Note Only',
    category: 'Tarot Private Consultation',
    desc: 'Receive special angel guidance and messages for 2 specific questions.',
    inclusions: ['2 specific questions answered', 'Direct guidance from Angel decks', 'Voice note delivery']
  },
  {
    name: 'Murugan Message Reading',
    price: 1500,
    type: 'Voice Note Only',
    category: 'Tarot Private Consultation',
    desc: 'Specific guidance and messages for 2 questions via Sara Murugan Cards.',
    inclusions: ['2 questions answered', 'Murugan Cards invocation', 'Practical daily remedies']
  },
  {
    name: 'Relationship Specific Session',
    price: 3800,
    type: 'Live Call or Voice Note',
    category: 'Tarot Private Consultation',
    desc: 'Specialized focus on relationship dynamics, healing, and compatibility analysis.',
    inclusions: ['In-depth relationship reading', 'Compatibility energy checks', 'Harmonization suggestions']
  },
  {
    name: 'Past, Present & Future Reading',
    price: 6500,
    type: 'Live Call or Voice Note',
    category: 'Tarot Private Consultation',
    desc: 'Comprehensive life spread analyzing your past influences, current state, and future paths.',
    inclusions: ['12-card timeline spread', 'Comprehensive life areas cover', 'Full remedies guidance']
  },
  {
    name: 'Past Life Reading Session',
    price: 8000,
    type: 'Live Call or Voice Note',
    category: 'Tarot Private Consultation',
    desc: 'Explore your past life karmas, lessons, and how they impact your current lifetime.',
    inclusions: ['Karmic patterns exploration', 'Past life connection to current blocks', 'Soul lessons activation']
  },
  {
    name: 'Spiritual Healing Session (40 Mins)',
    price: 7000,
    type: 'Duration: 40 minutes',
    category: 'Tarot Private Consultation',
    desc: 'Energy healing session tailored for relationships, money attraction, career, mental peace, or protection.',
    inclusions: ['40 mins dedicated distance healing', 'Chakra balancing and realignment', 'Post-session summary & protection thread']
  },
  {
    name: 'Special Spiritual Guidance & Remedies',
    price: 5000,
    type: 'Live Call or Zoom Call',
    category: 'Tarot Private Consultation',
    desc: 'Holistic spiritual guidance combined with active remedies for wellness.',
    inclusions: ['Dedicated remedies roadmap', 'Direct video session with Sara', 'Energy protection steps']
  },

  // --- Spiritual Healing ---
  {
    name: 'Relationship Healing Session',
    price: 7000,
    type: 'Duration: 40 minutes',
    category: 'Spiritual Healing',
    desc: 'Clears toxic residue, heals emotional wounds, and opens heart chakra channels to restore relationship peace.',
    inclusions: ['Chakra realignment', 'Toxic cord cutting', 'Love vibration amplification']
  },
  {
    name: 'Money Attraction Healing',
    price: 7000,
    type: 'Duration: 40 minutes',
    category: 'Spiritual Healing',
    desc: 'Removes financial blockages, aligns root and solar plexus chakra frequencies to attract career growth and wealth.',
    inclusions: ['Financial blockage removal', 'Abundance mindset tuning', 'Solar Plexus chakra activation']
  },
  {
    name: 'Mental Peace & Aura Cleansing',
    price: 7000,
    type: 'Duration: 40 minutes',
    category: 'Spiritual Healing',
    desc: 'Dissolves stress, anxiety, and external negative vibes. Restores sleep cycles and mental clarity.',
    inclusions: ['Auric field purification', 'Anxiety release guidance', 'Peace energy induction']
  },
  {
    name: 'Protection Healing Shield',
    price: 7000,
    type: 'Duration: 40 minutes',
    category: 'Spiritual Healing',
    desc: 'Builds a protective auric shield to neutralize negative thoughts, evil eyes, and external psychic attacks.',
    inclusions: ['Shielding and warding', 'Negative energy diversion', 'Kavach thread blessing']
  },

  // --- Murugar Cards ---
  {
    name: 'Sara Murugan Card Reading (2 Questions)',
    price: 1500,
    type: 'Voice Note Analysis',
    category: 'Murugar Cards',
    desc: 'Submit 2 specific questions. Receive deep insights, Murugan blessings, and practical remedies in a detailed voice note.',
    image: '/card-1.jpg',
    inclusions: ['2 questions answered in depth', 'Murugan Vel remedies', 'WhatsApp audio format']
  },

  // --- Tarot Card Reading (Classes) ---
  {
    name: 'Professional Tarot Masterclass',
    price: 15000,
    type: 'Full Course Certification',
    category: 'Tarot Card Reading',
    desc: 'Interactive online classes covering Major & Minor Arcana, symbolism, intuition connection, specialized spreads, and business startup modules.',
    inclusions: ['Live Zoom classes with recording logs', 'Complete workbook & cheat sheets', 'Certification of completion']
  },

  // --- Spiritual Counseling (Classes) ---
  {
    name: 'Spiritual Counseling & Life Coaching Course',
    price: 12000,
    type: 'Full Course Certification',
    category: 'Spiritual Counseling',
    desc: 'Learn active remedies, psychological-spiritual counseling frameworks, aura analysis, and techniques to guide others towards mental wellness.',
    inclusions: ['Interactive coaching models', 'Aura scanning training', 'Certification and internship hours option']
  },

  // --- Kali Pooja ---
  {
    name: 'Basic Kali Pooja for Growth',
    price: 2001,
    type: 'With Prasadham included',
    category: 'Kali Pooja',
    desc: 'A monthly Amavasya pooja dedicated to removing stagnation and inviting positive energy, success, and spiritual/material growth into your life.',
    image: '/card-1.jpg',
    inclusions: ['Personalized Sankalpam (Intent)', 'Archana and Aarti', 'Sacred Prasadham couriered to your address']
  },
  {
    name: 'Relationship Problems Pooja',
    price: 3001,
    type: 'Heal and harmonize your bonds',
    category: 'Kali Pooja',
    desc: 'Specially performed during Amavasya to clear misunderstandings, dissolve negative energies between couples or family members, and restore peace and affection.',
    image: '/card-2.jpg',
    inclusions: ['Specific prayers for relationship healing', 'Dosha Nivaran mantras', 'Blessed thread/Prasadham']
  },
  {
    name: 'Business Kali Pooja',
    price: 5001,
    type: 'With Prasadham included',
    category: 'Kali Pooja',
    desc: 'Designed for entrepreneurs, business owners, and professionals. This ritual invokes Goddess Kali to eliminate corporate evil-eyes, overcome financial blocks, and attract wealth.',
    image: '/card-3.jpg',
    inclusions: ['Vyapaar Vridhi Sankalpam', 'Obstacle removal rituals', 'Energized Business Prasadham kit']
  },
  {
    name: 'Black Magic Protection Pooja (Individual)',
    price: 30000,
    type: 'With complete protection materials & prasadham',
    category: 'Kali Pooja',
    desc: 'A deeply intensive, protective ritual tailored for one individual struggling with severe negativity, unexplained psychological weight, or dark energy interference.',
    image: '/card-4.jpg',
    inclusions: ['Individual specialized protection shield (Kavach)', 'Purification rituals using premium samagri', 'Complete customized protection items & Prasadham']
  },
  {
    name: 'Black Magic Protection Pooja (Family)',
    price: 50000,
    type: 'Complete protection shield for the whole family',
    category: 'Kali Pooja',
    desc: 'An expansive and powerful household-level ritual that cleanses your entire living space and creates an unbreakable protective aura around all family members.',
    image: '/card-5.jpg',
    inclusions: ['Full family lineage protection Sankalpam', 'Home negative energy purging rituals', 'Comprehensive protective items & Prasadham pack for all members']
  }
];

// Get all products (seeds database if empty)
const getProducts = async (req, res) => {
  try {
    let products = await Product.findAll();

    // If database is empty, seed defaults
    if (products.length === 0) {
      await Product.bulkCreate(DEFAULT_PRODUCTS);
      products = await Product.findAll();
    }

    let formattedProducts = products.map(p => formatProduct(p));

    // Optional query parameter filtering
    const { category } = req.query;
    if (category) {
      formattedProducts = formattedProducts.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    }

    res.json(formattedProducts);
  } catch (err) {
    console.error('getProducts error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  console.log('--- POST /api/products request received ---');
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);

  const { name, price, type, category, desc, image, inclusions, sizes } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: 'Product name, price, and category are required' });
  }

  try {
    let imageBuffer = null;
    let imageMime = null;

    if (req.file) {
      imageBuffer = req.file.buffer;
      imageMime = req.file.mimetype;
    } else if (image) {
      imageBuffer = Buffer.from(image);
      imageMime = null;
    }

    let parsedInclusions = inclusions;
    if (typeof inclusions === 'string') {
      try {
        parsedInclusions = JSON.parse(inclusions);
      } catch (e) {
        parsedInclusions = [];
      }
    }

    let parsedSizes = sizes;
    if (typeof sizes === 'string') {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (e) {
        parsedSizes = [];
      }
    }

    const newProduct = await Product.create({
      name,
      price: parseInt(price, 10),
      type,
      category,
      desc,
      image: imageBuffer,
      imageMime,
      inclusions: parsedInclusions,
      sizes: parsedSizes
    });

    res.status(201).json(formatProduct(newProduct));
  } catch (err) {
    console.error('createProduct error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  console.log('--- PUT /api/products/:id request received ---');
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);

  const { name, price, type, category, desc, image, inclusions, sizes } = req.body;

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name !== undefined ? name : product.name;
    product.price = price !== undefined ? parseInt(price, 10) : product.price;
    product.type = type !== undefined ? type : product.type;
    product.category = category !== undefined ? category : product.category;
    product.desc = desc !== undefined ? desc : product.desc;

    if (req.file) {
      product.image = req.file.buffer;
      product.imageMime = req.file.mimetype;
    } else if (image !== undefined) {
      if (typeof image === 'string' && !image.startsWith('data:')) {
        product.image = Buffer.from(image);
        product.imageMime = null;
      }
    }

    if (inclusions !== undefined) {
      let parsedInclusions = inclusions;
      if (typeof inclusions === 'string') {
        try {
          parsedInclusions = JSON.parse(inclusions);
        } catch (e) {
          parsedInclusions = product.inclusions;
        }
      }
      product.inclusions = parsedInclusions;
    }

    if (sizes !== undefined) {
      let parsedSizes = sizes;
      if (typeof sizes === 'string') {
        try {
          parsedSizes = JSON.parse(sizes);
        } catch (e) {
          parsedSizes = product.sizes;
        }
      }
      product.sizes = parsedSizes;
    }

    await product.save();
    res.json(formatProduct(product));
  } catch (err) {
    console.error('updateProduct error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product removed' });
  } catch (err) {
    console.error('deleteProduct error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(formatProduct(product));
  } catch (err) {
    console.error('getProductById error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
