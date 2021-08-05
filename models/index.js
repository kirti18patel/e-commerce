// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

Product.belongsToMany( Tag, {
  through: "product_tag",
  as: "tags",
  foreignKey: 'product_id'
});

Tag.belongsToMany( Product, {
  through: "product_tag",
  as: "products",
  foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
