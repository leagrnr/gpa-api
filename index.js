const sequelize = require('./database');

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Error :', error);
    } finally {
        await sequelize.close();
    }
})();
