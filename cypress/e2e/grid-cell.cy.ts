describe('GridCell', () => {
    beforeEach(() => {
        cy.visitStorybook();
        cy.loadStory('GridCell', 'Empty');
        cy.viewport('iphone-8');
    });

    it('should be blank', () => {
        cy.get('[cy-letter]').should('exist')
            .and('have.attr', 'cy-letter', '')
            .and('not.have.class', 'used');
    });

    describe('pending', () => {
        it('should have a letter', () => {
            cy.changeArg('letter', 'B');
            cy.changeArg('match', null);

            cy.get('[cy-letter]').should('exist')
                .and('have.attr', 'cy-letter', 'B')
                .and('not.have.class', 'used');
        });
    });

    describe('commited', () => {

        afterEach(() => {
            cy.get('[cy-letter]').should('have.class', 'used');
        });

        it('should have no match', () => {
            cy.changeArg('letter', 'C');
            cy.changeArg('match', 'miss');

            cy.get('[cy-letter]').should('have.attr', 'cy-letter', 'C')
                .and('have.class', 'miss');
        });

        it('should have a partial match', () => {
            cy.changeArg('letter', 'D');
            cy.changeArg('match', 'partial');

            cy.get('[cy-letter]').should('have.attr', 'cy-letter', 'D')
                .and('have.class', 'partial');
        });

        it('should have an exact match', () => {
            cy.changeArg('letter', 'E');
            cy.changeArg('match', 'exact');

            cy.get('[cy-letter]').should('have.attr', 'cy-letter', 'E')
                .and('have.class', 'exact');
        });
    });
})