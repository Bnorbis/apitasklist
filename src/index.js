// src/index.js
import Sequelize from 'sequelize';
import User from './app/models/User';
import Task from './app/models/Task';
import dbConfig from './database/config/config.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const models = [User, Task];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(config);

        this.models = models.reduce((acc, model) => {
            const initializedModel = model.init(this.connection);
            acc[initializedModel.name] = initializedModel;
            return acc;
        }, {});

        Object.values(this.models)
            .filter(model => typeof model.associate === 'function')
            .forEach(model => model.associate(this.models));
    }
}

export default new Database();
