describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visitStorybook()
    cy.loadStory('Example/Button', 'Large');
  })
})
