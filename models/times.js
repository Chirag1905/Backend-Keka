'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Times extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Attendance}) {
      // define association here
      this.belongsTo(Attendance,{foreignKey:"attendance_id"})
    }
  }
  Times.init({
    time: DataTypes.STRING,
    attendance_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Times',
  });
  return Times;
};