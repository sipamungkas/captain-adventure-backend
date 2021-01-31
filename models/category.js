const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Packet, {as: 'packets'});
    }
  }
  Category.init(
    {
      image: DataTypes.STRING,
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Category',
      underscored: true,
    },
  );
  return Category;
};
