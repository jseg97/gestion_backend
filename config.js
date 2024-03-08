module.exports = {
  HOST: process.env.NODE_ENV == 'production' ? '127.0.0.1' : '127.0.0.1',
  PORT: process.env.NODE_ENV == 'production' ? 80 : 4001
}