module.exports = {
    development: {
        dialect: "postgres",
        host: "localhost",
        username: "postgres",
        password: "55746",
        database: "tasklist",
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        }
    }
}
