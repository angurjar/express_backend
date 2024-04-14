
const { Sequelize } = require('sequelize');


// Sequelize connection
 const sequelize = new Sequelize({host: 'localhost',
 port: 5433,
 username: 'postgres',
 password: 'Annu@1998',
 database: 'library_management_system',
 dialect:'postgres'});


sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // sequelize.query('Select my_func($id)', {
  //   bind: {
  //     id: 123
  //   }
  // })

  module.exports =  sequelize

