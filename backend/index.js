const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();

// --- CORS CONFIGURATION ---
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://sara-tarot.vercel.app',
  'https://astrology-ten-neon.vercel.app' // Added your new Vercel URL here
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin) return callback(null, true);
    
    // Normalize origin URL by stripping any trailing slash
    const cleanOrigin = origin.replace(/\/$/, '');
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(o => o.replace(/\/$/, '') === cleanOrigin) || 
                      cleanOrigin.startsWith('http://localhost:') || 
                      cleanOrigin.endsWith('.vercel.app') || 
                      cleanOrigin.endsWith('amigowebster.in');
                      
    if (isAllowed) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// --- ROUTE REGISTRATION ---
// This function ensures your routes work perfectly whether running locally 
// or inside the '/astrology' subfolder on cPanel.
const registerRoutes = (prefix) => {
  const cleanPrefix = prefix === '/' ? '/' : `/${prefix.replace(/^\/|\/$/g, '')}/`;
  
  app.use(cleanPrefix === '/' ? '/api/auth' : `${cleanPrefix}api/auth`, require('./routes/auth'));
  app.use(cleanPrefix === '/' ? '/api/products' : `${cleanPrefix}api/products`, require('./routes/products'));
  app.use(cleanPrefix === '/' ? '/api/contact' : `${cleanPrefix}api/contact`, require('./routes/contact'));
  app.use(cleanPrefix === '/' ? '/api/categories' : `${cleanPrefix}api/categories`, require('./routes/categories'));
  app.use(cleanPrefix === '/' ? '/api/orders' : `${cleanPrefix}api/orders`, require('./routes/orders'));
  
  app.get(cleanPrefix === '/' ? '/' : cleanPrefix.slice(0, -1), (req, res) => {
    res.send('Saraa Tarot API is running...');
  });
  if (cleanPrefix !== '/') {
    app.get(cleanPrefix, (req, res) => {
      res.send('Saraa Tarot API is running...');
    });
  }
};

// Register standard routes for local testing (e.g., /api/auth)
registerRoutes('/');

// Register cPanel subfolder routes (e.g., /astrology/api/auth)
registerRoutes('/astrology');


// --- DATABASE & SEEDING CONFIGURATION ---
const PORT = process.env.PORT || 5001;
const User = require('./models/User');
const Category = require('./models/Category');
const Order = require('./models/Order');
const LoginHistory = require('./models/LoginHistory');

const seedAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@saraatarot.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword';

    const adminExists = await User.findOne({ where: { role: 'ADMIN' } });
    if (!adminExists) {
      const existingUser = await User.findOne({ where: { email: adminEmail } });
      if (existingUser) {
        existingUser.role = 'ADMIN';
        await existingUser.save();
        console.log('Existing user upgraded to ADMIN.');
      } else {
        await User.create({
          name: 'Saraa Tarot Admin',
          email: adminEmail,
          password: adminPassword,
          role: 'ADMIN'
        });
        console.log('Admin user seeded into database.');
      }
    }
  } catch (err) {
    console.error('Failed to seed admin user:', err);
  }
};

const seedCategories = async () => {
  try {
    const targetCategories = [
      { name: 'Rasi', type: 'crystal', desc: 'Specially energized crystals harmonized for your specific zodiac sign to bring balance and positive cosmic vibrations.', image: '/Raw-Amethyst-Geode.png', slug: 'rasi' },
      { name: 'Bracelet', type: 'crystal', desc: 'Beautifully crafted bead bracelets for daily energetic protection, emotional peace, and spiritual support.', image: '/Rose-Quartz-Love-Bowl-Tumbles.png', slug: 'bracelet' },
      { name: 'Pyrite', type: 'crystal', desc: 'The golden stone of luck, abundance, and business growth. Ideal for work tables and wealth manifestation.', image: '/Golden-Pyrite-Cluster.png', slug: 'pyrite' },
      { name: 'Rings', type: 'crystal', desc: 'Sacred energized crystal rings to keep positive vibrations in close contact with your personal energy paths throughout the day.', image: '/crystal.jpg', slug: 'rings' },
      { name: 'Pendants', type: 'crystal', desc: 'Sacred crystal pendants charged to rest near your heart chakra, enhancing emotional healing, peace, and spiritual connection.', image: '/Clear-Quartz-Generator-Point.png', slug: 'pendants' },
      { name: 'Tumbles', type: 'crystal', desc: 'Smooth, polished crystal pocket stones for personal healing, chakra balance, and daily focus.', image: '/Raw-Black-Tourmaline-Shield.png', slug: 'tumbles' },
      { name: 'Crystal balls', type: 'crystal', desc: 'Perfectly spherical crystal balls to radiate healing energy in all directions, ideal for home and meditation spaces.', image: '/Clear-Quartz-Generator-Point.png', slug: 'crystal-balls' },
      { name: 'Pyrite frames', type: 'crystal', desc: 'Beautifully framed pyrite clusters to attract wealth, abundance, and protection into your home or office.', image: '/Golden-Pyrite-Cluster.png', slug: 'pyrite-frames' },
      { name: 'Crystal mala', type: 'crystal', desc: 'Sacred crystal prayer beads for mantra chanting, meditation, and continuous spiritual connection.', image: '/crystal.jpg', slug: 'crystal-mala' },
      { name: 'Crystal tower', type: 'crystal', desc: 'Energized crystal towers to amplify intention, direct positive energy, and cleanse your living space.', image: '/Raw-Amethyst-Geode.png', slug: 'crystal-tower' },
      { name: 'Tarot Private Consultation', type: 'service', desc: 'One-on-one personal guidance session with Sara to answer your life questions.', slug: 'tarot-consultation' },
      { name: 'Spiritual Healing', type: 'service', desc: 'Blessed distance healing therapy to clean aura, manifest prosperity, and remove energetic blockages.', slug: 'spiritual-healing' },
      { name: 'Murugar Cards', type: 'service', desc: 'Divine guidance cards inspired by Lord Murugar to help navigate your path.', image: '/card-1.jpg', slug: 'murugar-cards' },
      { name: 'Tarot Card Reading', type: 'service', desc: 'Comprehensive learning classes to master tarot card reading.', slug: 'tarot-classes' },
      { name: 'Spiritual Counseling', type: 'service', desc: 'Counseling and guidance sessions for mental clarity, peace, and alignment.', slug: 'counseling-classes' },
      { name: 'Kali Pooja', type: 'service', desc: 'Holy Amavasya Kali Poojas to ward off evil, remove blocks, and invite positive energy.', slug: 'kali-pooja' }
    ];

    const currentCategories = await Category.findAll();

    const newCrystalNames = targetCategories.filter(c => c.type === 'crystal').map(c => c.name);
    for (const cur of currentCategories) {
      if (cur.type === 'crystal' && !newCrystalNames.includes(cur.name)) {
        await cur.destroy();
        console.log(`Removed obsolete crystal category: ${cur.name}`);
      }
    }

    for (const target of targetCategories) {
      const match = currentCategories.find(c => c.name.toLowerCase() === target.name.toLowerCase());
      if (!match) {
        await Category.create(target);
        console.log(`Created category: ${target.name}`);
      } else {
        let changed = false;
        if (match.type !== target.type) { match.type = target.type; changed = true; }
        if (match.slug !== target.slug) { match.slug = target.slug; changed = true; }
        if (match.desc !== target.desc) { match.desc = target.desc; changed = true; }
        if (changed) {
          await match.save();
          console.log(`Updated configuration for category: ${target.name}`);
        }
      }
    }

    const Product = require('./models/Product');
    const migrationPairs = [
      { from: 'Rashi', to: 'Rasi' },
      { from: 'Dhanyog', to: 'Pyrite' },
      { from: 'Karungali', to: 'Bracelet' },
      { from: 'Rudraksh', to: 'Crystal mala' },
      { from: 'Yantra', to: 'Pyrite frames' },
      { from: 'Anklets', to: 'Bracelet' }
    ];
    
    for (const pair of migrationPairs) {
      const count = await Product.count({ where: { category: pair.from } });
      if (count > 0) {
        await Product.update({ category: pair.to }, { where: { category: pair.from } });
        console.log(`Migrated ${count} products from "${pair.from}" to "${pair.to}"`);
      }
    }

    console.log('Categories synced and migrated successfully.');
  } catch (err) {
    console.error('Failed to sync categories:', err);
  }
};

// --- START SERVER ---
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Auto-create local database if it doesn't exist
  const dbUser = process.env.DB_USER || 'root';
  const isProduction = process.env.NODE_ENV === 'production' || 
                       (dbUser && dbUser.startsWith('amigoweb_'));
  
  if (!isProduction) {
    try {
      const mysql = require('mysql2/promise');
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        user: dbUser,
        password: process.env.DB_PASSWORD || ''
      });
      const resolvedDbName = process.env.DB_NAME || 'sara-tarot-DB';
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${resolvedDbName}\`;`);
      try {
        await connection.query(`SET GLOBAL max_allowed_packet = 67108864;`);
        console.log('MySQL max_allowed_packet increased to 64MB globally.');
      } catch (packetErr) {
        console.warn('Could not set global max_allowed_packet:', packetErr.message);
      }
      await connection.end();
      console.log(`Local database "${resolvedDbName}" ensured.`);
    } catch (err) {
      console.warn('Could not auto-create local database:', err.message);
    }
  }
  
  sequelize.authenticate()
    .then(() => {
      console.log('Database connected successfully.');
      return sequelize.sync({ alter: true });
    })
    .then(async () => {
      console.log('Database tables synchronized.');
      await seedAdminUser();
      await seedCategories();
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
});