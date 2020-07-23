import HomePage from './HomePage'
import ResultPage from './ResultPage'
describe('Results match search criteria', ()=>{
    before(()=>{
        HomePage.visit()
    })
    it('Criteria and verification for Search', () => {
        HomePage.search()
        HomePage.verify()
       

    })
    it('Apply extra filters ',()=> {
        ResultPage.addBedroom()
        ResultPage.verifyBedroom()
    })
    it('Color Change test', ()=> {
        
        ResultPage.hoverAndColorChange()
    })

})