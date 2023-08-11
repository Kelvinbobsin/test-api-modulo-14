/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {
         cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
     });

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar os usuários cadastrados', () => {
          cy.request({
              method: 'GET',
              url: 'usuarios'
          }).then((response) => {
              expect(response.body.usuarios[1].nome).to.equal('samara silva')
              expect(response.status).to.equal(200)
          })
      });

      it('Deve cadastrar usuário com sucesso', () => {

          cy.cadastrarUsuarios(token, "Usuário Ebac", "kelvin_bobsin@gmail.com", "teste123", "true")
              .then((response) => {
              expect(response.status).to.equal(201)
              expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
      });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuarios(token, "Usuário Ebac", "kelvin.homail", "teste123", "true")
          .then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.email).to.equal('email deve ser um email válido')
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.cadastrarUsuarios(token, "kelvin silva", "kelvinsilva@hotmail.com", "teste123", "true")
          .then(response => {
               let id = response.body._id
   
               cy.request({
                   method: 'PUT', 
                   url: `usuarios/${id}`,
                   headers: {authorization: token}, 
                   body: 
                   {
                       "nome": "kelvin silveira",
                       "email": "kel.bobsin@gmail.com",
                       "password": "teste123",
                       "administrador": "true"
                     }
               }).then(response => {
                   expect(response.body.message).to.equal('Registro alterado com sucesso')
               })
           })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.cadastrarUsuarios(token, "antonio alves", "alves@gmail.com", "teste123", "true")
          .then(response => {
              let id = response.body._id
              cy.request({
                  method: 'DELETE',
                  url: `usuarios/${id}`,
                  headers: {authorization: token}
              }).then(response =>{
                  expect(response.body.message).to.equal('Registro excluído com sucesso')
                  expect(response.status).to.equal(200)
              })
          })
     });


});