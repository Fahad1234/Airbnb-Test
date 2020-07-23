const URL = 'https://www.airbnb.com'
const SEARCH_INPUT = '[data-testid="structured-search-input-field-query"]'
const SEARCH_SELECTION = 'div'
const GUEST = '[data-testid="structured-search-input-field-guests-button"]'
const ADULT = '#stepper-adults'
const CHILD = '#stepper-children'
const verify = '[data-testid="little-search"]'
const city_selector = '[data-index="0"]'
const guest_selector = '[data-index="2"]'
const verify_guests = 'div[itemprop="itemListElement"]'
const city = 'Rome'
const guest = '3 guests'

const SEARCH_BTN = 'span'
var check_in = new Date();
var numberOfDaysToAdd = 7;
check_in.setDate(check_in.getDate() + numberOfDaysToAdd); 
var check_out = new Date();
var numberOfDaysToAdd = 14;
check_out.setDate(check_out.getDate() + numberOfDaysToAdd);

var dd = check_in.getDate();
var mm = check_in.getMonth() + 1;
var y = check_in.getFullYear(); 

var dd_n = check_out.getDate()
var mm_n = check_out.getMonth() + 1

function date_formatter(day,month,year) {
    return '' + year + '-' + (month<=9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day);
}

class InitialPage{
    static visit(){
        cy.visit(URL)
    }
    static search(){
        cy.fixture('initials').then(data =>{
            var city = data.city
            var selection = data.selection
            cy.get(SEARCH_INPUT).should('be.visible').click({froce:true})
            cy.get(SEARCH_INPUT).type(city)
            cy.get(SEARCH_SELECTION).contains("Rome, Metropolitan City of Rome").should('be.visible')
            .click({force:true})
        })
        var check_in_date = date_formatter(dd,mm,y)
        var check_out_date = date_formatter(dd_n,mm_n,y)
        

        cy.get('[data-testid="datepicker-day-'+check_in_date+'"]').click({force:true})
        cy.get('[data-testid="datepicker-day-'+check_out_date+'"]').click({force:true})
        cy.get(GUEST).click({force:true})
        cy.get(ADULT).children().last().dblclick({force:true})
        cy.get(CHILD).children().last().click({force:true})
        cy.get(SEARCH_BTN).contains('Search').click({force:true})
        
    }
    static verify(){
        cy.get(verify).find(city_selector).should('contain',city)
        cy.get(verify).find(guest_selector).should('contain',guest)
        cy.get(verify_guests).first().find('div').contains('guests').then(($guests)=> {
            
            var guest = $guests.text()
            console.log(guest)
            var guest_in = parseInt(guest.split("·")[0])
            expect(guest_in).to.be.at.least(3)
        })
    }
}
export default InitialPage

