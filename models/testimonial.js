const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Testimonial.init(
    {
      image: DataTypes.STRING,
      name: DataTypes.STRING,
      position: DataTypes.STRING,
      testimoni: DataTypes.TEXT,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Testimonial',
      underscored: true,
    },
  );
  return Testimonial;
};
