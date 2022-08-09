/**
 * File: config.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável para fazer uma configuração mais simples para realizar a conexão com
 * Mongodb com o Node.js
 * Date: 20/08/2018
 */

const dbSettings = {
  db: process.env.DB || 'movies',
  user: process.env.DB_USER || 'glaucia',
  pass: process.env.DB_PASS || 'teste123456',
  repl: process.env.DB_REPLS || 'rs1',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    '127.0.0.1:27017',
    '127.0.0.2:27017',
    '127.0.0.3:27017'
  ],
  dbParameters: () => ({
    w: 'majority',
    wtimeout: 10000,
    j: true,
    readPreference: 'ReadPreference.SECONDARY_PREFERRED',
    native_parser: false
  }),
  serverParameters: () => ({
    autoReconnect: true,
    poolSize: 10,
    socketoptions: {
      keepAlive: 300,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000
    }
  }),
  replsetParameters: (replset = 'rs1') => ({
    replicaSet: replset,
    ha: true,
    haInterval: 10000,
    poolSize: 10,
    socketoptions: {
      keepAlive: 300,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000
    }
  })
}

const serverSettings = {
  port: process.env.PORT || 4000
}

module.exports = Object.assign({}, { dbSettings, serverSettings })
