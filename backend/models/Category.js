const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  type: {
    type: DataTypes.STRING, // 'crystal' or 'service'
    allowNull: false,
    defaultValue: 'service'
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
  slug: {
    type: DataTypes.STRING,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Category;
