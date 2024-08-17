const { Sequelize } = require('sequelize');
const express = require('express');
const cors = require('cors');

//Import custom modules that define models and routes
const equipment = require('./equipment.js');
const { RegisterRoutes } = require('./routes/equipment.js');

const PORT = 3000;
const app = express();

/*Instance of Sequelize, which will connect to an in-memory SQLite database
'sqlite::memory:' means the database will be stored in memory and reset when the server restarts*/
const sequelizeIns = new Sequelize('sqlite::memory:');

/*Middleware function to attach the Sequelize instance to the request object
this allows you to access `sequelizeIns` within any route handler via `req.sequelize`*/
function appendSequelize(req, res, next) {
    req.sequelize = sequelizeIns; //Attach the Sequelize instance to the request object
    next(); //Continue to the next middleware or route handler
}

app.use(cors());
app.use(appendSequelize);
app.use(express.json());

/*Initialize the ORM for the equipment model
this will define the model and associate it with the Sequelize instance*/
equipment.ORMInit(sequelizeIns);

//Log the Sequelize instance to the console for debugging purposes
console.log('Sequelize models after ORMInit: ', sequelizeIns.models);

/*Synchronize the Sequelize models with the database`sync({ force: true })` 
forces the database to drop existing tables and recreate them based on the current models*/
sequelizeIns.sync({ force: true }).then(() => {
    // Log the registered models after syncing
    console.log('Sequelize models after sync:', sequelizeIns.models);
    RegisterRoutes(app);
    app.listen(PORT, () => {
        console.log('Currently listening on port ' + PORT);
    });
}).catch(err => {
    //Log any errors that occur during the synchronization process
    console.error('Failed to sync database:', err);
});
