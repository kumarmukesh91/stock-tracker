describe('Stock Subscription App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4173')
  })

  it('loads the app and displays the form', () => {
    // Check that the app title is present
    cy.contains('h1', 'Stock Watch List').should('be.visible')

    // Check that the input field and submit button are present
    cy.get('input#isin').should('exist')
    cy.get('button').contains('Subscribe').should('exist')
  })

  it('allows the user to subscribe to a valid ISIN', () => {
    const validIsin = 'US0378331005'
    cy.get('input#isin').type(validIsin)
    cy.get('button').contains('Subscribe').click()

    // Ensure the stock appears in the list
    cy.contains(validIsin).should('be.visible')
  })

  it('prevents the user from subscribing to an invalid ISIN', () => {
    // Input an invalid ISIN
    const invalidIsin = 'INVALID_ISIN'
    cy.get('input#isin').type(invalidIsin)
    cy.get('button').contains('Subscribe').click()

    // Ensure an error message is displayed
    cy.contains('Invalid ISIN').should('be.visible')
  })

  it('prevents subscribing to the same ISIN multiple times', () => {
    // Input a valid ISIN and subscribe
    const validIsin = 'US0378331005'
    cy.get('input#isin').type(validIsin)
    cy.get('button').contains('Subscribe').click()

    // Try subscribing to the same ISIN again
    cy.get('input#isin').type(validIsin)
    cy.get('button').contains('Subscribe').click()

    // Ensure an alert or a message is displayed
    cy.contains('Stock is already subscribed').should('be.visible')

    // Ensure the stock appears only once in the list
    cy.get('div.stock-list-item').contains(validIsin).should('have.length', 1)
  })

  it('allows the user to unsubscribe from a stock', () => {
    // Input a valid ISIN and subscribe
    const validIsin = 'US0378331005'
    cy.get('input#isin').type(validIsin)
    cy.get('button').contains('Subscribe').click()

    // Ensure the stock appears in the list
    cy.contains(validIsin).should('be.visible')

    // Click the Unsubscribe button
    cy.get('button[aria-label="unsubscribe"]').click()

    // Ensure the stock is removed from the list
    cy.contains(validIsin).should('not.exist')
  })
})
