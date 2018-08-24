/**
 * File: movies.spec.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por tratar os testes relacioandos ao arquivo 'api/movies.js'
 * Date: 23/08/2018
 */

const request = require('supertest')
const server = require('../server/server')

// Aqui vamos criar o nosso 'mock-test' da api 'moviesApi':
describe('Testes: Movie API', () => {
  let app = null

  // Aqui vamos fazer um mock dos filmes
  let testMovies = [{
    'id': '1',
    'title': 'Pé Pequeno',
    'format': 'IMAX',
    'releaseYear': 2018,
    'releaseMonth': 9,
    'releaseDay': 27
  }, {
    'id': '3',
    'title': 'Cinderela e o Príncipe Secreto',
    'format': '3D',
    'releaseYear': 2018,
    'releaseMonth': 10,
    'releaseDay': 11
  }, {
    'id': '2',
    'title': 'Homem-Formiga e a Vespa',
    'format': 'IMAX',
    'releaseYear': 2018,
    'releaseMonth': 7,
    'releaseDay': 24
  }]

  // Aqui vamos fazer o mock dos repositórios:
  let testRepo = {
    // Aqui iremos fazer o mock inerente ao retorno de todos os filmes:
    getAllMovies () {
      return Promise.resolve(testMovies)
    },

    // Aqui iremos fazer o mock inerente ao retorno dos filmes de lançamento, mas pelo ano:
    getMoviePremiers () {
      return Promise.resolve(testMovies.filter(movie => movie.releaseYear === 2018))
    },

    // Aqui iremos fazer o mock inerente ao retorno de um determinado filme por Id:
    getMovieById (id) {
      return Promise.resolve(testMovies.find(movie => movie.id === id))
    }
  }

  // Aqui iremos simular a inicialização da app:
  beforeEach(() => {
    return server.start({
      port: 4000,
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  })

  // Aqui iremos simular o fechamento da app:
  afterEach(() => {
    app.close()
    app = null
  })

  // Agora vamos começar alguns blocos de testes:
  it('Deve retornar todos os filmes', (done) => {
    request(app)
      .get('/movies')
      .expect((res) => {
        res.body.containEql({
          'id': '2',
          'title': 'Homem-Formiga e a Vespa',
          'format': 'IMAX',
          'releaseYear': 2018,
          'releaseMonth': 7,
          'releaseDay': 24
        })
      })
      .expect(200, done)
  })

  it('Deve retornar status 200 se reconhecer um determinado filme', (done) => {
    request(app)
      .get('/movies/2')
      .expect((res) => {
        res.body.containEql({
          'id': '2',
          'title': 'Homem-Formiga e a Vespa',
          'format': 'IMAX',
          'releaseYear': 2018,
          'releaseMonth': 7,
          'releaseDay': 24
        })
          .expect(200, done)
      })
  })
})
