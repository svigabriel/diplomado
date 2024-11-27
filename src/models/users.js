import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import { Task } from '../models/tasks.js';
import { Status } from "../constants/index.js";
import logger from "../logs/logger.js";
import { encriptar } from "../common/bycript.js";

export const User = sequelize.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
username:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate:{
       notNull: {
        msg: 'Username cannot be null'
       },
    },
},
password:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
       notNull: {
        msg: 'Password cannot be null'
       },
    },
},
status:{
    type: DataTypes.STRING,
    defaultValue:Status.ACTIVE,
    validate:{
        isIn: {
            args: [[Status.ACTIVE,Status.INACTIVE]],
            msg: "Status must be either 'active' or 'inactive'",
        }
    }
}
});
User.hasMany(Task);
Task.belongsTo(User);


/*version complicada de asociar tablas
User.hasMany(Task, {
   foreignKey: 'user_id',
   sourceKey: 'id',
})
Task.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
})*/

User.beforeCreate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña');
    } 
});

User.beforeUpdate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al comparar la contraseña');
    } 
});
