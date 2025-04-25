/// <reference types="cypress"/>

const perfil = require ('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit ('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('giovanna2001.teste@gmail.com')
        cy.get('#password').type ('123456')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, giovanna2001.teste (não é giovanna2001.teste?')
    
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('giovanna.teste@gmail.com')
        cy.get('#password').type ('123456')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error > li').should('contain' , 'Endereço de e-mail desconhecido.' )
        cy.get('.woocommerce-error > li').should('exist')

    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('giovanna2001.teste@gmail.com')
        cy.get('#password').type ('123457')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error > li').should('contain' , 'Erro: A senha fornecida para o e-mail giovanna2001.teste@gmail.com está incorreta. Perdeu a senha?' )
        cy.get('.woocommerce-error > li').should('exist')
    });
    
       it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type (perfil.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, giovanna2001.teste (não é giovanna2001.teste?')
    
        it('Deve fazer login com sucesso - Usando Fixture', () => {
        cy.fixture('perfil').then( dados => {
        cy.get('#username').type(dados.usuario)
        cy.get('#password').type (dados.senha ,{log: false})
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, giovanna2001.teste (não é giovanna2001.teste?')

           })
        
       });
       it.only('Deve fazer login com sucesso - usando comandos customizado', () => {
        cy.login('giovanna2001.teste@gmail.com' , '123456')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, giovanna2001.teste (não é giovanna2001.teste?')
    
        
       });


    })});
