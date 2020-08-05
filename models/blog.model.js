// blogs table definition
// sequelize is the db connection instance
module.exports = (sequelize,Sequelize) => {
    const Blog = sequelize.define('blogs',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        title : {
            type:Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        status : {
            type: Sequelize.STRING
        }
    })
    return Blog
}