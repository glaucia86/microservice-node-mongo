/**
 * File: server.spec.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por realizar testes relacionado ao arquivo '/server/server.js'
 * Date: 21/08/2018
*/

const server = require('./server')

describe('Teste: Server', () => {
  it('Deve requerer a porta do servidor para iniciar a aplicação', () => {
    return server.start({
      repo: {}
    }).should.be.rejectedWith(/port/)
  })

  it('Deve requerer um repositório para iniciar a aplicação', () => {
    return server.start({
      port: {}
    }).should.be.rejectedWith(/repository/)
  })
})
