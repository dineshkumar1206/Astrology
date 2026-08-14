const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'Blessed & Energized'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  },
  imageMime: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inclusions: {
    type: DataTypes.TEXT, // Will store stringified JSON array
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('inclusions');
      try {
        return rawValue ? JSON.parse(rawValue) : [];
      } catch (err) {
        return [];
      }
    },
    set(value) {
      this.setDataValue('inclusions', JSON.stringify(value || []));
    }
  },
  sizes: {
    type: DataTypes.TEXT, // Will store stringified JSON array
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('sizes');
      try {
        return rawValue ? JSON.parse(rawValue) : [];
      } catch (err) {
        return [];
      }
    },
    set(value) {
      this.setDataValue('sizes', JSON.stringify(value || []));
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  tableName: 'products'
});

module.exports = Product;
