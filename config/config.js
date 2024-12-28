module.exports = {
  HOST: process.env.NODE_ENV == 'production' ? '127.0.0.1' : '127.0.0.1',
  PORT: process.env.NODE_ENV == 'production' ? 80 : 4000,

  DB_NAME: process.env.NODE_ENV == 'production' ? 'postgres' : 'postgres',
  DB_HOST: process.env.NODE_ENV == 'production' ? '172.17.0.2' : '0.0.0.0',
  DB_PORT: process.env.NODE_ENV == 'production' ? 5432 : 5432,
  DB_USER: process.env.NODE_ENV == 'production' ? 'postgres' : 'postgres',
  DB_PASSWORD: process.env.NODE_ENV == 'production' ? 'postgres' : 'postgres',
  DB_MAX_CONNECTIONS: process.env.NODE_ENV == 'production' ? 100 : 20

}