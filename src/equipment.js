//Import the necessary components from the Sequelize library
const { DataTypes, Model } = require('sequelize');

/*Define the Equipment class, which extends Sequelize's Model class
this class represents the Equipment model in the database*/
class Equipment extends Model { }

/*Function to initialize the ORM for the Equipment model
this function associates the model with a specific Sequelize instance*/
function ORMInit(sequelize) {
    try {
        //Initialize the Equipment model
        Equipment.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                partCode: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                inStock: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },
                lastServiced: {
                    type: DataTypes.DATE,
                    allowNull: true,
                }
            },
            {
                sequelize, //Associate the model with the Sequelize instance
                modelName: 'Equipment'
            }
        );

        console.log('Models registered in ORMInit: ', sequelize.models);

    } catch (error) {
        console.error('Error in ORMInit during model initialization:', error);
    }
}

module.exports = { ORMInit };
