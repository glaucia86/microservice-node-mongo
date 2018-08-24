/**
 * File: mongo.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por realizar a configuração necessária para conectar ao MongoDb para o
 *  Node.js
 * Date: 20/08/2018
 */

const MongoClient = require('mongodb')

const getMongoUrl = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + `${cur.ip}:${cur.port},`, 'mongodb://')

  return `${url.substr(0, url.length - 1)}/${options.db}`
}

// Aqui estaremos criando uma função para poder conectar, abrir e autenticar a conexão com o mongodb:
const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    MongoClient.connect(getMongoUrl(options), {
      db: options.dbParameters(),
      server: options.serverParameters(),
      replset: options.replsetParameters(options.repl)
    }, (error, db) => {
      if (error) {
        mediator.emit('db.error', error)
      }

      db.admin().authenticate(options.user, options.pass, (error, result) => {
        if (error) {
          mediator.emit('db.error', error)
        }
        mediator.emit('db.ready', db)
      })
    })
  })
}

module.exports = Object.assign({}, { connect })
