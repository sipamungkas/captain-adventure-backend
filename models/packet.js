const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Packet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Packet.belongsTo(models.Category, {as: 'category'});
    }
  }
  Packet.init(
    {
      cover: DataTypes.STRING,
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      perks: DataTypes.STRING,
      short_description: DataTypes.STRING,
      start_at: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      is_active: DataTypes.BOOLEAN,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Packet',
      underscored: true,
    },
  );
  return Packet;
};
