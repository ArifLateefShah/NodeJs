// roles table definition
// sequelize is the db connection instance
module.exports = (sequelize,Sequelize) => {
    const Role = sequelize.define('roles',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
          },
        name: {
            type: Sequelize.STRING
        }
    })
    return Role
}