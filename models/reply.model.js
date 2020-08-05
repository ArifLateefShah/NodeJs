// replies table definition
// sequelize is the db connection instance
module.exports = (sequelize,Sequelize) => {
    const Reply = sequelize.define('replies',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        author : {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        }
    })
    return Reply
}