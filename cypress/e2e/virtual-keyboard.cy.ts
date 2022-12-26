describe('Virtual Keyboard', () => {
    beforeEach(() => {
        cy.visitStorybook();
        cy.viewport('iphone-8');
        cy.loadStory('VirtualKeyboard', 'Empty');
    });

    it('should open in a blank state', () => {
        cy.get('.row').should('have.length', 3);
    });

    it('should highlight all letter states for a single match', () => {
        cy.changeArg('answer', 'hello');
        cy.changeArg('guessText', 'world');

        cy.get('[cy-letter="W"].key.used.miss').should('exist');
        cy.get('[cy-letter="O"].key.used.partial').should('exist');
        cy.get('[cy-letter="R"].key.used.miss').should('exist');
        cy.get('[cy-letter="L"].key.used.exact').should('exist');
        cy.get('[cy-letter="D"].key.used.miss').should('exist');

        // Include the DELETE and ENTER keys
        cy.get('.key:not(.used)').should('have.length', 23);
    });

    it('should handle match for multiple guesses', () => {
        cy.changeArg('answer', 'hello');
        cy.changeArg('guessText', 'world,roast,hello');

        cy.get('.key.used.exact').should('have.length', 4);
        cy.get('.key.used.miss').should('have.length', 6);

        cy.get('.key:not(.used)').should('have.length', 18);
    });

    it('should emit keypress', () => {

        const pressKey = (letter: string) => cy.get(`[cy-letter="${letter}"`).click();

        pressKey('H');
        pressKey('E');
        pressKey('L');
        pressKey('L');
        pressKey('O');
        pressKey('ENTER');
        pressKey('DELETE');

        cy.storyAction('key').should('have.callCount', 7);

        cy.storyAction('key').should('be.calledWith', 'H');
        cy.storyAction('key').should('be.calledWith', 'E');
        cy.storyAction('key').should('be.calledWith', 'L');
        cy.storyAction('key').should('be.calledWith', 'O');

        cy.storyAction('key').should('be.calledWith', 'ENTER');
        cy.storyAction('key').should('be.calledWith', 'DELETE');

        cy.storyAction('key').should('not.be.calledWith', 'K');
    });
});