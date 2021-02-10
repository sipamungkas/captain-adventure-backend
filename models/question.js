const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      body: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Question',
      underscored: true,
    },
  );
  return Question;
};
