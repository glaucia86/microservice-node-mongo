/**
 * File: Index.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por levantar o servidor da aplicação via Node.js
 * Date: 20/08/2018
 */

'use strict'

const { EventEmmitter } = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/config')

const mediator = new EventEmmitter()

console.log('---- Serviços dos Filmes ----')
console.log('Conectando com os repositórios dos filmes....')

process.on('uncaughtException', (error) => {
  console.error('Ocorreu um erro de Exception aqui', error)
})

process.on('uncaughtException', (error, promise) => {
  console.error('Ocorreu um erro de Rejection aqui', error)
})

mediator.on('db.ready', (db) => {
  let rep
  repository.connect(db)
    .then(repo => {
      console.log('Aplicação conectada ao repositório. Iniciando o serviço!')
      rep = repo
      return server.start({
        port: config.serverSettings.port,
        ssl: config.serverSettings.ssl,
        repo
      })
    })
    .then(app => {
      console.log(`Aplicação conectada com sucesso. Executando na porta: ${config.serverSettings.port}.`)
      app.on('close', () => {
        rep.disconnect()
      })
    })
})

mediator.on('db.error', (error) => {
  console.log(error)
})

// Aqui vamos carregar a conexão para o repositório:
config.db.connect(config.serverSettings, mediator)

// E finalmente vamos iniciar a conexão com o repositório:
mediator.emit('boot.ready')
