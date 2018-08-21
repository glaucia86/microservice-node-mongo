/**
 * File: repository.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por fazer a abstração da base de dados.
 * Date: 20/08/2018
 */

'use strict'
// Função responsável por abrir a conexão de dados:
const repository = (db) => {
  const collection = db.collection('movies')

  // Método (GET): método responsável por retornar todos os filmes:
  const getAllMovies = () => {
    return new Promise((resolve, reject) => {
      const movies = []
      const cursor = collection.find({}, { title: 1, id: 1 })
      const addMovie = (movie) => {
        movies.push(movie)
      }
      const sendMovies = (error) => {
        if (error) {
          reject(new Error('Ocorreu um erro ao tentar listar todos os filmes...: ' + error))
        }
        resolve(movies.slice())
      }
      cursor.forEach(addMovie, sendMovies)
    })
  }

  // Método (GET): método responsável por retornar todos os filmes de lançamentos:
  const getMoviePremiers = () => {
    return new Promise((resolve, reject) => {
      const movies = []
      const currentDay = new Date()
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        releaseDay: {
          $lte: currentDay.getDate()
        }
      }

      const cursor = collection.find(query)
      const addMovie = (movie) => {
        movies.push(movie)
      }

      const sendMovies = (error) => {
        if (error) {
          reject(new Error('Ocorreu um erro ao tentar listar todos os filme de lançamentos...: ' + error))
        }

        resolve(movies)
      }

      cursor.forEach(addMovie, sendMovies)
    })
  }

  // Método (GET): método responsável por retornar um determinado filme pelo Id:
  const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      const sendMovie = (error, movie) => {
        if (error) {
          reject(new Error(`Ocorreu um erro ao tentar retornar o filme de Id...: ${id}, error...: ${error}`))
        }

        resolve(movie)
      }

      collection.findOne({ id: id }, projection, sendMovie)
    })
  }

  // Aqui iremos fechar a conexão com a Base de Dados:
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllMovies,
    getMoviePremiers,
    getMovieById,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('Não conseguimos realizar a conexão com a base de dados!'))
    }

    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, { connect })
