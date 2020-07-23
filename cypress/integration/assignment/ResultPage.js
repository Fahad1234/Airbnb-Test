const MENU_BUTTON = '[data-testid=menuItemButton-dynamicMoreFilters]'
const BEDROOMS = '#filterItem-stepper-min_bedrooms-0'
const SHOW_STAY = '[data-testid="more-filters-modal-submit-button"]'
const verfy_bedroom = 'div[itemprop="itemListElement"]'
const Property = 'div[itemprop="itemListElement"]'
const MapValue = 'button[data-veloute] div div'
const background_color = 'background-color rgb(34,34,34)'


class ResultPage{
    static addBedroom(){
        cy.wait(3000)
        cy.get(MENU_BUTTON).should('be.visible')
        cy.get(MENU_BUTTON).click()
        cy.get(BEDROOMS)
            .children().last().should('be.visible')
        cy.get(BEDROOMS).children().last().dblclick()
        cy.get(BEDROOMS).children().last().dblclick()
        cy.get(BEDROOMS).children().last().click()
        cy.get(SHOW_STAY).click()
        
    }
    static verifyBedroom(){
        cy.wait(3000)
        cy.get(verfy_bedroom).first().find('div').contains('bedrooms').then(($bedroom)=> {
            
            var bed = $bedroom.text()
            console.log(bed)
            var beds = parseInt(bed.split("·")[1])
            expect(beds).to.be.at.least(5)
        })
    }
    static hoverAndColorChange(){
        cy.get(Property).first().trigger('mouseover')
        cy.get(MapValue).first().should('have.css', background_color)
    }
}
export default ResultPage