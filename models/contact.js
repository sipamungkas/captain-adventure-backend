const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init(
    {
      value: {type: DataTypes.TEXT},
      link: {type: DataTypes.STRING},
      category: {type: DataTypes.STRING},
    },
    {
      sequelize,
      modelName: 'Contact',
      underscored: true,
    },
  );
  return Contact;
};
