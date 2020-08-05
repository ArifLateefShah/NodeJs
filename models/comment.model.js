// comments table definition
// sequelize is the db connection instance
module.exports = (sequelize,Sequelize) => {
    const Comment = sequelize.define('comments',{
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
        },
        status : {
            type: Sequelize.STRING
        },
        repliesCount: {
            type: Sequelize.INTEGER
        }
    })
    return Comment
}