import HomePage from './HomePage'
describe('Results match search criteria', ()=>{
    before(()=>{
        HomePage.visit()
    })
    it('Criteria and verification for Search', () => {
        HomePage.search()
        HomePage.verify()
       

    })
    it('Apply extra filters ',()=> {
        cy.wait(3000)
        cy.get('[data-testid=menuItemButton-dynamicMoreFilters]').should('be.visible')
        cy.get('[data-testid=menuItemButton-dynamicMoreFilters]').click()
        cy.get('#filterItem-stepper-min_bedrooms-0')
            .children().last().should('be.visible')
        cy.get('#filterItem-stepper-min_bedrooms-0').children().last().dblclick()
        cy.get('#filterItem-stepper-min_bedrooms-0').children().last().dblclick()
        cy.get('#filterItem-stepper-min_bedrooms-0').children().last().click()
        cy.get('[data-testid="more-filters-modal-submit-button"]').click()
        cy.wait(3000)
        cy.get('div[itemprop="itemListElement"]').first().find('div').contains('bedrooms').then(($bedroom)=> {
            
            var bed = $bedroom.text()
            console.log(bed)
            var beds = parseInt(bed.split("·")[1])
            expect(beds).to.be.at.least(5)
        })
    })
    it('Color Change test', ()=> {
        
        cy.get('div[itemprop="itemListElement"]').first().trigger('mouseover')
        cy.get('button[data-veloute] div div').first().should('be.visible')
        
        //cy.get('[data-veloute="map/markers/BasePillMarker"]').should('be.visible')
        //cy.get('[data-veloute="map/markers/BasePillMarker"]').first().click()
    })

})