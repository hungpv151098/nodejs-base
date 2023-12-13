const configs = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  port: +process.env.MYSQL_PORT,
  dialect: 'mysql',
  underscored: true,
  dialectOptions: { decimalNumbers: true },
  pool: {
    max: 100,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
  logging: process.env.MYSQL_QUERY_LOG == 'true' ? console.log : false,
};

module.exports = configs;
