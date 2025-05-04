import Sequelize from "sequelize";
import User from "./app/models/User";
import dbConfig from "./database/config/config.js";
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];


const models = [User];

class Database{
    constructor() {
        this.init();
    }

    init(){
        this.connection = new Sequelize(config);
        models.map(model => model.init(this.connection));
    }
}

export default new Database();