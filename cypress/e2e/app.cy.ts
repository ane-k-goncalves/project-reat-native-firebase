describe('template spec', () => {


  
  it('Deve exibir erro ao tentar logar com credenciais inválidas', () => {
    cy.get('input[placeholder="email"]').type('invalid@example.com');
    cy.get('input[placeholder="password"]').type('senhaerrada');
    
  });
  it('acessar login', () => {
    cy.visit("http://localhost:8081")
  
  })
  it('Deve impedir login se o email ou senha estiverem vazios', () => {
    cy.visit("http://localhost:8081");
    
    
    cy.get('input[placeholder="email"]').clear();
    cy.get('input[placeholder="password"]').clear();
    
    cy.contains('Login').click();
    
   
    cy.on('window:alert', (str) => {
      expect(str).to.include('Por favor, preencha ambos os campos.');
    });
    
    cy.url().should('include', 'http://localhost:8081');
  });
})
