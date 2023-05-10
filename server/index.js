const express = require('express');
require('dotenv').config()
const sequelize = require('./db');
const models = require('./models/models')
const PORT = process.env.PORT || 4900;
const app = express();
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const cron = require("node-cron");
const lotRouter = require('./controllers/lotController');


app.use(cors())
app.use(express.json())
app.get('/health', (req, res) => {
    res.status(200).json({message: "OK"})
})
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        await cron.schedule('*/1 * * * *', function () {
            lotRouter.checkForLots();
        })
        app.listen(PORT, () => console.log('Server started successfully on port: ' + PORT));
    } catch (e){
        console.log(e);
    }
}

start();

