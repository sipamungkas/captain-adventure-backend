const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Program.init(
    {
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      perks: DataTypes.STRING,
      short_description: DataTypes.STRING,
      body: DataTypes.TEXT,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Program',
      underscored: true,
    },
  );
  return Program;
};
