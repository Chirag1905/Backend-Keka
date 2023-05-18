'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Times}) {
      // define association here
      this.hasMany(Times,{foreignKey:"attendance_id"})  
    }
  }
  Attendance.init({
    uuid: {type: DataTypes.STRING, defaultValue:DataTypes.UUIDV4, allowNull:false},
    date: DataTypes.STRING,
    user_uuid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};