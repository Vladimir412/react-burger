import React from 'react'
import BurgerConstructor from './BurgerConstructor'

describe('<BurgerConstructor />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    {/* @ts-ignore */}
    cy.mount(<BurgerConstructor />)
  })
})