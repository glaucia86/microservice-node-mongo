/**
 * File: repository.spec.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por realizar os testes inerentes ao arquivo 'repository.js'.
 * Date: 21/08/2018
 */

const should = require('should')
const repository = require('./repository')

describe('Repository', () => {
  it('Deve Retornar uma determinada conexão com uma Promise', (done) => {
    repository.connect({ }).should.be.a.Promise()
    done()
  })
})
