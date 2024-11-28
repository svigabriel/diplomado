import {Sequelize} from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize(
    process.env.DB_DATABASE, //dbname
    process.env.DB_USER, //username
    process.env.DB_PASSWORD, //password
    {
        host: process.env.DB_HOST, 
        dialect: process.env.DB_DIALECT,
        logging: console.log,

        //habilitar en modo productivo y comentar en modo local
        dialectOptions:{
            ssl:{
                require: true,
                rejectUnauthorized: false
            }
        }
});

export default sequelize;