describe('Full Game', () => {
    beforeEach(() => {
        cy.visitStorybook();
        cy.viewport('iphone-8');
        cy.loadStory('FullGame', 'Empty');
    });

    it('should display a new game', () => {
        cy.get('app-grid-cell').should('have.length', 30);
    });

    it('should receive typed and virtual keys', () => {
        cy.get('app-full-game').type('he');

        cy.get('.row.current').within(() => {
            cy.get('[cy-letter]').eq(0).contains('H');
            cy.get('[cy-letter]').eq(1).contains('E');
            cy.get('[cy-letter]').eq(2).should('be.empty');
            cy.get('[cy-letter]').eq(3).should('be.empty');
            cy.get('[cy-letter]').eq(4).should('be.empty');
        });

        cy.get('app-full-game').type('{backspace}');

        cy.get('.row.current').within(() => {
            cy.get('[cy-letter]').eq(0).contains('H');
            cy.get('[cy-letter]').eq(1).should('be.empty');
            cy.get('[cy-letter]').eq(2).should('be.empty');
            cy.get('[cy-letter]').eq(3).should('be.empty');
            cy.get('[cy-letter]').eq(4).should('be.empty');
        });

        cy.get('.key[cy-letter="E"').should('exist').click();
        cy.get('.key[cy-letter="L"').should('exist').click();
        cy.get('.key[cy-letter="L"').should('exist').click();
        cy.get('.key[cy-letter="O"').should('exist').click();

        cy.get('.row.current').within(() => {
            cy.get('[cy-letter]').eq(0).contains('H');
            cy.get('[cy-letter]').eq(1).contains('E');
            cy.get('[cy-letter]').eq(2).contains('L');
            cy.get('[cy-letter]').eq(3).contains('L');
            cy.get('[cy-letter]').eq(4).contains('O');
        });

        cy.get('.key.special[cy-letter="DELETE"]').click();
        cy.get('.key.special[cy-letter="DELETE"]').click();

        cy.get('.row.current').within(() => {
            cy.get('[cy-letter]').eq(0).contains('H');
            cy.get('[cy-letter]').eq(1).contains('E');
            cy.get('[cy-letter]').eq(2).contains('L');
            cy.get('[cy-letter]').eq(3).should('be.empty');
            cy.get('[cy-letter]').eq(4).should('be.empty');
        });
    });

    it('should accept an invalid answer', () => {
        cy.changeArg('answer', 'world');

        cy.get('app-full-game').type('hello{enter}mound');

        cy.get('.row.empty').should('have.length', 4);
        cy.get('.row.guess').should('exist');
        cy.get('.row.current').should('exist');

        cy.get('.row.guess').within(() => {
            cy.get('[cy-letter]').eq(0).contains('H');
            cy.get('[cy-letter]').eq(1).contains('E');
            cy.get('[cy-letter]').eq(2).contains('L');
            cy.get('[cy-letter]').eq(3).contains('L');
            cy.get('[cy-letter]').eq(4).contains('O');
        });
    });

    it('should accept the right answer', () => {
        cy.changeArg('answer', 'world');
        cy.get('app-full-game').type('hello{enter}world{enter}');

        cy.get('.row.empty').should('have.length', 3);
        cy.get('.row.guess').should('have.length', 2);
        cy.get('.row.current').should('exist');

        cy.get('.row.guess').last().within(() => {
            cy.get('.used.exact[cy-letter]').eq(0).contains('W');
            cy.get('.used.exact[cy-letter]').eq(1).contains('O');
            cy.get('.used.exact[cy-letter]').eq(2).contains('R');
            cy.get('.used.exact[cy-letter]').eq(3).contains('L');
            cy.get('.used.exact[cy-letter]').eq(4).contains('D');
        });
    });

    it('should not accept input after completion', () => {
        cy.changeArg('answer', 'world');
        cy.get('app-full-game').type('hello{enter}world{enter}mound');

        cy.get('.row.empty').should('have.length', 3);
        cy.get('.row.guess').should('have.length', 2);
        cy.get('.row.current').should('exist');

        cy.get('.row.current').last().within(() => {
            cy.get('[cy-letter]').eq(0).should('be.empty');
            cy.get('[cy-letter]').eq(1).should('be.empty');
            cy.get('[cy-letter]').eq(2).should('be.empty');
            cy.get('[cy-letter]').eq(3).should('be.empty');
            cy.get('[cy-letter]').eq(4).should('be.empty');
        });
    });
});