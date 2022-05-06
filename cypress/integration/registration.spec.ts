import {GoRestConfig} from "../../src/app/shared/goRestConfig";

describe('Registration', () => {

  it('Creates the user with the proper parameters via the API', () => {
    cy.createUser('Tony', 'tony@email.com', 'female');

    cy.wait('@lastCreatedUser').its('request.body').should('deep.include', {
      "name": "Tony",
      "email": "tony@email.com",
      "gender": "female",
      "status": "active"
    });

    // @ts-ignore
    cy.get('@lastCreatedUser').then(({request: request}) => {
      expect(request.headers['authorization']).to.eq(`Bearer ${new GoRestConfig().API_TOKEN}`)
    })

  });
});
