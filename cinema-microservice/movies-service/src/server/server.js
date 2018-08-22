/**
 * File: server.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por levantar a api no Node.js
 * Date: 21/08/2018
 */

'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const movieAPI = require('../api/movies')

const start = (options) => {
  return new Promise((resolve, reject) => {
    // Aqui iremos verificar se estamos o repositório foi adicionando & se uma determinada porta está disponível:
    if (!options.repo) {
      reject(new Error('O servidor deve iniciar com um repositório conectado.'))
    }
    if (!options.port) {
      reject(new Error('O servidor deve iniciar com uma porta que esteja disponível'))
    }

    // Aqui iremos iniciar a aplicação com alguns middlewares:
    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((error, req, res, next) => {
      reject(new Error('Algum problema ocorreu aqui!, error...: ' + error))
      res.status(500).send('Algum problema ocorreu aqui!')
    })

    // Nessa parte do bloco vamos adicionar a nossa API no express:
    movieAPI(app, options)

    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, { start })
