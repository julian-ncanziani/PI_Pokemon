const { DataTypes } = require('sequelize');
const {Pokemon} = require('./Pokemon.js');
const {Type} = require('./Type.js');

module.exports = (sequelize)=>{
    sequelize.define('PokemonType', {
        pokemonId: {
            type: DataTypes.INTEGER,
            references: {
                model: Pokemon,
                key: 'id'
            }
        },
        typeId: {
            type: DataTypes.INTEGER,
            references: {
                model: Type,
                key: 'id'
            }
        }
    },{
        timestamps: false
    });
};