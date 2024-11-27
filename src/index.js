import app from './app.js'
import sequelize from './database/database.js';
import 'dotenv/config';
import logger  from './logs/logger.js';

async function main() {
    await sequelize.sync({force:false});  //solo en mdo desarrollo
    //await sequelize.sync({force:false}); // Sync database with models
    const port = process.env.PORT
    app.listen(port);
    logger.info(`Server started on port ${port}`);
    
}

main();
