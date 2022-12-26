describe("Game Grid", () => {
    beforeEach(() => {
        cy.visitStorybook();
        cy.viewport('iphone-8');
        cy.loadStory('GameGrid', 'Empty');
    });

    it('should be blank', () => {
        cy.get('[cy-letter]').should('have.length', 30);
        cy.get('.row.current').should('exist');
        cy.get('.row.empty').should('have.length', 5);
    });

    it('should make 1 guess', () => {
        cy.changeArg('answer', 'hello');

        cy.changeArg('currentGuess', 'world');

        cy.get('.row.current').within(() => {
            cy.get('[cy-letter]').eq(0).should('have.attr', 'cy-letter', 'W');
            cy.get('[cy-letter]').eq(1).should('have.attr', 'cy-letter', 'O');
            cy.get('[cy-letter]').eq(2).should('have.attr', 'cy-letter', 'R');
            cy.get('[cy-letter]').eq(3).should('have.attr', 'cy-letter', 'L');
            cy.get('[cy-letter]').eq(4).should('have.attr', 'cy-letter', 'D');
        });

        cy.get('.row.empty').should('have.length', 5);
        cy.get('.row.guess').should('not.exist');
    });

    it('should contain an existing guess', () => {
        cy.changeArg('answer', 'world');
        cy.changeArg('guessText', 'hello');
        cy.changeArg('currentGuess', 'hel');

        cy.get('.row.guess').should('exist');
        cy.get('.row.current').should('exist');
        cy.get('.row.empty').should('have.length', 4);

        cy.get('.row.guess').within(() => {
            cy.get('[cy-letter]').eq(0).should('have.attr', 'cy-letter', 'H');
            cy.get('[cy-letter]').eq(1).should('have.attr', 'cy-letter', 'E');
            cy.get('[cy-letter]').eq(2).should('have.attr', 'cy-letter', 'L');
            cy.get('[cy-letter]').eq(3).should('have.attr', 'cy-letter', 'L');
            cy.get('[cy-letter]').eq(4).should('have.attr', 'cy-letter', 'O');
        });
    });

    it('should have too many guesses', () => {
        cy.changeArg('answer', 'hello');
        cy.changeArg('guessText', 'world,juice,roast,pinch,tones,stone');

        cy.get('.row.empty').should('not.exist');
        cy.get('.row.current').should('not.exist');
        cy.get('.row.guess').should('have.length', 6);
    });

    it('should have a match', () => {
        cy.changeArg('answer', 'hello');
        cy.changeArg('guessText', 'world,hello');

        cy.get('.row.empty').should('have.length', 3);
        cy.get('.row.current').should('exist');
        cy.get('.row.guess').should('have.length', 2);
    });
});