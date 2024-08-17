//Asynchronous function to handle the creation of new equipment records
async function newEquipment(req, res) {
    try {
        console.log("Hit new equipment");

        //Extract the Sequelize instance from the request object
        const sequelize = req.sequelize;

        //Extract data from request body
        const { name, partCode, price, inStock, lastServiced } = req.body;

        /*Create a new equipment record in the database
        the create() method returns a promise, so we use await to wait for its completion*/
        const equip = await sequelize.models.Equipment.create(
            {
                name: name || 'Unknown',
                partCode: partCode || 'N/A',
                price: price !== undefined ? price : null,
                inStock: inStock !== undefined ? inStock : true,
                lastServiced: lastServiced || null,
            }, { fields: ['name', 'partCode', 'price', 'inStock', 'lastServiced'] }
        );

        // Send the created equipment as the response in JSON format
        res.send(equip);
    } catch (error) {
        console.error("Error creating equipment:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Function to handle retrieving a specific equipment record
async function getEquipment(req, res) {
    try {
        const sequelize = req.sequelize;
        const id = req.params.equipmentid;
        const equip = await sequelize.models.Equipment.findByPk(id);

        if (!equip) {
            res.status(404).send("Equipment not found");
        } else {
            res.send(equip);
        }
    } catch (error) {
        console.error("Error retrieving equipment:", error);
        res.status(500).send("Internal Server Error");
    }
}

//Asynchronous function to handle retrieving all equipment records from the database
async function getAllEquipment(req, res) {
    try {
        const sequelize = req.sequelize;
        const allEquip = await sequelize.models.Equipment.findAll();
        res.send(allEquip);
    } catch (error) {
        console.error("Error retrieving equipment:", error);
        res.status(500).send("Internal Server Error");
    }
}

//Function to handle updating an existing equipment record by ID
async function updateEquipment(req, res) {
    try {
        const sequelize = req.sequelize;
        const id = req.params.equipmentid;

        //Find the existing equipment record
        const equip = await sequelize.models.Equipment.findByPk(id);

        if (!equip) {
            res.status(404).send("Equipment not found");
        } else {
            //Update the equipment record with the new data from the request body
            await equip.update(req.body);
            res.send(equip);
        }
    } catch (error) {
        console.error("Error updating equipment:", error);
        res.status(500).send("Internal Server Error");
    }
}

//Function to handle deleting an existing equipment record by ID
async function deleteEquipment(req, res) {
    try {
        const sequelize = req.sequelize;
        const id = req.params.equipmentid;

        //Find the existing equipment record
        const equip = await sequelize.models.Equipment.findByPk(id);

        if (!equip) {
            res.status(404).send("Equipment not found");
        } else {
            //Delete the equipment record
            await equip.destroy();
            res.send({ message: "Equipment deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting equipment:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Function to register all routes related to the Equipment model
function RegisterRoutes(app) {
    app.get('/equipment', getAllEquipment);
    app.get('/equipment/:equipmentid', getEquipment);
    app.post('/equipment', newEquipment);
    app.put('/equipment/:equipmentid', updateEquipment);
    app.delete('/equipment/:equipmentid', deleteEquipment);
}

module.exports = { RegisterRoutes };
