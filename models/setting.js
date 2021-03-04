const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Setting.init(
    {
      key: {primaryKey: true, type: DataTypes.STRING, allowNull: false},
      value: {type: DataTypes.TEXT, allowNull: false},
      group: {type: DataTypes.STRING, allowNull: false},
    },
    {
      sequelize,
      modelName: 'Setting',
      underscored: true,
    },
  );
  return Setting;
};
