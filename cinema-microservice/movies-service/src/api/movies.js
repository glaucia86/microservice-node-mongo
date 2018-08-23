/**
 * File: movies.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por tratar os endpoints relacionados ao 'movieApi'
 * Date: 21/08/2018
 */

'use strict'

const status = require('http-status')

module.exports = (app, options) => {
  const { repo } = options

  // Método (GET): método responsável por retornar todos os 'filmes':
  app.get('/movies', (req, res, next) => {
    repo.getAllMovies().then(movies => {
      res.status(status.OK).json(movies)
    }).catch(next)
  })

  // Método (GET): método responsável por retornar somente os filmes de lançamento (premiere):
  app.get('/movies/premieres', (req, res, next) => {
    repo.getMoviePremiers().then(movies => {
      res.status(status.OK).json(movies)
    }).catch(next)
  })

  // Método (GET): método responsável por retornar um determinado filme por Id:
  app.get('/movies/:id', (req, res, next) => {
    repo.getMovieById().then(movie => {
      res.status(status.OK).json(movie)
    }).catch(next)
  })
}
