const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// defino el modelo
module.exports = (sequelize)=>{
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.FLOAT
    },
    weight: {
      type: DataTypes.FLOAT
    },
    isCreated :{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    img: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
}