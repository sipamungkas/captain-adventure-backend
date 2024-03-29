const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      avatar: DataTypes.STRING,
      reset_token: DataTypes.STRING,
      reset_expired: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    },
  );
  return User;
};
